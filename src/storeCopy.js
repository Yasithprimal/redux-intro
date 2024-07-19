// import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullname: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullname: action.payload.fullname,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullname: action.payload };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

function deposite(amount) {
  return { type: "account/deposite", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(loanAmount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: loanAmount, purpose: loanPurpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

///customer///

function createCustomer(fullname, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullname, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateName(fullname) {
  return {
    type: "customer/updateName",
    payload: fullname,
  };
}

store.dispatch(deposite(1000));
store.dispatch(requestLoan(300, "for fun"));
store.dispatch(payLoan());

store.dispatch(createCustomer("Andrew Yasith", "20202020"));

console.log(store.getState());

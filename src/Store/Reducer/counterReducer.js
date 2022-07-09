let initialState = [];

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + " Kodok";
    case "DECREMENT":
      // stop as the state is less than zero
      // if (state < 1) {
      //   return state;
      // }
      return " Kecebong";
    case "STOREDATA":
      return action.payload;
    default:
      return state;
  }
};

export default counterReducer;

import { combineReducers } from "redux";
import counterReducer from "./counterReducer.js";

const allReducers = combineReducers({
  counterReducer: counterReducer,
});

export default allReducers;

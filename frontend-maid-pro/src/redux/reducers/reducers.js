import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";

const reducer = combineReducers({
  user: userReducer,
  search: searchReducer
});

export default reducer;


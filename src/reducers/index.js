import { combineReducers } from "redux";

import characters from "./characters";

export default combineReducers({
  charactersReducer: characters,
});

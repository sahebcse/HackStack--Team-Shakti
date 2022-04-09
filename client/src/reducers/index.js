import { combineReducers } from "redux";

import Language from "./languages";
import Auth from "./auth";

const reducer = combineReducers({ Language, Auth });

export default reducer;

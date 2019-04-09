import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

/* tslint:disable:no-empty-interface */
export interface IRootState {}
/* tslint:enable:no-empty-interface */

export const DEFAULT_ROOT_STATE: IRootState = {};

export const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history)
	});

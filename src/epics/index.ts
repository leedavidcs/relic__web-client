import { combineEpics, Epic } from "redux-observable";
import { IRootState } from "../reducers";

export const rootEpic: Epic<IAction, IAction, IRootState> = combineEpics();

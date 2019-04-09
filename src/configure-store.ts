import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, createStore, Middleware, Store, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import { createRootReducer, DEFAULT_ROOT_STATE, IRootState } from "./reducers";

export const configureStore = (history): Store<IRootState> => {
	const epicMiddleware: EpicMiddleware<IAction, IAction, IRootState> = createEpicMiddleware();
	const routeMiddleware: Middleware = routerMiddleware(history);

	const middleware: Middleware[] = [epicMiddleware, routeMiddleware];

	const enhancer: StoreEnhancer =
		process.env.NODE_ENV === "development" ? composeDevEnhancer(...middleware) : applyMiddleware(...middleware);

	const store = createStore(createRootReducer(history), DEFAULT_ROOT_STATE, enhancer);

	epicMiddleware.run(rootEpic);

	return store;
};

const composeDevEnhancer = (...middleware: Middleware[]): StoreEnhancer => {
	const devMiddleware: Middleware[] = [logger];

	return composeWithDevTools(applyMiddleware(...middleware, ...devMiddleware));
};

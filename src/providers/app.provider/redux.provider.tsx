import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { configureStore } from "../../configure-store";
import { IRootState } from "../../reducers";

export const ReduxProvider: React.SFC<IWithChildren> = ({ children }) => {
	const history = createBrowserHistory();
	const store: Store<IRootState, IAction> = configureStore(history);

	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>{children}</ConnectedRouter>
		</Provider>
	);
};

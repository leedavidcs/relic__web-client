import React from "react";
import { JssProvider } from "./jss.provider";
import { ReduxProvider } from "./redux.provider";

export const AppProvider: React.SFC<IWithChildren> = ({ children }) => (
	<ReduxProvider>
		<JssProvider>{children}</JssProvider>
	</ReduxProvider>
);

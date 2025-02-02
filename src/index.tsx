import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app.component";
import { AppProvider } from "./providers/app.provider";
import * as serviceWorker from "./service-worker";

ReactDOM.render(
	<AppProvider>
		<App />
	</AppProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

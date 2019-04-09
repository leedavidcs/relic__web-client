import { createBrowserHistory, History } from "history";
import { configureStore } from "./configure-store";

describe("configureStore", () => {
	it("it should initialize a store without crashing", () => {
		const history: History = createBrowserHistory();

		expect(() => configureStore(history)).not.toThrow();
	});
});

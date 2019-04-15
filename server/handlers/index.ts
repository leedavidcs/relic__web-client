import Koa, { Middleware } from "koa";
import { BodyParserHandler } from "./body-parser.handler";
import { LoggerHandler } from "./logger.handler";
import { StaticHandler } from "./static.handler";

export const applyHandlers = (app: Koa): void => {
	const handlers: Middleware[] = [StaticHandler, LoggerHandler, BodyParserHandler];

	handlers.forEach((handler) => {
		app.use(handler);
	});
};

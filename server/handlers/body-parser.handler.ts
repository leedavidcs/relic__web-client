import HttpStatus from "http-status-codes";
import { Context, Middleware } from "koa";
import KoaBodyParser from "koa-bodyparser";
import { Logger } from "../logger";

export const BodyParserHandler: Middleware = KoaBodyParser({
	enableTypes: ["json"],
	onerror: (err: Error, ctx: Context) => {
		Logger.error("Body parse error");

		ctx.throw("Body parse error", HttpStatus.UNPROCESSABLE_ENTITY);
	}
});

import { Middleware } from "koa";
import KoaLogger from "koa-logger";

export const LoggerHandler: Middleware = KoaLogger();

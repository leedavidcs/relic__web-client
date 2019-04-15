import { Middleware } from "koa";
import KoaStatic from "koa-static";
import Path from "path";

export const StaticHandler: Middleware = KoaStatic(Path.join(__dirname, "../../build"));

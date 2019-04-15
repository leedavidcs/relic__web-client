import Fs from "fs-extra";
import Http, { RequestListener } from "http";
import Koa, { Context } from "koa";
import KoaRouter from "koa-router";
import Path from "path";
import { Router } from "./routes";
import { applyHandlers } from "./handlers";

/**
 * @class Server
 */
export class Server {
	private app: Koa;
	private httpServer: Http.Server;
	private port: number;
	private router: KoaRouter = Router();

	constructor(port: number) {
		this.port = Number(port);
		this.app = new Koa();
		const requestListener: RequestListener = this.app.callback();

		this.httpServer = new Http.Server(requestListener);
	}

	public run(): Promise<void> {
		return new Promise<void>((resolve) => {
			this.configure();

			this.httpServer.listen(this.port, () => {
				resolve();
			});
		});
	}

	public stop(): Promise<void> {
		return new Promise<void>((resolve) => {
			if (!this.isRunning) {
				resolve();
			}

			this.httpServer.close(() => {
				resolve();
			});
		});
	}

	public get instance(): Http.Server {
		return this.httpServer;
	}

	public get isRunning(): boolean {
		return this.httpServer.listening;
	}

	private configure(): void {
		applyHandlers(this.app);

		this.serveClient();

		this.app.use(this.router.routes());
		this.app.use(this.router.allowedMethods());
	}

	private serveClient(): void {
		this.router.get("/*", async (ctx: Context) => {
			ctx.body = await Fs.readFile(Path.resolve(__dirname, "../", "./build/index.html"), "utf8");
		});
	}
}

import Express from "express";
import Http from "http";
import Path from "path";
import { applyHandlers } from "./server/handlers";
import { Logger } from "./server/logger";

const DEFAULT_PORT: number = 8080;

export class Server {
	private app: Express.Application;
	private port: number;
	private httpServer: Http.Server;

	constructor(port: number | string = DEFAULT_PORT) {
		this.port = Number(port);

		if (isNaN(this.port)) {
			throw new Error(`Server Constructor - Invalid port: ${port}.`);
		}

		this.app = Express();
		this.httpServer = new Http.Server(this.app);

		this.configure();
	}

	public run(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.httpServer.listen(this.port, () => {
				Logger.log({
					level: "info",
					message: `Server is listening on port: ${this.port}.`
				});

				resolve();
			});
		});
	}

	public stop(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.httpServer.close(() => {
				Logger.log({
					level: "info",
					message: `Server is now closed. Was listening on port: ${this.port}.`
				});

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
	}

	private serveClient(): void {
		this.app.get("/*", (req: Express.Request, res: Express.Response) => {
			res.sendFile(Path.join(__dirname, "build", "index.html"));
		});
	}
}

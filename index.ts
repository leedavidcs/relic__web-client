import { Server } from "./server";
import { Logger } from "./server/logger";

const PORT: number = Number(process.env.PORT) || 3000;

export const frontend: Server = new Server(PORT);

frontend.run().then(() => {
	Logger.info(`Server is listening on port: ${PORT}.`);
});

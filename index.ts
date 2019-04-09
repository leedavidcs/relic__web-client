import { Server } from "./server";

export const frontend: Server = new Server(process.env.PORT);

frontend.run();

import Express from "express";
import { CorsHandler } from "./cors.handler";
import { HelmetHandler } from "./helment.handler";
import { MorganHandler } from "./morgan.handler";
import { StaticHandlers } from "./static.handler";

/**
 * @function applyHandlers
 * @param { Express.Application } app - The application to which to apply request handlers
 * @returns { void }
 */
export const applyHandlers = (app: Express.Application): void => {
	const handlers: Express.RequestHandler[] = [HelmetHandler, CorsHandler, MorganHandler, ...StaticHandlers];

	handlers.forEach((handler) => app.use(handler));
};

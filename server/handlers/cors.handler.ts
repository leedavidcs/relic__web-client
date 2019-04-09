import Cors from "cors";
import Express from "express";

export const CorsHandler: Express.RequestHandler = Cors({
	credentials: true,
	methods: ["GET", "POST", "PUT"],
	origin: true
});

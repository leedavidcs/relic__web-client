import Express from "express";
import Morgan from "morgan";

export const MorganHandler: Express.RequestHandler =
	process.env.NODE_ENV === "development" ? Morgan("dev") : Morgan("short");

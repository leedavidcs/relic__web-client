import Express, { RequestHandler } from "express";
import Path from "path";

const staticPaths: string[][] = [["build"]];

export const StaticHandlers: RequestHandler[] = staticPaths.map<RequestHandler>((path) =>
	Express.static(Path.join(__dirname, "../../", ...path))
);

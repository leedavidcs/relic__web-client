import Express from "express";
import Helmet from "helmet";

export const HelmetHandler: Express.RequestHandler = Helmet({
	contentSecurityPolicy: false,
	dnsPrefetchControl: true,
	expectCt: false,
	frameguard: true,
	hidePoweredBy: true,
	hpkp: false,
	hsts: true,
	ieNoOpen: true,
	noCache: false,
	noSniff: true,
	referrerPolicy: false,
	xssFilter: true
});

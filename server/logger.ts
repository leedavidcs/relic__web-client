import Path from "path";
import Winston from "winston";

const consoleFormat = process.env.NODE_ENV === "production" ? Winston.format.prettyPrint() : Winston.format.simple();

const getFilePath = (filename: string): string => {
	return Path.join(__dirname, "../", "logs", filename);
};

const ERROR_LOG_FILE_PATH: string = getFilePath("error.log");
const COMBINED_LOG_FILE_PATH: string = getFilePath("combined.log");

const logger = Winston.createLogger({
	defaultMeta: {
		service: "user-service"
	},
	format: Winston.format.json(),
	level: "info",
	silent: process.env.NODE_ENV === "test",
	transports: [
		new Winston.transports.Console({
			format: consoleFormat
		}),
		new Winston.transports.File({
			filename: ERROR_LOG_FILE_PATH,
			level: "error"
		}),
		new Winston.transports.File({
			filename: COMBINED_LOG_FILE_PATH
		})
	]
});

export const Logger = logger;

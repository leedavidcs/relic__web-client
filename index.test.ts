import request, { Response } from "supertest";

describe("server index", () => {
	/**
	 * SKIP
	 * Description: Tests appear to pass locally, but supertest requests fail on ci
	 * Author: David Lee
	 * Date: February 25, 2019
	 */
	it.skip("Should serve the client", async () => {
		const { frontend } = require(".");
		const response: Response = await request(frontend.instance).get("/");

		expect(response).not.toBeNull();
		expect(response.status).toBe(200);
		expect(response.header["content-type"]).toBe("text/html; charset=UTF-8");
	});
});

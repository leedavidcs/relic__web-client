import request, { Response } from "supertest";
import { Server } from "./server";

const TEST_PORT: number = 8081;

describe("Server", () => {
	it("Should be a constructor", () => {
		expect(typeof Server).toEqual("function");
	});

	describe("Should run and stop the server", () => {
		const frontend: Server = new Server(TEST_PORT);

		it("Should run the server", async () => {
			await frontend.run();

			expect(frontend.isRunning).toBe(true);
		});

		/**
		 * SKIP
		 * Description: Tests appear to pass locally, but supertest requests fail on ci
		 * Author: David Lee
		 * Date: February 25, 2019
		 */
		it.skip("Should serve the client", async () => {
			let response: Response = await request(frontend.instance).get("/");

			expect(response).not.toBeNull();
			expect(response.status).toBe(200);
			expect(response.header["content-type"]).toBe("text/html; charset=UTF-8");

			response = await request(frontend.instance).get("/unused-test-route");
			expect(response).not.toBeNull();
			expect(response.status).toBe(200);
			expect(response.header["content-type"]).toBe("text/html; charset=UTF-8");
		});

		it("Should stop the server", async () => {
			await frontend.stop();

			expect(frontend.isRunning).toBe(false);
		});
	});

	it("Should error if bad port", () => {
		expect(() => {
			/* tslint:disable:no-unused-expression */
			new Server("BAD PORT");
			/* tslint:enable:no-unused-expression */
		}).toThrow();
	});
});

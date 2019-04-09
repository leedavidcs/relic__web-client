describe("client index", () => {
	it("Should render an application to #root", () => {
		document.body.innerHTML = `<div id="root" />`;

		expect(() => {
			require("./index");
		}).not.toThrow();
	});
});

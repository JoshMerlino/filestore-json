/* eslint no-undef: off */
/* eslint no-new: off */

import path from "path";
import Store from "../src";

test("Ensure class can not be instantiated with `new` keyword.", () => {
	expect(function() {
		new Store(path.resolve("./test/main.store.json"));
	}).toThrow(TypeError("'Store' is not a constructor. Use static method 'Store.from()' instead."));
});

test("Ensure class can be instantiated with static method `from`.", () => {
	const store = Store.from(path.resolve("./test/main.store.json"));
	store.value = { test: true };
	expect(JSON.stringify(store.value)).toBe(JSON.stringify({ test: true }));
});

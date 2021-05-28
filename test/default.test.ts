/* eslint no-undef: off */
/* eslint no-new: off */

import path from "path";
import Store from "../src";

test("Ensure the store can have default values.", () => {
	const store = Store.from(path.resolve("./test/default.store.json"), <Record<string, unknown>>{ default: false });
	store.value = { test: true };
	expect(JSON.stringify(store.value)).toBe(JSON.stringify({ default: false, test: true }));
	store.clear();
	expect(JSON.stringify(store.value)).toBe(JSON.stringify({ default: false }));
});

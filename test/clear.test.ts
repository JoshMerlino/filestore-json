/* eslint no-undef: off */
/* eslint no-new: off */

import path from "path";
import Store from "../src";

test("Ensure the value can be cleared.", () => {
	const store = Store.from(path.resolve("./test/clear.store.json"));
	store.value = { test: true };
	expect(JSON.stringify(store.value)).toBe(JSON.stringify({ test: true }));
	store.clear();
	expect(JSON.stringify(store.value)).toBe(JSON.stringify({}));
});

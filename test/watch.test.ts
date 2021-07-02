/* eslint no-undef: off */
/* eslint no-new: off */

import { writeFileSync } from "fs";
import path from "path";
import Store from "../src";

test("Ensure the value is updated when the store file changes.", () => {
	const store = Store.from(path.resolve("./test/watch.store.json"));
	store.value = { test: true };
	expect(JSON.stringify(store.value)).toBe(JSON.stringify({ test: true }));
	writeFileSync(path.resolve("./test/watch.store.json"), JSON.stringify({ test: false }));
	setTimeout(function() {
		expect(JSON.stringify(store.value)).toBe(JSON.stringify({ test: false }));
	}, 5000);
});

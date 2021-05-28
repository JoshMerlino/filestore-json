/* eslint no-undef: off */
/* eslint no-new: off */

import path from "path";
import Store from "../src";

test("Ensure the store can determine its age.", () => {
	const store = Store.from(path.resolve("./test/age.store.json"));
	expect(typeof store.age).toBe("number");
});

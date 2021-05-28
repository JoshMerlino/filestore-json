/* eslint no-undef: off */
/* eslint no-new: off */

import path from "path";
import Store from "../src";

interface IShape extends Record<string, unknown> {
	prop1: string;
	prop2: number;
}

test("Ensure the value can be cleared.", () => {
	const store = Store.from<IShape>(path.resolve("./test/shape.store.json"), <IShape>{ prop1: "string", prop2: 0 });
	store.value = { prop1: "newString", prop2: 1 };
	expect(JSON.stringify(store.value)).toBe(JSON.stringify({ prop1: "newString", prop2: 1 }));
});

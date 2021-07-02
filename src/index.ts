import { PathLike, statSync, writeFileSync, watchFile, existsSync, unwatchFile } from "fs";
import { sync as mkdirp } from "mkdirp";
import { resolve, extname } from "path";

export default class Store<T = Record<string, never>> {

	// Private symbol to ensure class is initialized properly.
	private static __classIdentifier = Symbol("Store");

	// Internal value of the store.
	private __internalValue: T;

	// Initialize class. This should be done through the `.from` static method
	constructor(

		// Create private property for the path to the file
		private path: string,

		// Initialize default value as empty object
		private defaults: T = <T>{},

		// Ensure the class is initialized with the `.from` static method
		__class: symbol | null = null

	) {

		// Ensure class is initialized via static method 'from'
		if (__class !== Store.__classIdentifier) throw new TypeError("'Store' is not a constructor. Use static method 'Store.from()' instead.");

		// Try to parse JSON.
		try {
			this.__internalValue = { ...defaults, ...require(path) };

		// If it fails, use a blank object or defaults.
		} catch (e) {
			this.__internalValue = { ...defaults };
		}

		// Monitor file for changes
		watchFile(path, () => {

			console.log("file updated");

			// Get new content
			const newValue: T = { ...defaults, ...require(path) };

			// Check if the content changed at all
			if (!Store.deepEquals(newValue, this.__internalValue)) {

				// Update internal value with new value
				this.__internalValue = newValue;
			}

		});

		// On process clear
		process.on("beforeExit", () => unwatchFile(path));

	}

	// Static method to create a new store from a file.
	static from<T>(path: PathLike, defaults?: T): Store<T> {

		// Make sure path is a JSON file
		if (extname(path.toString()).toLowerCase() !== ".json") throw new TypeError(`'${path}' is not a JSON file.`);

		// Make sure the parent folder of the store exists, if not create it.
		mkdirp(resolve(path.toString(), "../"));

		// Make sure store exists, if not create it.
		if (!existsSync(path)) writeFileSync(path, "{}");

		// Rethrn new Store.
		return new this(path.toString(), defaults, Store.__classIdentifier);

	}

	// Helper method to check deep equality
	private static deepEquals(obj1: any, obj2: any): boolean {
		return JSON.stringify(obj1) === JSON.stringify(obj2);
	}

	// Clear the store and reset to the default value
	clear(): Store<T> {

		// Update the store value in memory.
		this.__internalValue = this.defaults;

		// Save the store value to disk
		writeFileSync(this.path, JSON.stringify(this.__internalValue), "utf8");

		// Return this for chaining
		return this;

	}

	// Get the age of the file in ms, since it was last modified
	get age(): number {

		// Stat file
		try {
			const stat = statSync(this.path);
			return Math.floor(Date.now() - stat.mtimeMs);

		// Return current timestamp
		} catch (e) {
			return Date.now();
		}

	}

	// Returns the current value of the store.
	get value(): T {
		return this.__internalValue;
	}

	// Updates the value of the store in memory and syncs to disk.
	set value(newValue: T) {

		// Update the store value in memory.
		this.__internalValue = { ...this.defaults, ...this.__internalValue, ...newValue };

		// Save the store value to disk
		writeFileSync(this.path, JSON.stringify(this.__internalValue), "utf8");

	}

}

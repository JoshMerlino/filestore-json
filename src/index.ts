import { PathLike, statSync, writeFileSync } from "fs";
import { sync as mkdirp } from "mkdirp";
import { resolve } from "path";

export default class Store<T extends Record<string, unknown> = Record<string, never>> {

	// Private symbol to ensure class is initialized properly.
	private static __class = Symbol("Store");

	// Internal value of the store.
	private __value: T;

	// Initialize class. This should be done through the `.from` static method
	constructor(
		private path: string,
		private defaults: T = <T>{},
		__class: symbol | null = null
	) {

		// Ensure class is initialized via .from
		if (__class !== Store.__class) throw new TypeError("'Store' is not a constructor. Use static method 'Store.from()' instead.");

		// Try to parse JSON.
		try {
			this.__value = { ...defaults, ...require(path) };

		// If it fails, use a blank object or defaults.
		} catch (e) {
			this.__value = <T>{ ...defaults };
		}

	}

	// Static method to create a new store from a file.
	static from<T extends Record<string, unknown>>(path: PathLike, defaults?: T): Store<T> {

		// Make sure the parent folder of the store exists, if not create it.
		mkdirp(resolve(path.toString(), "../"));

		// Rethrn new Store.
		return new this(path.toString(), defaults, Store.__class);

	}

	// Clear the store and reset to the default value
	clear(): Store<T> {

		// Update the store value in memory.
		this.__value = this.defaults;

		// Save the store value to disk
		writeFileSync(this.path, JSON.stringify(this.__value), "utf8");

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
		return this.__value;
	}

	// Updates the value of the store in memory and syncs to disk.
	set value(newValue: T) {

		// Update the store value in memory.
		this.__value = { ...this.defaults, ...this.__value, ...newValue };

		// Save the store value to disk
		writeFileSync(this.path, JSON.stringify(this.__value), "utf8");

	}

}

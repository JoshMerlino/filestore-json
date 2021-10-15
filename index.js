"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const mkdirp_1 = require("mkdirp");
const path_1 = require("path");
class Store {
    constructor(path, defaults = {}, __class = null) {
        this.path = path;
        this.defaults = defaults;
        if (__class !== Store.__classIdentifier)
            throw new TypeError("'Store' is not a constructor. Use static method 'Store.from()' instead.");
        try {
            this.__internalValue = { ...defaults, ...require(path) };
        }
        catch (e) {
            this.__internalValue = { ...defaults };
        }
        (0, fs_1.watchFile)(path, { persistent: false }, () => {
            this.__internalValue = { ...defaults, ...require(path) };
        });
    }
    static from(path, defaults) {
        if ((0, path_1.extname)(path.toString()).toLowerCase() !== ".json")
            throw new TypeError(`'${path}' is not a JSON file.`);
        (0, mkdirp_1.sync)((0, path_1.resolve)(path.toString(), "../"));
        if (!(0, fs_1.existsSync)(path))
            (0, fs_1.writeFileSync)(path, "{}");
        return new this(path.toString(), defaults, Store.__classIdentifier);
    }
    clear() {
        this.__internalValue = this.defaults;
        (0, fs_1.writeFileSync)(this.path, JSON.stringify(this.__internalValue), "utf8");
        return this;
    }
    get age() {
        try {
            const stat = (0, fs_1.statSync)(this.path);
            return Math.floor(Date.now() - stat.mtimeMs);
        }
        catch (e) {
            return Date.now();
        }
    }
    get value() {
        return this.__internalValue;
    }
    set value(newValue) {
        this.__internalValue = { ...this.defaults, ...this.__internalValue, ...newValue };
        (0, fs_1.writeFileSync)(this.path, JSON.stringify(this.__internalValue), "utf8");
    }
}
exports.default = Store;
Store.__classIdentifier = Symbol("Store");
//# sourceMappingURL=index.js.map
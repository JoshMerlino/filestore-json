/// <reference types="node" />
import { PathLike } from "fs";
export default class Store<T = Record<string, never>> {
    private path;
    private defaults;
    private static __classIdentifier;
    private __internalValue;
    constructor(path: string, defaults?: T, __class?: symbol | null);
    static from<T>(path: PathLike, defaults?: T): Store<T>;
    clear(): Store<T>;
    get age(): number;
    get value(): T;
    set value(newValue: T);
}

# filestore-json
### Checks
* [![Build](https://github.com/JoshMerlino/filestore-json/actions/workflows/build.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/build.yml)
* [![Code Style Analysis](https://github.com/JoshMerlino/filestore-json/actions/workflows/code-style-analysis.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/code-style-analysis.yml)
* [![Test CI](https://github.com/JoshMerlino/filestore-json/actions/workflows/test-ci.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/test-ci.yml)

![](https://img.shields.io/npm/dt/filestore-json)
![](https://img.shields.io/github/issues/JoshMerlino/filestore-json)
![](https://img.shields.io/github/issues-pr/JoshMerlino/filestore-json)

Easily sync JSON objects of any shape with the filesystem.

# Features
* Read & write to JSON files on a storage device without the need to interact with the filesystem.
* Persistant data between process restarts.
* Ability to determine age (ms since last write).
* Cache JSON responses from network requests.
* Automaticly updates internal value when JSON file is modified.
* Strong type internal value with type annotations.

# Examples

## Creating a store
```ts
import JSONStore from "filestore-json";
import path from "path";

// Initialize the store.
const store = JSONStore.from(path.resolve("path/to/your/store.json"));

// With types
type Type = Record<string, any>;
const store = JSONStore.from<Type>(path.resolve("path/to/your/store.json"));
```

## Reading & writing to the store
```ts
// Read value of store.
console.log(store.value); // -> {}

// Update store value.
store.value = { myObject: false };

// Read new value of store.
console.log(store.value); // -> { myObject: false }
```

## Creating a store with default values
```ts
// Create object with store defaults
const defaults = { defaultValue: true };

// Initialize store.
const store = JSONStore.from(path.resolve("path/to/your/store.json"), defaults);

// Read value of store.
console.log(store.value); // -> { defaultValue: true }

// Update store value.
store.value = { myObject: false };

// Read new value of store.
console.log(store.value); // -> { myObject: false, defaultValue: true }
```

## Resetting a stores value back to the default
```ts
// Update store value.
store.value = { myObject: false };

// Read new value of store.
console.log(store.value); // -> { myObject: false }

// Clear value
store.clear();

// Read value of store.
console.log(store.value); // -> {}
```

## Getting the age of the store (ms since last write)
```ts
// Read age of store.
console.log(store.age); // -> 0
```

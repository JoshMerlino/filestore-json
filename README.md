# filestore-json
[![Test CI](https://github.com/JoshMerlino/filestore-json/actions/workflows/test.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/test.yml)
[![CodeQL](https://github.com/JoshMerlino/filestore-json/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/codeql-analysis.yml)

![](https://img.shields.io/npm/dt/filestore-json)
![](https://img.shields.io/github/issues/JoshMerlino/filestore-json)
![](https://img.shields.io/github/issues-pr/JoshMerlino/filestore-json)

## Creating a store
```ts
import JSONStore from "filestore-json";
import path from "path";

// Initialize the store.
const store = JSONStore.from(path.resolve("path/to/your/store.json"));
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

## Resetting a stores value
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
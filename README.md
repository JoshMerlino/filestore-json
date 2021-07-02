# filestore-json
### Checks
* [![Build](https://github.com/JoshMerlino/filestore-json/actions/workflows/build.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/build.yml)
* [![Code Quality Analysis](https://github.com/JoshMerlino/filestore-json/actions/workflows/code-quality-analysis.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/code-quality-analysis.yml)
* [![Code Style Analysis](https://github.com/JoshMerlino/filestore-json/actions/workflows/code-style-analysis.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/code-style-analysis.yml)
* [![Test CI](https://github.com/JoshMerlino/filestore-json/actions/workflows/test-ci.yml/badge.svg)](https://github.com/JoshMerlino/filestore-json/actions/workflows/test-ci.yml)

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
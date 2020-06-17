# Simple Signals
![NPM](https://badgen.net/npm/v/simple-signals)![Badge for Gzip size](https://badgen.net/bundlephobia/minzip/simple-signals)

A Typescript based simple signal framework.

For when all you need a simple way to trigger and listen for type safe events.

A longer description would be that signals are for handling events but each instance of a `Signal` is for representing a single event.

## Install
To get from npm:
```sh
npm install --save simple-signals
```

Alternatively you can download the code and build it yourself with
```sh
npm run build
```
And in the `dist` folder will be the Javascript and Typescript typings file.

Also the whole thing is one Typescript file so it's pretty easy to manually add it to your own source code.

## Features
- Small file size (about 0.3kb before compression)
- Type safe events
- Very simple API, only 3 methods.
- No dependencies

## Example
Signals are a way to represent a single event with type safety.

```typescript
import Signal from "simple-signals";

const newName = new Signal<string>();
const remove1 = newName.add((name) =>
{
    console.log('New name 1:', name);
});
const remove2 = newName.add((name) =>
{
    console.log('New name 2:', name);
});

console.log(newName.length()) // 2
newName.trigger('Foo');
// Console prints
// New name 1: Foo
// New name 2: Foo

remove1();

console.log(newName.length()) // 1
newName.trigger('Bar');
// Console prints
// New name 2: Bar
```

# API

## Types
```typescript
// Listener for when a signal is dispatched.
// Can return false to stop the next signal from triggering.
export type SignalListener<T> = (value: T) => void | boolean;

// A function used to remove a listener from the signal.
export type RemoveListener = () => void;
```

## Signal
The main class that keeps track of added signal listeners.

### length
`returns: number` The number of active listeners.

### add
`listeners: SubscriptionListener<T>` A function that will be called when the signal is triggered. The function can optionally return a boolean (false) to prevent further listeners from triggering.

`returns: RemoveListener` A function to remove the listener from the store.

Add a listener to the signal, returns a function for removing the listener.

The order of added listeners is maintained.

### trigger
`value: T` The value to pass to each of the triggered listeners.

Triggers the listeners on the signal with the value given.

## License
MIT

## Author
Alan Lawrey 2020
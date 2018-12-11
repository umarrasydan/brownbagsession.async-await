# Async/Await

## Async

On to the main event! This is actually a syntactic sugar on top of promises with special properties [read more](https://mathiasbynens.be/notes/async-stack-traces). What this means is that any promise can be `await`-ed. Before we look at that, let's look at the first part of the equation. `async`. When an async function returns a non-promise, it automatically convert the returned value as a promise.

```javascript
async function multiply(a, b) {
    return a * b;
}

multiply(1, 2); // Promise { 2 }

// They roughly work like this under the hood

function multiply(a, b) {
    return Promise.resolve(a * b);
}

multiply(1, 2); // Promise { 2 }
```

## Await

`await` is a syntactic sugar to `.then`. This means that any promise can be `await`-ed with 1 rule, they need to be inside an `async` function. To get around this, when we want to execute async code, we usually wrap them in an anonymous function that's immediately called.

```javascript
(async () => {
    await asyncMultiply(1, 2); // 2
})();

// OR

(async function() {
    await asyncMultiply(1, 2); // 2
})();

// OR

const main = async function() {
    await asyncMultiply(1, 2);
};

main();
```

If you already have a function that operates on promises, you dont have to wrap it like the above.

```javascript
async function double(x) {
    const result = await asyncMultiply(x, 2);

    return result;
}

// OR

function double(x) {
    return asyncMultiply(x, 2);
}

// don't do this read more here https://eslint.org/docs/rules/no-return-await

async function double(x) {
    return await asyncMultiply(x, 2);
}
```

## Sequential Async Calls

Using async await writing sequential calls is more readable.

```javascript
await asyncMultiply(1, 2);
console.log('I will log between these 2 as expected');
await asyncMultiply(2, 2);

const firstResult = await asyncMultiply(1, 2);
await asyncMultiply(firstResult, 2);
```

## Parallel Async Calls

Parallel async calls is even simpler now

```javascript
const [value1, value2] = await Promise.all([
    asyncMultiply(1, 2),
    asyncMultiply(2, 2)
]);
```

## Race

The same is true for race

```javascript
const result = await Promise.race([
    asyncMultiply(1, 2),
    delay(500).then(() => 'I win!')
]);

console.log('race', result);
```

## Loops

When you need to do an await call inside a loop, generally it is not recommended [no-await-in-loop](https://eslint.org/docs/rules/no-await-in-loop). What you should do instead is loop through all of them to generate a promise, and `Promise.all()` the array. If you still need to do this for any reason, here's how. Only these loops will properly do pause at each await as you would expect.

```javascript
for (let i = 0; i < 5; i++) {
    await asyncMultiply(1, 2);
}

for (let i of Array(5)) {
    await asyncMultiply(1, 2);
}

for (let i in { 1: '', 2: '', 3: '', 4: '', 5: '' }) {
    await asyncMultiply(1, 2);
}

// recommended way to do this

const multiplyPromises = [1, 2, 3, 4, 5].map(i => asyncMultiply(i, 2));

await Promise.all(multiplyPromises); // [ 2, 4, 6, 8, 10 ]
```

## Error Handling

Error handling is straightforward with async await, when we `await` a promise and it's rejected, the await will throw. and the way we handle that is by using try catch

```javascript
const errorPromise = Promise.reject(new Error('hello from error'));
try {
    await errorPromise;
} catch (e) {
    console.log('error handling', e.message);
} finally {
    console.log("I'll run no matter what");
}
```

Remember that if we don't have try catch, our "main" async function always returns a promise. Hence, we can simply `catch` it

```javascript
(async () => {
    const errorPromise = Promise.reject(new Error('hello from error'));
    await errorPromise;
})().catch(e => console.log('catch the uncaught', e.message));
```

## Converting Callbacks to promises (promisify)

There are 2 ways to convert a callback function into a promise returning function.

Manually

```javascript
function multiply(a, b, callback) {
    return callback(null, a * b);
}

function asyncMultiply(a, b) {
    return new Promise((resolve, reject) => {
        multiply(a, b, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });
}

await asyncMultiply(1, 2); // 2
```

Automagically

```javascript
const { promisify } = require('util');

function multiply(a, b, callback) {
    return callback(null, a * b);
}

const asyncMultiply = promisify(multiply);

await asyncMultiply(1, 2); // 2
```

### Promisify Classes

Say we have an instantiated class, when we `promisify` an instantiated method of a class, we lose context unless we bind.

```javascript
const { promisify } = require('util');

class Multiplier {
    constructor() {
        this.x = "I'm X";
    }
    multiply(a, b, callback) {
        console.log(this.x);
        return callback(null, a * b);
    }
}

const m = new Multiplier();

const asyncMultiply = promisify(m.multiply);

try {
    await asyncMultiply(1, 2);
} catch (e) {
    e.message; // Cannot read property 'x' of undefined
}

const asyncMultiplyProper = promisify(m.multiply).bind(m);
console.log(await asyncMultiplyProper(1, 2)); // 2
```

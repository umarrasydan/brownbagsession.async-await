# Promises

## Asynchronous/Async function

If the `asyncMultiply` returns a promise, we'll get a `Promise` with a pending status. Note that **once a promise is created it's immediately executed**. Promise can be passed around like any other data value.

```javascript
const result = asyncMultiply(1, 2);

console.log(result); // Promise { <pending> }
```

## Resolving Promise

```javascript
const resultPromise = asyncMultiply(1, 2);

resultPromise.then(result => console.log(result)); // 2

// OR

asyncMultiply(1, 2).then(result => console.log(result)); // 2
```

## Creating Promise

When creating promise, you always need 2 things, `resolve` and `reject`

```javascript
const promise = new Promise((resolve, reject) => {
    if (/* some error */) {
        return reject(/* value */);
    }

    return resolve(/* value */);
});

promise.then(value => console.log(value)).catch(err => console.log(err));
```

For testing purposes usually, you can also create a promise that only `resolve` or `reject`. Consider these shortcut methods to creating a dummy promise.

```javascript
const promise = Promise.resolve('hello');
promise.then(value => console.log(value));

// OR

const errorPromise = Promise.reject(new Error('hello from error'));
errorPromise.catch(err => console.log(err.message));
```

## Sequential Async Calls

What if we need to use the result of the async function for another async function? With promise we can simply return another promise.

```javascript
asyncMultiply(1, 2)
    .then(result => asyncMultiply(result, 2))
    .then(result => console.log(result));
```

Oh what if we need to use that result for another? And another? And another?. This is simple to achieve in promise world.

```javascript
asyncMultiply(1, 2)
    .then(result => asyncMultiply(result, 2))
    .then(result => asyncMultiply(result, 2))
    .then(result => asyncMultiply(result, 2))
    .then(result => asyncMultiply(result, 2))
    .then(result => console.log('callback hell no more', result));
```

## Parallel Async Calls

What if you have 2 async calls that's independent of one another. Instead of calling them sequentially, it's more performant to call them in parallel.

```javascript
Promise.all([asyncMultiply(1, 2), asyncMultiply(2, 2)]).then(values =>
    console.log(values[0], values[1])
);

// OR

Promise.all([asyncMultiply(1, 2), asyncMultiply(2, 2)]).then(
    ([value1, value2]) => console.log(value1, value2)
);

// OR

const multiplyPromises = [asyncMultiply(1, 2), asyncMultiply(2, 2)];

Promise.all(multiplyPromises).then(([value1, value2]) =>
    console.log(value1, value2)
);
```

## Race

This is a useful tool to do something like api timeout where we want to return some default value if the api responds slowly as an example.

```javascript
Promise.race([asyncMultiply(1, 2), delay(500).then(() => 'I win!')]).then(
    result => console.log('race', result)
);
```

## Error Handling

Error handling is straightforward with `catch`. **Note if you don't catch the errors, they will silently fail**.

```javascript
const errorPromise = Promise.reject(new Error('Catch me if you can'));

errorPromise
    .then(result => console.log(result))
    .catch(err => console.log(err.message));
```

## Loop

If you try to do something like this, you're getting yourself in trouble.

```javascript
for (let i = 0; i < 10; i++) {
    asyncMultiply(i, 2).then(result => console.log('loop', result));
}
```

It's not good to loop through async calls, but if you **really** need to do it, use async/await 😃

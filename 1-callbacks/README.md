# Callbacks

## Synchronous/Sync function

This is the most common type of function that we encounter.

```javascript
const result = multiply(1, 2);

console.log(result); // 2
```

## Asynchronous/Async function

Sometimes the methods we call requires some time to respond back. The result is not immediately available.

```javascript
const result = asyncMultiply(1, 2);

console.log(result); // undefined
```

## Callbacks

As a convention, the JS community came up with the concept of callback. We pass a function that will be called once the async function finished executing.

```javascript
function handleMultiplyResult(err, result) {
    console.log(result); // 2
}

asyncMultiply(1, 2, handleMultiplyResult);

// OR

asyncMultiply(1, 2, (err, result) => console.log(result)); // 2
```

By convention, a callback function usually have 2 parameters. 1st parameter is always error, and the second parameter is the success case. A common callback function looks like this

```javascript
function callbackHandler(err, result) {
    if (err) {
        // handle error
    }

    console.log(result)
}
```

## Sequential Async Calls

What if we need to use the result of the async function for another async function?

```javascript
asyncMultiply(1, 2, (err, result) => {
    asyncMultiply(result, 2, (err, result2) => console.log(result2));
});
```

Oh what if we need to use that result for another? And another? And another?

```javascript
asyncMultiply(1, 2, (err, result) => {
    asyncMultiply(result, 2, (err, result2) => {
        asyncMultiply(result2, 2, (err, result3) => {
            asyncMultiply(result3, 2, (err, result4) => {
                asyncMultiply(result4, 2, (err, result5) => {
                    console.log(result5);
                });
            });
        });
    });
});
```

This is lovingly called the [callback hell](http://callbackhell.com/)

## Using Waterfall

Library such as [async](http://caolan.github.io/async/) helps reduces callback hell pain but adds a lot of syntax noise.

```javascript
async.waterfall(
    [
        callback => {
            asyncMultiply(1, 2, callback);
        },
        (prevResult, callback) => {
            asyncMultiply(prevResult, 2, callback);
        },
        (prevResult, callback) => {
            asyncMultiply(prevResult, 2, callback);
        },
        (prevResult, callback) => {
            asyncMultiply(prevResult, 2, callback);
        },
        (prevResult, callback) => {
            asyncMultiply(prevResult, 2, callback);
        }
    ],
    (err, result) => {
        console.log('waterfall', result);
    }
);
```

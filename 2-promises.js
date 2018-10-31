function asyncMultiply(a, b) {
    return new Promise(resolve => {
        setTimeout(() => resolve(a * b), 1000);
    });
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

// Asynchronous/Async function
const result = asyncMultiply(1, 2);
console.log('async', result);

// Resolving Promise
result.then(result => console.log('resolving promise', result));

// Creating Promise
const promise = Promise.resolve('hello');
promise.then(value => console.log('immediate resolve', value));

const errorPromise = Promise.reject(new Error('hello from error'));
errorPromise.catch(err => console.log('immediate reject', err.message));

// Sequential Async Calls
asyncMultiply(1, 2)
    .then(result => asyncMultiply(result, 2))
    .then(result => console.log('sequential', result));

asyncMultiply(1, 2)
    .then(result => asyncMultiply(result, 2))
    .then(result => asyncMultiply(result, 2))
    .then(result => asyncMultiply(result, 2))
    .then(result => asyncMultiply(result, 2))
    .then(result => console.log('callback hell no more', result));

// Parallel Async Calls
const multiplyPromises = [asyncMultiply(1, 2), asyncMultiply(2, 2)];
Promise.all(multiplyPromises).then(([value1, value2]) =>
    console.log('parallel', value1, value2)
);

// Race
Promise.race([asyncMultiply(1, 2), delay(500).then(() => 'I win!')]).then(
    result => console.log('race', result)
);

// Error Handling
for (let i = 0; i < 10; i++) {
    asyncMultiply(i, 2).then(result => console.log('loop', result));
}

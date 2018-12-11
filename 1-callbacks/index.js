const async = require('async');

function multiply(a, b) {
    return a * b;
}

function asyncMultiply(a, b, cb) {
    setTimeout(() => {
        return cb ? cb(null, a * b) : null;
    }, 1000);
}

// Synchronous/Sync function
console.log('sync', multiply(1, 2));

// Asynchronous/Async function
console.log('async', asyncMultiply(1, 2));

// Callbacks
asyncMultiply(1, 2, (err, result) => console.log('callbacks', result));

// Sequential Async Calls
asyncMultiply(1, 2, (err, result) => {
    asyncMultiply(result, 2, (err, result2) =>
        console.log('sequential', result2)
    );
});

asyncMultiply(1, 2, (err, result) => {
    asyncMultiply(result, 2, (err, result2) => {
        asyncMultiply(result2, 2, (err, result3) => {
            asyncMultiply(result3, 2, (err, result4) => {
                asyncMultiply(result4, 2, (err, result5) => {
                    console.log('callback hell', result5);
                });
            });
        });
    });
});

// Using Waterfall
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

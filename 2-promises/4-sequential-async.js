const asyncMultiply = require('../utils/asyncMultiply');

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

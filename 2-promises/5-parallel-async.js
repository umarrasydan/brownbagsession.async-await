const asyncMultiply = require('../utils/asyncMultiply');

// Parallel Async Calls
const multiplyPromises = [asyncMultiply(1, 2), asyncMultiply(2, 2)];
Promise.all(multiplyPromises).then(([value1, value2]) =>
    console.log('parallel', value1, value2)
);

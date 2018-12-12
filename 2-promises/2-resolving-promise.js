const asyncMultiply = require('../utils/asyncMultiply');

// Resolving Promise
const result = asyncMultiply(1, 2);
result.then(result => console.log('resolving promise', result));

asyncMultiply(1, 2).then(result => console.log('resolving promise', result));

const asyncMultiply = require('../utils/asyncMultiplyCb');

// Callbacks
asyncMultiply(1, 2, (err, result) => console.log('callbacks', result));

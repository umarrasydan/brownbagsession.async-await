// Converting Callbacks to promises (promisify)
// Automagically
(async () => {
    const { promisify } = require('util');

    function multiply(a, b, callback) {
        return callback(null, a * b);
    }

    const asyncMultiply = promisify(multiply);

    console.log('automagic promisify', await asyncMultiply(1, 2));
})();

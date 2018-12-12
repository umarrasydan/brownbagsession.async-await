// Converting Callbacks to promises (promisify)
// Manually
(async () => {
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

    console.log('manual promisify', await asyncMultiply(1, 2));
})();

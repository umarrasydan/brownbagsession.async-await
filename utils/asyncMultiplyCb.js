const request = require('request');

module.exports = function asyncMultiplyCb(a, b, cb) {
    request
        .get('http://api.mathjs.org/v4', (err, res) => {
            if (err) {
                throw err;
            }

            return cb ? cb(null, Number(res.body)) : undefined;
        })
        .qs({
            expr: `${a}*${b}`
        });
};

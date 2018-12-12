const request = require('request-promise-native');

module.exports = async function asyncMultiply(a, b) {
    const res = await request.get('http://api.mathjs.org/v4').qs({
        expr: `${a}*${b}`
    });

    return Number(res);
};

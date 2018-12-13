// Example of how to do n-parallel array processing
const _ = require('underscore');
const delay = require('../utils/delay');

const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunkedArray = _.chunk(someArray, 2);

async function log(v) {
    await delay(1000);
    return v;
}

(async () => {
    for (const chunk of chunkedArray) {
        // log returns a promise
        const promises = chunk.map(v => log(v));

        console.log(await Promise.all(promises));
    }
})();

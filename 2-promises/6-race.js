const asyncMultiply = require('../utils/asyncMultiply');
const delay = require('../utils/delay');

// Race
Promise.race([asyncMultiply(1, 2), delay(500).then(() => 'I win!')]).then(
    result => console.log('race', result)
);

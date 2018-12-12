const asyncMultiply = require('../utils/asyncMultiply');
const delay = require('../utils/delay');

// Race
(async () => {
    const result = await Promise.race([
        asyncMultiply(1, 2),
        delay(500).then(() => 'I win!')
    ]);

    console.log('race', result);
})();

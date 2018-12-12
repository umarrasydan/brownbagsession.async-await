const asyncMultiply = require('../utils/asyncMultiply');

// Sequential Async Calls
(async () => {
    console.log('sequential', await asyncMultiply(1, 2));
    console.log('I will log between these 2 as expected');
    console.log('sequential', await asyncMultiply(2, 2));
})();

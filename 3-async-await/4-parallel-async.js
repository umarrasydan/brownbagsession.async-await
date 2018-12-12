const asyncMultiply = require('../utils/asyncMultiply');

// Parallel Async Calls
(async () => {
    const [value1, value2] = await Promise.all([
        asyncMultiply(1, 2),
        asyncMultiply(2, 2)
    ]);

    console.log('parallel', value1);
    console.log('parallel', value2);

    const multiplyResult = await Promise.all([
        asyncMultiply(1, 2),
        asyncMultiply(2, 2)
    ]);

    const value11 = multiplyResult[0];
    const value22 = multiplyResult[1];

    console.log('parallel', value11);
    console.log('parallel', value22);
})();

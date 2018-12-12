const asyncMultiply = require('../utils/asyncMultiplyCb');

// Sequential Async Calls
asyncMultiply(1, 2, (err, result) => {
    asyncMultiply(result, 2, (err, result2) =>
        console.log('sequential', result2)
    );
});

asyncMultiply(1, 2, (err, result) => {
    asyncMultiply(result, 2, (err, result2) => {
        asyncMultiply(result2, 2, (err, result3) => {
            asyncMultiply(result3, 2, (err, result4) => {
                asyncMultiply(result4, 2, (err, result5) => {
                    console.log('callback hell', result5);
                });
            });
        });
    });
});

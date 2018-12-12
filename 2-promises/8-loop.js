const asyncMultiply = require('../utils/asyncMultiply');

// Loop
for (let i = 0; i < 10; i++) {
    asyncMultiply(i, 2).then(result => console.log('loop', result));
}

const asyncMultiply = require('../utils/asyncMultiply');

// Loops
(async () => {
    for (let i = 0; i < 5; i++) {
        console.log('for loop', await asyncMultiply(1, 2));
    }

    for (let i of Array(5)) {
        console.log('for of loop', await asyncMultiply(1, 2));
    }

    for (let i in { 1: '', 2: '', 3: '', 4: '', 5: '' }) {
        console.log('for in loop', await asyncMultiply(1, 2));
    }

    const multiplyPromises = [1, 2, 3, 4, 5].map(i => asyncMultiply(i, 2));
    console.log(await Promise.all(multiplyPromises));
})();

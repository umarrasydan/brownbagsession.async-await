function asyncMultiply(a, b) {
    return new Promise(resolve => {
        setTimeout(() => resolve(a * b), 1000);
    });
}

async function multiply(a, b) {
    return a * b;
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

function multiply1(a, b) {
    return Promise.resolve(a * b);
}

// Async
console.log('async', multiply(1, 2));
console.log('async', multiply1(1, 2));

// Await
(async () => {
    console.log('await', await asyncMultiply(1, 2));
})();

(async function() {
    console.log('await', await asyncMultiply(1, 2));
})();

const main = async function() {
    console.log('await', await asyncMultiply(1, 2));
};

main();

(async () => {
    async function double(x) {
        const result = await asyncMultiply(x, 2);

        return result;
    }

    function double1(x) {
        return asyncMultiply(x, 2);
    }

    console.log('await', await double(5));
    console.log('await', await double1(5));
})();

// Sequential Async Calls
(async () => {
    const result1 = await asyncMultiply(1, 2);
    console.log('sequential', result1);
    const result2 = await asyncMultiply(result1, 2);
    console.log('sequential', result2);
})();

// Parallel Async Calls
(async () => {
    const [value1, value2] = await Promise.all([
        asyncMultiply(1, 2),
        asyncMultiply(2, 2)
    ]);

    console.log('parallel', value1);
    console.log('parallel', value2);
})();

// Race
(async () => {
    const result = await Promise.race([
        asyncMultiply(1, 2),
        delay(500).then(() => 'I win!')
    ]);

    console.log('race', result);
})();

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

// Error Handling
(async () => {
    const errorPromise = Promise.reject(new Error('hello from error'));
    try {
        await errorPromise;
    } catch (e) {
        console.log('error handling', e.message);
    } finally {
        console.log("I'll run no matter what");
    }
})();

(async () => {
    const errorPromise = Promise.reject(new Error('hello from error'));
    await errorPromise;
})().catch(e => console.log('catch the uncaught', e.message));

// Converting Callbacks to promises (promisify)
// Manually
(async () => {
    function multiply(a, b, callback) {
        return callback(null, a * b);
    }

    function asyncMultiply(a, b) {
        return new Promise((resolve, reject) => {
            multiply(a, b, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });
    }

    console.log('manual promisify', await asyncMultiply(1, 2));
})();

// Automagically
(async () => {
    const { promisify } = require('util');

    function multiply(a, b, callback) {
        return callback(null, a * b);
    }

    const asyncMultiply = promisify(multiply);

    console.log('automagic promisify', await asyncMultiply(1, 2));
})();

// Promisify Classes
(async () => {
    const { promisify } = require('util');

    class Multiplier {
        constructor() {
            this.x = "I'm X";
        }
        multiply(a, b, callback) {
            console.log(this.x);
            return callback(null, a * b);
        }
    }

    const m = new Multiplier();
    const asyncMultiply = promisify(m.multiply);

    try {
        await asyncMultiply(1, 2);
    } catch (e) {
        console.log('class promisify', e.message);
    }

    const asyncMultiplyProper = promisify(m.multiply).bind(m);
    console.log(await asyncMultiplyProper(1, 2));
})();

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

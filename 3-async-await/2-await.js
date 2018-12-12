const asyncMultiply = require('../utils/asyncMultiply');

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

    async function double2(x) {
        return asyncMultiply(x, 2);
    }

    console.log('await', await double(5));
    console.log('await', await double1(5));
    console.log('await', await double2(5));
})();

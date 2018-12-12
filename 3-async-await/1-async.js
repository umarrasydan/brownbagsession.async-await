// Async
async function multiply(a, b) {
    return a * b;
}

function multiply1(a, b) {
    return Promise.resolve(a * b);
}

console.log('async', multiply(1, 2));
console.log('async', multiply1(1, 2));

// Creating Promise
const createPromise = new Promise((resolve, reject) => {
    if (Math.random() < 0.5) {
        return reject('rejected');
    }

    return resolve('resolved');
});

createPromise.then(value => console.log(value)).catch(err => console.log(err));

const promise = Promise.resolve('hello');
promise.then(value => console.log('immediate resolve', value));

const errorPromise = Promise.reject(new Error('hello from error'));
errorPromise.catch(err => console.log('immediate reject', err.message));

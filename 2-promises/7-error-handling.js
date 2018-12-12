// Error Handling
const errorPromise = Promise.reject(new Error('Catch me if you can'));

errorPromise
    .then(result => console.log(result))
    .catch(err => console.log(err.message));

const async = require('async');
const asyncMultiply = require('../utils/asyncMultiplyCb');

// Using Waterfall
async.waterfall(
    [
        callback => {
            asyncMultiply(1, 2, callback);
        },
        (prevResult, callback) => {
            asyncMultiply(prevResult, 2, callback);
        },
        (prevResult, callback) => {
            asyncMultiply(prevResult, 2, callback);
        },
        (prevResult, callback) => {
            asyncMultiply(prevResult, 2, callback);
        },
        (prevResult, callback) => {
            asyncMultiply(prevResult, 2, callback);
        }
    ],
    (err, result) => {
        console.log('waterfall', result);
    }
);

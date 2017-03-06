const {
    multiply
} = require('../../operations');

const multiplyCustomPromise = (valueA, valueB) => {
    return new Promise((resolve, reject) => {
        multiply(valueA, valueB, (err, product) => {
            if (err) {
                reject(err);
            } else {
                resolve(product);
            }
        })
    })
}

// USAGE

module.exports = (callback) => {
    multiplyCustomPromise(1, 2)
        .then((product) => {
            return multiplyCustomPromise(3, product)
        })
        .then((product) => {
            return multiplyCustomPromise(4, product)
        })
        .then((product) => {
            callback(null, product)
        })
        .catch(callback)
}

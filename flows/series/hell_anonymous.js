const {
    multiply
} = require('../../operations');

module.exports = (callback) => {
    multiply(1, 2, (err, product) => {
        multiply(product, 3, (err, product) => {
            multiply(product, 4, (err, product) => {
                callback(err, product);
            })
        })
    })
}
const {
    multiply
} = require('../../operations');

module.exports = (callback) => {
    let cb0 = () => {
        multiply(1, 2, cb1);
    }

    let cb1 = (err, product) => {
        multiply(3, product, cb2);
    }

    let cb2 = (err, product) => {
        multiply(4, product, callback);
    }

    cb0();
}
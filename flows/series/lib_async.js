const {
    multiply
} = require('../../operations');

const asyncjs = require('async')

module.exports = (callback) => {
    asyncjs.waterfall([
        (cb) => {
            multiply(1, 2, cb)
        },
        (product, cb) => {
            multiply(product, 3, cb)
        },
        (product, cb) => {
            multiply(product, 4, cb)
        }
    ], callback)
}
const {
    multiply
} = require('../../operations');

const series = (fns, callback) => {
    done = function() {
        let args = [].slice.call(arguments);
        let [err, ...params] = args

        if (err) {
            callback(err)
        } else if (fns.length) {
            fns.shift().apply(null, [done].concat(params))
        } else {
            callback.apply(null, args);
        }
    }

    done()
}

module.exports = (callback) => {
    series([
        (cb) => {
            multiply(1, 2, cb)
        },
        (cb, product) => {
            multiply(product, 3, cb)
        },
        (cb, product) => {
            multiply(product, 4, cb)
        }
    ], (err, product) => {
        callback(err, product)
    })
}
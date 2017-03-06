const {
    multiply
} = require('../../operations');

const multiplyGeneratorPromise = (valueA, valueB) => {
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

const solution = function(generator) {
    return new Promise((resolve, reject) => {
        let g = generator()

        next = (val) => {
            let res = g.next(val)

            if (res.done) {
                resolve(val)
            }

            res.value.then((resolved) => {
                next(resolved)
            }).catch(reject)
        }

        next()
    })
}


module.exports = function(callback) {
    solution(function*() {
        let product = yield multiplyGeneratorPromise(1, 2);
        product = yield multiplyGeneratorPromise(3, product);
        yield multiplyGeneratorPromise(4, product);

    }).then((product) => {
        callback(null, product)
    }).catch(callback)
}
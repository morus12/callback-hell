let multiply = (valueA, valueB, callback) => {
    setTimeout(() => {
        callback(null, valueA * valueB)
    }, 1)
}

// SOLUTION 1. CALLBACK HELL

// OVERHEAD

// USAGE

multiply(1, 2, (err, product) => {
    multiply(product, 3, (err, product) => {
        multiply(product, 4, (err, product) => {
            if (err) {
                console.error(err)
            } else {
                console.log(product)
            }
        })
    })
})

// SOLUTION 2. ASYNC WRAP

// OVERHEAD

let series = (fns, callback) => {
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

// USAGE

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
    if (err) {
        console.error(err)
    } else {
        console.log(product)
    }
})

// SOLUTION 3. PROMISE

// OVERHEAD

let multiplyPromise = (valueA, valueB) => {
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

multiplyPromise(1, 2)
    .then((product) => {
        return multiplyPromise(3, product)
    })
    .then((product) => {
        return multiplyPromise(4, product)
    })
    .then((product) => {
        console.log(product)
    })
    .catch((err) => {
        console.error(err)
    })

// SOLUTION 4. GENERATORS

// OVERHEAD

let solution = function(generator) {
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

// SOLUTION

solution(function*() {
    let product = yield multiplyPromise(1, 2);
    product = yield multiplyPromise(3, product);
    yield multiplyPromise(4, product);

}).then((product) => {
    console.log(product)
}).catch((err) => {
    console.error(err)
})
const {
    multiply
} = require('../../operations');

const multiplyAwaitPromise = (valueA, valueB) => {
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

module.exports = async function(callback) {
	try {
		let product = await multiplyAwaitPromise(1,2);
		product = await multiplyAwaitPromise(3,product);
		product = await multiplyAwaitPromise(4,product);
		callback(null, product)
	}catch(e){
		callback(e)
	}
}
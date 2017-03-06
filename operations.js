module.exports = {
	multiply: (valueA, valueB, callback) => {
	    setImmediate(() => {
	        callback(null, valueA * valueB)
	    })
	}
} 
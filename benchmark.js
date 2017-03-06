const Benchmark = require('benchmark');
const fs = require('fs')
const assert = require('assert');

let flows = fs.readdirSync('flows')

for (flow of flows) {
    console.log(`creating suite for flow: ${flow}`)

    let tests = fs.readdirSync(`flows/${flow}`);
    let suite = new Benchmark.Suite;

    for (test of tests) {
        let fn = require(`./flows/${flow}/${test}`)

        suite
            .add(test, {
                defer: true,
                fn: (deferred) => {
                    fn(function(err, product) {
                        deferred.resolve();
                        assert.equal(product, 24, `wrong value for test ${test}, expected 24, got ${product}, ${err}`);
                    })
                }
            })
    }

    suite.on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('end');
        })
        .run({
            async: true
        })
}
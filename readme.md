### Callback Hell Aproaches

This repository contains plain approaches to callback hell problem. It compares different control flows and execution times. 
So this is the plan, i hope i'll find time and contributors for compleating this comparison.

### Requirements
- nodejs 7.7+ (async/await)

### Runing
`npm install`
`node benchmark.js`

### Results

Results from MBP, 15-inch, Mid 2015, 2,5 GHz Intel Core i7.
Hell is fast ;)

##### Series flow

| test                    |results                                        |
|-------------------------|-----------------------------------------------|
|hell_named.js            | 243,363 ops/sec ±1.48% (81 runs sampled)      |
|hell_anonymous.js        | 242,016 ops/sec ±1.63% (80 runs sampled)      |
|lib_async.js             | 135,765 ops/sec ±1.70% (77 runs sampled)      |
|custom_async_wrap.js     | 119,862 ops/sec ±1.41% (76 runs sampled)      |
|custom_async_await.js    |  79,272 ops/sec ±1.56% (76 runs sampled)      |
|custom_promise.js        |  58,217 ops/sec ±1.71% (76 runs sampled)      |
|custom_generators.js     |  34,860 ops/sec ±1.45% (80 runs sampled)      |

/**
 * Example taken from Richard Bird's book
 * "Introduction on Functional Programming using Haskell"
 */
var eps = 0.5;

function curry(fn) {
	return function apply(...args) {
		return args.length>=fn.length ? fn(...args) : (...rest) => apply(...args, ...rest);
	}
}


// until = (p, f(x)) => p(x) ? x : until(p, f(x))
until = (p, f, x) => p(x) ? x : until(p, f, f(x));
satis = (x,y) => Math.abs(y*y-x)<eps;
improve = (x,y) => (y + x/y)/2;

satis = curry(satis);
improve = curry(improve);

sqrt = (x) => until(satis(x), improve(x), x);

console.log(sqrt(2));
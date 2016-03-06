/**
 * List manipulation in JavaScript
 */
MiArray = function(arr) {
  return {
    _reduce: function(fn, acc) {
      return (function reduceFrom(fn, acc, i) {
        return i===arr.length ? acc : reduceFrom(fn, fn(arr[i], acc, i, arr), i+1);
      })(fn, acc, 0);
    },

    _map: function(fn) {
      var reducer = function(e, acc, i, arr) {
        return acc._concat(fn(e));
      }
      return this._reduce(reducer, MiArray([]));
    },

    _filter: function(pn) {
      var reducer = function(e, acc, i, arr) {
        return pn(e) ? acc._concat(e) : acc;
      }

      return this._reduce(reducer, MiArray([]));
    },

    _concat: function(e) {
      return MiArray(arr.concat(e));
    },

    _value: function() {
      return arr;
    },

    _take : function(n) {
      function reducer(e, acc, i, arr) {
        return i<n ? acc._concat(e) : acc;
      }
      return this._reduce(reducer, MiArray([]));
    }
  }
}

var sum = (x, acc) => x+acc;
var double = x => x*2;
var even = x => x%2===0;

var a1 = MiArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
console.log(a1._reduce(sum, 0));
console.log(a1._map(double)._value());
console.log(a1._value());
console.log(a1._filter(even)._value());
console.log(a1._take(2)._value());
console.log(a1._filter(even)._take(2)._map(double)._value());
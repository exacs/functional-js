/**
 * List manipulator with iterators. Infinite lists.
 */
MiArray = function(first) {
  return {
    _reduce: function(fn, acc) {
      function reduceFrom(fn, acc, e) {
        return e.done ? acc : reduceFrom(fn, fn(e.value, acc), e.next());
      }
      return reduceFrom(fn, acc, first);
    },

    _map: function(fn) {
      function mapFrom(fn, e) {
        return {value:fn(e.value), done:e.done, next:function() {return mapFrom(fn, e.next())}}
      }
      return MiArray(mapFrom(fn, first));
    },

    _filter: function(pn) {
      function filterFrom(fn, e) {
        return e.done ? e : pn(e.value) ? {
          value: e.value,
          done : e.done,
          next : function() {return filterFrom(fn, e.next())}
        } : filterFrom(fn, e.next());
      }
      return MiArray(filterFrom(pn, first));
    },

    _value: function() {
      function fill(arr, n) {
        return n.done ? arr : fill(arr.concat(n.value), n.next());
      }
      return fill([], first);
    },

    _take : function(n) {
      function takeFrom(n, e) {
        return e.done || n<=0 ? {done: true} : {
          value:e.value,
          done :e.done,
          next :function() {return takeFrom(n-1, e.next())}
        }
      }
      return MiArray(takeFrom(n, first));
    },

    _skip : function(n) {
      function skipFrom(n, e) {
        return n<=0 || e.done ? e : skipFrom(n-1, e.next());
      }
      return MiArray(skipFrom(n, first));
    }
  }
}

var sum = (x, acc) => x+acc;
var double = x => x*2;
var even = x => x%2===0;

var generador = function(min, max) {
  function nextNext(v) {
    return v<=max ? {value: v, done: false, next: function() {return nextNext(v+1)}} : {done: true}
  }
  return nextNext(min);
}


var a1 = MiArray(generador(1, 10));
console.log('a', a1);
console.log('b', a1._value());
console.log('c', a1._reduce(sum, 0));
console.log('d', a1._map(double)._map(double)._value());
console.log('e', a1._value());
console.log('f', a1._filter(even)._value());

var a2 = MiArray(generador(1, Infinity));
console.log('g', a2._take(2)._value());
console.log('h', a2._filter(even)._take(3)._map(double)._value());
console.log('i', a2._skip(10)._take(1)._value());

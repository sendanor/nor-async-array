/** Benchmarks for different Array join implementations */

/** */
function reverse_join(input) {
	var output = '';
	var s = ',';
	var l = input.length-1;
	var i = l;
	if(i >= 0) {
		output += input[l-(i--)];
		while(i >= 0) output += s + input[l-(i--)];
	}
	return output;
}

function forward_join(input) {
	var output = '';
	var s = ',';
	var l = input.length;
	var i = 0;
	if(i < l) {
		output += input[i];
		while(++i < l) output += s + input[i];
	}
}

function std_join(input) {
	return input.join(',');
}

function std_join_apply(a) {
	return a.join.apply(a, Array.prototype.slice.call(arguments, 1));
}

function std_join_call_apply(a) {
	return a.join.call.apply(a.join, arguments);
}

function std_join_2(input, s_) {
	return input.join(s_);
}

var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var input;

// add tests
suite.add('Reverse loop', function() {
	reverse_join(input);
})

.add('Forward loop', function() {
	forward_join(input);
})

.add('Array.prototype.join()', function() {
	std_join(input);
})

.add('Array.prototype.join() using apply', function() {
	std_join_apply(input);
})

.add('Array.prototype.join() using call + apply', function() {
	std_join_call_apply(input);
})

.add('Array.prototype.join() using direct call', function() {
	std_join_2(input, ',');
})

.on('start', function() {
	input = ['foo', 'bar', 'orange', 'red', 'blue', 'black', 'hello', 'white'];
})

// add listeners
.on('error', function(event) {
	console.error('ERROR: ' + event.target + ': ' + event.target.error);
})

.on('cycle', function(event) {
	console.log(String(event.target));
})

.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})

.run();

/* EOF */

/*
 * nor-async-array -- Asynchronous Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

var _Q = require('q');

/** Perform `f(i)` on each item in an array and build new array from results.
 * @param a {array} The data to perform operations
 * @param f {function} The function to call for each item
 * @returns Chainable promise of new array
 */
function async_array_map(a, f) {
	var defer = _Q.defer();
	var step;

	var a2 = new Array(a.length);
	var l = a.length-1;
	var i = l;
	var ii = 0;

	/** The actual work to do each tick */
	function _step() {
		if(i >= 0) {

			/*jshint plusplus:false*/
			ii = l-(i--);

			_Q.when( f(a[ii], ii, a) ).then(function(r) {
				a2[ii] = r;
				process.nextTick(step);
			}).fail(function(err) {
				defer.reject(err);
			}).done();
		} else {
			defer.resolve(a2);
		}
	}

	/** We have try-catch as its own function because of v8 JIT optimizations */
	step = function step() {
		try {
			_step();
		} catch(err) {
			defer.reject(err);
		}
	};

	// Let's start the loop in next tick
	process.nextTick(step);

	return defer.promise;
}

// Exports
module.exports = async_array_map;

/* EOF */
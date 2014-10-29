/*
 * nor-async-array -- Asynchronous Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

var _Q = require('q');

/** Perform `f(i)` on each item in an array.
 * @param a {array} The data to perform operations
 * @param f {function} The function to call for each item
 * @returns Chainable promise which has all operations as members
 */
function async_array_forEach(a, f) {
	var defer = _Q.defer();
	var _immediate;
	var l = a.length-1;
	var i = l;
	var ii = 0;

	var step;

	/** */
	function _reject(err) {
		clearImmediate(_immediate);
		defer.reject(err);
	}

	/** */
	function _resolve() {
		clearImmediate(_immediate);
		defer.resolve(a);
	}

	/** The actual work to do each tick */
	function _step() {
		if(i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			_Q.when( f(a[ii], ii, a) ).then(function() {
				_immediate = setImmediate(step);
			}).fail(_reject).done();
		} else {
			_resolve();
		}
	}

	/** We have try-catch as its own function because of v8 JIT optimizations */
	step = function step() {
		try {
			_step();
		} catch(err) {
			_reject(err);
		}
	};

	// Let's start the loop in next tick
	_immediate = setImmediate(step);

	return defer.promise;
}

// Exports
module.exports = async_array_forEach;

/* EOF */

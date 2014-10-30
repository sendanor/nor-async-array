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
function async_array_forEach(a, opts, f) {
	var defer = _Q.defer();
	var steps_per_tick = opts.steps;
	var _immediate;

	var _time = opts.time;
	var _min_steps = opts.min_steps;

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

		//console.log("steps_per_tick = " + steps_per_tick);
		var limit = i - steps_per_tick;
		if(limit < 0) { limit = 0; }

		var time = process.hrtime();
		while(i >= limit) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			f(a[ii], ii, a);
		}
		if(i < 0) {
			_resolve();
			return;
		}
		var diff = process.hrtime(time);

		// Dynamic steps
		diff = diff[0] * 1e9 + diff[1]; // diff will be nanoseconds this step was
		diff = diff / steps_per_tick; // diff will be nanoseconds of avarage step
		//console.log("nanoseconds per step = " + diff);
		if(diff >= 1) {
			steps_per_tick = Math.round( _time / diff ); // Calculate new optimal steps_per_tick (for 5 millisecond steps)
			if(steps_per_tick < _min_steps) {
				steps_per_tick = _min_steps;
			}
		}

		_immediate = setImmediate(step);
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

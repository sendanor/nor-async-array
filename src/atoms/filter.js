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
function async_array_filter(a, opts, f) {
	var defer = _Q.defer();
	var _immediate;
	var step;

	var steps_per_tick = opts.steps;
	var _time = opts.time;
	var _min_steps = opts.min_steps;

	var a2 = new Array(a.length);
	var l = a.length-1;
	var i = l;
	var ii = 0;
	var n = 0;

	/** */
	function _reject(err) {
		clearImmediate(_immediate);
		defer.reject(err);
	}

	/** */
	function _resolve() {
		a2.length = n;
		clearImmediate(_immediate);
		defer.resolve(a2);
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
			if( f(a[ii], ii, a) ) {
				a2[n++] = a[ii];
			}
		}
		if(i < 0) {
			_resolve();
			return;
		}

		// Dynamic step calibration
		var diff = process.hrtime(time);
		diff = (diff[0] * 1e9 + diff[1]) / steps_per_tick; // diff will be nanoseconds of avarage step
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
module.exports = async_array_filter;

/* EOF */

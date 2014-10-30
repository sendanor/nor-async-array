/*
 * nor-async-array -- Asynchronous Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

var async_forEach = require('./forEach.js');
var async_map = require('./map.js');
var async_filter = require('./filter.js');
var async_every = require('./every.js');
var async_some = require('./some.js');

/** The array instance init
 * @param a {array} The data to perform operations
 * @returns Chainable resource which has all operations as members
 */
function async_array(a, opts) {
	opts = opts || {};

	// The time per tick
	opts.time = opts.time || 50000;
	if(typeof opts.time !== 'number') {
		opts.time = parseInt(opts.time, 10);
	}

	// The steps per tick. This will be optimized by `opts.time`
	opts.steps = opts.steps || 10;
	if(typeof opts.steps !== 'number') {
		opts.steps = parseInt(opts.steps, 10);
	}

	opts.min_steps = 1;

	return {
		'forEach': async_forEach.bind(undefined, a, opts),
		'map': async_map.bind(undefined, a, opts),
		'filter': async_filter.bind(undefined, a, opts),
		'every': async_every.bind(undefined, a, opts),
		'some': async_some.bind(undefined, a, opts)
	};
}

// Exports
module.exports = async_array;

/* EOF */

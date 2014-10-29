/*
 * nor-async-array -- Asynchronous Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

/** The array instance init
 * @param a {array} The data to perform operations
 * @returns Chainable resource which has all operations as members
 */
function async_array(a) {
	return {
		'forEach': require('./forEach.js').bind(undefined, a)
	};
}

// Exports
module.exports = async_array;

/* EOF */

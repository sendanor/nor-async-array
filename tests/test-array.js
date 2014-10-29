/**
 * Tests for nor-array
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

var assert = require("assert");
var IMPL = process.env.TEST_ARRAY_IMPL || 'atoms';

// Exports
var ARR = require('nor-async-array/' + IMPL );

/** Tests for nor-array */
describe('nor-array', function(){

	/** Tests for nor-array(a).forEach() */
	describe('#forEach', function(){

		/** Normal test */
		it('can be used to copy elements from a to b', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
			var b = [];
			function push_to_b(v) {
				b.push(v);
			}
			return ARR(a).forEach(push_to_b).then(function() {
				assert.strictEqual( a.length, b.length );
				assert.strictEqual( a.length, 32 );

				for(var i=0; i<32; i++) {
					assert.strictEqual( a[i], b[i] );
				}
			});

		});

	}); // #forEach

	/** Tests for nor-array(a).map() */
	describe('#map', function(){

		/** Normal test */
		it.skip('can be used to change and copy elements from a to b', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

			function step(v) {
				return v+1;
			}

			var b = ARR(a).map(step).valueOf();

			assert.strictEqual( a.length, b.length );
			assert.strictEqual( a.length, 32 );

			for(var i=0; i<32; i++) {
				assert.strictEqual( a[i], b[i]-1 );
			}

		});

	}); // #map

	/** Tests for nor-array(a).filter() */
	describe('#filter', function(){

		/** Normal test */
		it.skip('can be used to filter elements from a to b', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

			function step(v) {
				return v >= 16;
			}

			var b = ARR(a).filter(step).valueOf();

			assert.strictEqual( a.length, 32 );
			assert.strictEqual( b.length, 16 );

			for(var i=0; i<32; i++) {
				assert.strictEqual( a[i], i );
			}

			for(var i=0; i<16; i++) {
				assert.strictEqual( b[i], 16+i );
			}

		});

	}); // #filter

	/** Tests for nor-array(a).every() */
	describe('#every', function(){

		/** Normal test */
		it.skip('can be used to test array elements', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

			assert.strictEqual( a.length, 32 );
			for(var i=0; i<32; i++) {
				assert.strictEqual( a[i], i );
			}

			var b;

			b = ARR(a).every(function(v) { return v >= 16; });
			assert.strictEqual( a.length, 32 );
			assert.strictEqual( b, false );

			b = ARR(a).every(function(v) { return v >= 0; });
			assert.strictEqual( a.length, 32 );
			assert.strictEqual( b, true );

		});

	}); // #every

	/** Tests for nor-array(a).some() */
	describe('#some', function(){

		/** Normal test */
		it.skip('can find some elements', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

			assert.strictEqual( a.length, 32 );
			for(var i=0; i<32; i++) {
				assert.strictEqual( a[i], i );
			}

			var b;

			b = ARR(a).some(function(v) { return v >= 16; });
			assert.strictEqual( a.length, 32 );
			assert.strictEqual( b, true );

			b = ARR(a).some(function(v) { return v >= 100; });
			assert.strictEqual( a.length, 32 );
			assert.strictEqual( b, false );

		});

	}); // #some

	/** Tests for nor-array(a).concat() */
	describe('#concat', function(){

		/** Normal test */
		it.skip('can concat arrays together', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
			var b = [16, 17, 18, 19, 20, 21, 22, 23];
			var c = [24, 25, 26, 27, 28, 29, 30, 31];

			assert.strictEqual( a.length, 16 );
			assert.strictEqual( b.length, 8 );
			assert.strictEqual( c.length, 8 );

			var x = ARR(a).concat(b, c).valueOf();

			assert.strictEqual( x.length, 32 );
			assert.strictEqual( x.length, a.length + b.length + c.length );

			for(var i=0; i<32; i++) {
				assert.strictEqual( x[i], i );
			}

		});

	}); // #concat

	/** Tests for nor-array(a).indexOf() */
	describe('#indexOf', function(){

		/** Normal test */
		it.skip('can find index', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
			assert.strictEqual( a.length, 32);
			for(var i=0; i<32; i++) {
				assert.strictEqual( a[i], i );
			}

			var b;

			b = ARR(a).indexOf(3);
			assert.strictEqual( b, 3 );

			b = ARR(a).indexOf(300);
			assert.strictEqual( b, -1 );

		});

	}); // #indexOf

	/** Tests for nor-array(a).lastIndexOf() */
	describe('#lastIndexOf', function(){

		/** Normal test */
		it.skip('can find last index', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 3, 31];
			assert.strictEqual( a.length, 32);

			var b;

			b = ARR(a).lastIndexOf(3);
			assert.strictEqual( b, 30 );

			b = ARR(a).lastIndexOf(300);
			assert.strictEqual( b, -1 );

		});

	}); // #lastIndexOf

	/** Tests for nor-array(a).join() */
	describe('#join', function(){

		/** Normal test */
		it.skip('can join elements', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7];
			assert.strictEqual( a.length, 8);

			var b;

			b = ARR(a).join();
			assert.strictEqual( b, '0,1,2,3,4,5,6,7');

			b = ARR(a).join(', ');
			assert.strictEqual( b, '0, 1, 2, 3, 4, 5, 6, 7');

		});

	}); // #join

});

/* EOF */

#!/bin/bash
set -e

export TEST_TIMEOUT=900000  # 15 minutes/test

if test -f output.txt; then
	echo 'output.txt: exists already' >&2
	exit 1
fi

(for test in benchmarks/test-*.js; do
	node "$test"
done) > output.txt

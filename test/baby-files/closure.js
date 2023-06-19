'use strict';

function parent() {
	return function (param) {
		return { message: param };
	}
}

const inst = parent();
const debug = inst('closure - OK');

console.log(debug);
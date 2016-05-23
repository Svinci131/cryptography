'use strict';

var base64 = require('./base64');
var random = {};
 
random.integer = function (min, max) { 

	if(!max) {
		max = min;
		min = 0;
	}

	return Math.round(Math.random() * (max - min) + min);
};

var charSet = base64._charSet;

random.base64 = function (length) {

	var digits = [];

	while (length--){

		digits.push(this.integer(63));
	}

	return base64.fromDigits(digits);

};

module.exports = random;

'use strict';

var base64 = require('./base64');
var utils = require('./utils');

var hash = {};

hash.simple = {};

//pad(str, num) => (string.length === length)
hash.simple._pad = function (string, length) {
	
	var reverse = string.split("").reverse().join("");
	
	while (string.length < length) {
		string += reverse;
	}

	return string;
};
//_partition(string, num) => array
hash.simple._partition = function (string, size) {
	
	var holder = [];
	
	for (var i = 0; i < string.length; i+=size){
		var section = string.slice(i, i+size);
		holder.push(section); 
	}

	return holder;
};
//_combine (str, str) => string
hash.simple._combine = function (str1, str2) {
	
	var dig1 = base64.toDigits(str1);
	var dig2 = base64.toDigits(str2);
	var combined = []; 
	// var combined = dig1.length.map(function(d1, i) {
	// 	return d1 ^ dig2[i];
	// });
	for(var i = 0; i < dig1.length; i++){
		var xor = dig1[i] ^ dig2[i];
		combined.push(xor);
	}

	return base64.fromDigits(combined);
};

hash.simple.run = function (string, size) {

	var b64 = utils.asciiToBase64(string); 
	var padded = hash.simple._pad(b64, 2 * size);
	var parts = hash.simple._partition(padded, size);
	return parts.reduce(hash.simple._combine);
	// return parts.reduce(function(a, b){
	// 	hash.simple._combine(a,b);
	// });
};

hash.hmac = function (hashfn, secret, string, length) {
	if (arguments.length < 4) {
		length = string; 
		string = secret; 
		secret = hashfn; 
		hashfn = hash.simple.run;
	}
	// console.log(hashfn)
	return hashfn(secret+string, length);
};

hash.pbdkf2 = function (hashfn, text, salt, rounds, size) {
	//chanign to be run if nothing 
	if (arguments.length < 5) {
		size = rounds;
		rounds = salt; 
		salt = text; 
		text = hashfn; 
		hashfn = hash.simple.run;
	}
	var result = text; 
	while (rounds--) {
		result = hash.hmac(hashfn, salt, result, size);
	}
	return result; 
};

module.exports = hash;

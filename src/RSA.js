'use strict';

var utils = require('./utils');

var RSA = {};


//function 
var gcd = function(a, b) {
    if (! b) {
        return a;
    }
    return gcd(b, a % b);
};


//pq => [e, d]
RSA._selectKeyPair = function (num1, num2) {
	console.log("start")
	//p = num1 = e : d
	//q = num2
	//var n = p*q
	var n = num1*num2; 
	//totient = φ(n) 
	var phiN = utils.totient(n, [num1, num2]);
	var e = 2; 
	var k = 1;
	var d; 

	while(true) {
		if (e < phiN && gcd(e, phiN) === 1) {
			console.log(e);
			d = (k*phiN+1/e)
			while (!Number.isInteger(d)){
				k++; 
			}	
		}
		e++;
	}
	
	console.log([e, d]);
	return [e, d];
}

//two primes(num1, num2) =>public string and private string
RSA.generateKeys = function (num1, num2) {
//Choose two distinct prime numbers p and q.
//var p = 
//var q = 


};




RSA.encrypt = function (key, text) {
	//get m and e
	var pieces = key.split(":"); 
	var modulus = pieces[0];
	var e = pieces[1];
	////seperate into digits
	//put digits back into string 
};

RSA.decrypt = function () {
	
	
};

module.exports = RSA;

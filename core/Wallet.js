var crypto 	= require('crypto');
var Address = require('./Address');
var util 		= require('../util');

module.exports = class Wallet {
	constructor(config = {}){
		this.config = config;
		this.addresses = [];

		if(this.config && !this.config.keyPoolSize){
			this.config.keyPoolSize = 5;
		}

		for(let i = 0; i < this.config.keyPoolSize; i++){
			this.addresses.push(new Address(util.randomNumber()));
		}

		console.log(`Wallet: \n${JSON.stringify(this, null, 2)}`);
	}
	getBalance(){
		let balance = 0;
		this.addresses.forEach((item, index) => {
			balance += item.value;
		});

		return balance;
	}
	getStakeWeight(){
		//TODO: Proper stake weight algo
		return this.getBalace();
	}
}
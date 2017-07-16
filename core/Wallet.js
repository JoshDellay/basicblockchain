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
			this.addresses.push(new Address('test'));
		}

		console.log(`Wallet: \n${JSON.stringify(this, null, 2)}`);
	}
	getBalance(address, chain){
		let balance = 0;

		this.addresses.forEach((item, index) => {
			if(address === item.public){
				chain.blocks.forEach((block, index) => {
					block.txs.forEach((tx, index) => {
						tx.outputs.forEach((o, index) => {
							if(address === o.address){
								balance += o.value;
							}
						});
					});
				});	
			}
		});
		console.log(`Balance at block heigh #${chain.getHeight()}: ${balance}`);
	}
	getStakeWeight(){
		//TODO: Proper stake weight algo
		return this.getBalace();
	}
}
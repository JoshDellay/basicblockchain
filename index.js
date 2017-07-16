const crypto 				= require('crypto');
const util 					= require('./util');
const Address 			= require('./core/Address');
const Wallet 				= require('./core/Wallet');
const Transaction 	= require('./core/Transaction');
const script 				= require('./script');
const Block 				= require('./core/Block');
const Miner 				= require('./Miner');
const repl 					= require('repl');


txPool 		= [];

class Chain {
	constructor(chain = []){
		this.blocks 		= chain;
		this.prevBlock 	= this.blocks.slice(-1)[0] || {};

		if(this.blocks.length == 0){
			new Block().then((nextBlock) => {
				this.blocks.push(nextBlock);
				console.log(`Block: \n${JSON.stringify(nextBlock, null, 2)}`);
			});
		}
	}
	getBlock(hash){
		for(let i = 0; i <= this.blocks.length; i++){
			if(this.blocks[i] && this.blocks[i].hash == hash){
				console.log(this.blocks[i]);
				return this.blocks[i]
			} else {
				console.log('No block found for', hash);
				return {}
			}
		}
	}
}

var wallet 			= new Wallet({keyPoolSize: 1});
var blockchain 	= new Chain();

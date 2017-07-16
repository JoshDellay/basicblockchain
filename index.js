const crypto 				= require('crypto');
const util 					= require('./util');
const Address 			= require('./core/Address');
const Wallet 				= require('./core/Wallet');
const Transaction 	= require('./core/Transaction');
const script 				= require('./script');
const Block 				= require('./core/Block');
const Miner 				= require('./Miner');
const readline 			= require('readline');
const rl 						= readline.createInterface(process.stdin, process.stdout);

txPool 		= [];

class Chain {
	constructor(chain = []){
		return new Promise((resolve, reject) => {
			this.blocks 		= chain;
			this.prevBlock 	= this.blocks.slice(-1)[0] || {};
			this.height 		= this.getHeight()
			if(this.blocks.length == 0){
				new Block().then((nextBlock) => {
					this.blocks.push(nextBlock);
					console.log(`Block: \n${JSON.stringify(nextBlock, null, 2)}`);
					resolve(this);
				});
			}
		});
	}
	getBlock(hash){
		for(let i = 0; i < this.blocks.length; ++i){
			if(this.blocks[i] && this.blocks[i].hash == hash){
				console.log(this.blocks[i]);
				return this.blocks[i]
			} else {
				console.log('No block found for', hash);
				return {}
			}
		}
	}
	addBlock(block){
		this.blocks.push(block);
		console.log(`Block: \n${JSON.stringify(block, null, 2)}`);
	}
	getHeight(){
		return this.blocks.length;
	}
}

var wallet 			= new Wallet({keyPoolSize: 1});
var blockchain 	= new Chain().then((chain) => {
	rl.setPrompt('Press Enter to mine new block, "b" for balance, "q" to quit.');
	rl.prompt();
	rl.on('line', function(line) {
	  if (line === "n") {
	  	rl.close()
	  } else if (line === "b"){
	  	wallet.getBalance('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', chain)
	  } else {
	  	let prevBlock = chain.blocks.slice(-1)[0];
	  	rl.prompt();
	  	new Transaction('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 10, 0.001).then((tx) => {
				txPool.push(tx);

				new Block(prevBlock, txPool).then((newBlock) => {
	  			chain.addBlock(newBlock);
	  			txPool = [];
				});
	  	});
	  }
	}).on('close',function(){
	    process.exit(0);
	});
});



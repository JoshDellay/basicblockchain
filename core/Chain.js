const crypto 				= require('crypto');
const Block 				= require('./Block');

module.exports = class Chain {
	constructor(chain = []){
		return new Promise((resolve, reject) => {
			this.blocks 		= chain;
			this.prevBlock 	= this.blocks.slice(-1)[0] || {};
			
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
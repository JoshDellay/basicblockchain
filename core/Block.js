var crypto 			= require('crypto');
var Transaction = require('./Transaction');
var miner 			= require('../Miner');

module.exports = class Block {
	constructor(prevBlock = {}, txs = []){
		return new Promise((resolve, reject) => {
			const hash = crypto.createHash('sha256');
			this.version = 1;
			this.prevHash = prevBlock.hash || "0x";
			this.height = prevBlock.height + 1 || 0;
			this.txs 		= txs;
			this.merkleRoot; // TODO: implement proper merkle tree
			this.difficulty = 6;
			this.nonce = 0;
			this.timeStamp = Date.now();
			this.reward = 10;

			if(this.height == 0){
				console.log('Creating genesis block...');
				const genesisHash 		= crypto.createHash('sha256');
				const genesisKey 			= 'test';
				const genesisAddress 	= genesisHash.update(genesisKey).digest('hex');
				
				this.reward = 1000;
				new Transaction(genesisAddress, genesisAddress, this.reward, 0.001).then((tx) => {
					txs.push(tx);
					this.hash = hash.update(JSON.stringify(this)).digest('hex');	
					resolve(this);
				});
			} else if(miner.getWork(this)) {
				this.hash = hash.update(JSON.stringify(this)).digest('hex');	
				resolve(this);
			} else {
				console.log('Not enough work, try again');
				reject();
			}
		});
	}
}
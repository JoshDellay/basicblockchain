var crypto 	= require('crypto');
var miner 	= require('../Miner');

module.exports = class Block {
	constructor(prevHash = "0x", txs = []){
		return new Promise((resolve, reject) => {
			const hash = crypto.createHash('sha256');
			
			this.version = 1;
			this.prevHash = prevHash;
			this.height = 0 + 1;
			this.txs 		= txs;
			this.merkleRoot; // TODO: implement proper merkle tree
			this.difficulty = 6;
			this.nonce = 0;
			this.timeStamp = Date.now();

			if(this.height-1 == 0){
				let genesisHash = crypto.createHash('sha256');
				let gensisAddress = crypto.createHash('sha256');
			
				let tx = {
					value: 1000,
					address: gensisAddress.update('123').digest('hex'),
					data: 'The start of a new chain...'
				};
				
				tx.hash = genesisHash.update(JSON.stringify(tx)).digest('hex');
				txs.push(tx);
			} 

			if(miner.getWork(this)){
				this.hash = hash.update(JSON.stringify(this)).digest('hex');	
				resolve(this);
			} else {
				console.log('Not enough work, try again');
				reject();
			}
		});
	}
}
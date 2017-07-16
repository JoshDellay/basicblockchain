var crypto 			= require('crypto');
var script			= require('../script');

module.exports = class Transaction {
	constructor(sendFrom, sendTo, value, fee){
		return new Promise((resolve, reject) => {
			let txHash = crypto.createHash('sha256');

			this.fee 						= fee;
			this.inputs 				= [];

			if(Array.isArray(sendFrom)){
				sendFrom.forEach((tx, index) => {
					this.inputs.push(tx);
				});
			} else {
				this.inputs.push(sendFrom);
			}
			
			this.outputs 				= [];

			this.outputs.push({
				address: sendTo,
				value,
				hash: txHash.update(JSON.stringify(this)).digest('hex')
			});

			console.log(`Tx: \n${JSON.stringify(this, null, 2)}`);
			resolve(this);
			// script(this)
			// .then(() => {
			// 	txPool.push(this);
			// 	console.log(`Tx: ${JSON.stringify(this, null, 2)}`);	
			// 	console.log(`Total TX's: ${txPool.length}`);
			// })
			// .catch((error) => {
			// 	console.log(error);
			// });
		});
	}
}
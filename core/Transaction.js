module.exports = class Transaction {
	constructor(inputs, toAddress, value, fee){
		let txHash = crypto.createHash('sha256');
		this.fee 						= fee;
		this.inputs 				= inputs;
		this.output 				= {
			address: toAddress,
			value,
			hash: txHash.update(JSON.stringify(this)).digest('hex')
		};

		script(this)
		.then(() => {
			txPool.push(this);
			console.log(`Tx: ${JSON.stringify(this, null, 2)}`);	
			console.log(`Total TX's: ${txPool.length}`);
		})
		.catch((error) => {
			console.log(error);
		});
	}
}
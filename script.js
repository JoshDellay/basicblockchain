module.exports = function script(tx) {
	return new Promise((resolve, reject) => {
		if(tx.fee < 0.001){
			reject('Tx fee too small.');
		}
		if(tx.input.address == tx.output.address){
			reject('Error: Input address cannot be same as output address');
		} else {

			tx.scriptSig; //Sender must sign transaction before competion, signature is included for verification in next block.
			resolve();
		}
	});
}
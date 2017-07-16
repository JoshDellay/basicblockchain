var crypto 	= require('crypto');

module.exports = {
	checkForDuplicateAddress: function(address, addresses){
		return new Promise((resolve, reject) => {
			if(addresses.length > 0){
				addresses.forEach((keypair, index) => {
					if(JSON.stringify(keypair) == JSON.stringify(address)){
						reject('Error: address already exists');
					} else {
						resolve();
					}
				});
			} else {
				resolve();
			}
		});
	},
	randomNumber: function(){
    return (Math.random() * Date.now()).toFixed(0);
	}	
}
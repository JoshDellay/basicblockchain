var crypto 	= require('crypto');

module.exports = class Address {
	constructor(key){
		const hash 		= crypto.createHash('sha256');
		
		this.private 	= key;
		this.public 	= hash.update(key).digest('hex');

		return this;
	}
}
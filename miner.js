//PROOF OF STAKE BLOCK GENERATION, NOT TRADITIONAL POW...
class Miner {
	constructor(config = {}){
		this.config = config;
		this.mining = false;
	}
	start(){
		if(this.mining == false){
			console.log('Start mining...');
			this.mining = !this.mining;
			this.miner = setInterval(() => {
				console.log('Attemping to mine block...');
			},1000);

		} else {
			console.log('Already mining...');
		}
	}
	stop(){
		if(this.mining == true){
			this.mining = !this.mining;
			clearInterval(this.miner);
			console.log('Stop Mining...');
		} else {
			console.log('Not mining...');
		}
	}
	getWork(block){
		return block;
	}
	getStake(block){
		//TODO: Create stake weight algo for block
		return block
	}
}

module.exports = new Miner();
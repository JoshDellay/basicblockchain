const Wallet 				= require('./core/Wallet');
const Transaction 	= require('./core/Transaction');
const Block 				= require('./core/Block');
const Chain 				= require('./core/Chain');
const Miner 				= require('./Miner');
const readline 			= require('readline');
const rl 						= readline.createInterface(process.stdin, process.stdout);

txPool 		= [];

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
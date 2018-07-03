//var user = require('./users');
const path =require('path');

module.exports = function(io){

	//verificar coockie para permitir conccion 

	io.on('connection', (socket)=>{

			var dir = socket.handshake.headers.referer.split(path.sep);

			s1= (socket.id);
			
			// creo los juegos
			// o agrego jugador
			//se lo pido al Admin
			let ub = Admin.addGames(dir[4],dir[5],dir[6],s1);

			if (ub){
				
				let opp = Admin.getMap().get(socket.id);
				//cargo la partida en data y la comparto para armar la pag
				//Data 
				Data = Admin.getPartidaBySockerId(socket.id);
				//console.log('GAME :',Data.players); 
				socket.emit('GameReady',Data.players);
				socket.broadcast.to(opp).emit('GameReady',Data.players);
			}


				socket.on('clickplayer',(clickData)=>{
				let opp = Admin.getMap().get(socket.id);


				let fin = Admin.clickEvent(socket.id,opp, clickData);

				//cargo la partida en data y la comparto para armar la pag
				//Data 
				Data = Admin.getPartidaBySockerId(socket.id);

				socket.emit('GameRefresh',Data.players);
				socket.broadcast.to(opp).emit('GameRefresh',Data.players);
				socket.broadcast.to(opp).emit('clickAtack',clickData);
				if (fin){
					socket.emit('GameFinsh','YOU WIN');
					socket.broadcast.to(opp).emit('GameFinsh','YOU LOSE');

				}
			});

	});
}
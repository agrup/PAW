

$(document).ready(function(){

	const socket = io();

	//Al hacer click en un  jugador informo al server 
	var clickP =document.getElementsByClassName("click");

		$('.click-container').click(function (){

			let UserId = socket.id;
			let UserClickeado = this.id;
			console.log(UserClickeado);
			socket.emit('clickplayer',{
				click :"+1",
				//User: UserId,
				Userc:UserClickeado,
		//	})
		});

	});
  //respuesta clickAtack del servidor
	socket.on('clickAtack',function(ataque){
		//console.log($('.click-container'));
		
		var itemagregar = $('div#'+ataque.Userc+'.click-container');
		itemagregar.append('<p class="clickeffect">Click</p>')
		/*
		itemagregar.slideup();
		*/
		$('.clickeffect').animate({
		    opacity: 0.25,
		    left: "+=100",
		    //height: "toggle"
		  }, 700, function() {
		    this.remove();
		    // Animation complete.
		  });
		//console.log(itemagregar);
	});

	socket.on('GameReady',function(Game){
		console.log(Game);
		console.log(Game.player2);
		console.log(Game.player1);

		$('#np1').append('<p>'+Game.player1.User.name+'</p>');
		$('#np2').append('<p>'+Game.player2.User.name+'</p>');
		
		$('#lp1').append('<p> Energia '+Game.player1.Vida+'</p>');
		$('#lp2').append('<p> Energia '+Game.player2.Vida+'</p>');
		
		$('#up1').append('<p>Personaje'+Game.player1.User.Player+'</p>');
		$('#up2').append('<p>Personaje'+Game.player2.User.Player+'</p>');

	});	
	socket.on('GameRefresh',function(Game){

		$('#lp1').text(' Energia '+Game.player1.Vida);
		$('#lp2').text(' Energia '+Game.player2.Vida);


	});
	socket.on('GameFinsh',function(Result){
		$('dev.finish').append('<h1>Usted: '+Result+'</h1>');
		alert(Result);
	});

});
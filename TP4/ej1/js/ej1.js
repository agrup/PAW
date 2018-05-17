var console = console || {},
  document = document || {},



		MemoTest={
			 tamaño: 3,
			 imagenes: ['img/Argentina.png', 'img/Argentina.png', "img/Bahrain.png","img/Bahrain.png","img/Benin.png",
			 "img/Benin.png","img/Brazil.png","img/Brazil.png","img/australia.png"],
			
			iniciar:function (contenedor){
				
				"use strict";
				var div = document.getElementById(contenedor);
				this.imagenes=this.ordernarImagenes(this.imagenes);
				this.armarGrilla(div);
				this.armarMemo(div);
				},

			armarGrilla:function(div){
				var egrilla = document.createElement("h3");
				tgrilla = document.createTextNode("tamaño del juego: "+ this.tamaño);
				 egrilla.appendChild(tgrilla);
				 div.appendChild(egrilla);},

			armarMemo:function(div){ 
				var tamañoActual=this.tamaño;
				var table = document.createElement("TABLE");
				//table.setAttribute("id", "myTable");
				var tbody=document.createElement("TBODY");
				//tbody.setAttribute("id", "tbody");
				var n=0;
				var b=false;
					for (var i = 0; i < tamañoActual; i++) {

							var tr=document.createElement("TR");
							//tr.setAttribute("id", "tr");
							
							for (var j = 0; j < tamañoActual; j++) {
								var td=document.createElement("TD");
								var img = document.createElement("img");
								
								img.setAttribute("id",n)
								img.setAttribute('name',"down");

								//var random=Math.floor((Math.random() * this.imagenes.size) + 0);
								//var imagSelec=this.imagenes.pop();
								n++;
								img.src="img/blanco.png";
								

								td.appendChild(img);
								//document.getElementById("tr").appendChild(td);

								tr.appendChild(td);
								img.addEventListener("click", function (event) {
							          var event = event || e;
							          var delayInMilliseconds = 2000	;
							          //antes de dar vuelta me fijo si hay mas de 2 levantadas
							   if (img.name!="permanent"){ 
							          cantFlip=MemoTest.verFlip();
							          
							          if (cantFlip<2) {
							          	  //doy vuelta la carta
								          event.target.src=MemoTest.imagenes[parseInt(event.target.id)];
								          event.target.name="flip";
							          }
							          console.log(event.target.name);
								     cantFlip=MemoTest.verFlip();
							          if(cantFlip==2){
								          b=MemoTest.similitudFlip( event.target);
								          

								          if(b==true){
								          	event.target.setAttribute("name","permanent");
								          	MemoTest.setPermanent(event.target);
								          	console.log(b);
								          	console.log(event.target.name);
								          }
								          else if(b==false){
								          	//todas las no permanent en blanco
								          	setTimeout(function() {
												  MemoTest.todasBlanco();
											},delayInMilliseconds);
								          	
								          	//event.target.src="img/blanco.png";
								          }
							      }}

						        })

							}
							table.appendChild(tr);													
						}
						div.appendChild(table);


			},
			ordernarImagenes:function(a) {
				    var j, x, i;
				    for (i = a.length - 1; i > 0; i--) {
				        j = Math.floor(Math.random() * (i + 1));
				        x = a[i];
				        a[i] = a[j];
				        a[j] = x;
				    }
				    return a;
				},
			verFlip:function(){
				var cantFlip=0;
				for (var i = 0; i < this.imagenes.length; i++) {
					img=document.getElementById(i);
					if (img.name=="flip") {
						cantFlip++;
					}
				}	
				return cantFlip;
			},
			similitudFlip:function(img){
				var n=false;
				console.log(img.id);
				for (var i = 0; i < this.imagenes.length; i++) {
					img2=document.getElementById(i);

					if ((img2.id!=img.id)&&(img2.src==img.src)&&(img.name=="flip")&&(img2.name=="flip")) {
						n=true;

					}
				}	
				return n;
			},
			todasBlanco:function(){
				for (var i = 0; i < this.imagenes.length; i++) {
					img2=document.getElementById(i);
					if (img2.name!="permanent") {
						console.log(img2.name);
						img2.src="img/blanco.png";
						img2.name="down";
					}
					
				}	
			},
			setPermanent:function(img){
				var img2;
				for (var i = 0; i < this.imagenes.length; i++) {
					img2=document.getElementById(i);
					if (img2.src==img.src) {
						img2.setAttribute("name","permanent");
					}
				}
			},
			
		
};




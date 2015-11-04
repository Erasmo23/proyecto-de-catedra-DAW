var mesa;
//creando el evento load de la ventana para prepara las imagenes y eventos que se crearan
if(window.addEventListener){//navegadores recientes
window.addEventListener("load", iniciar, false);
} else if (window.attachEvent){//internet explorer
window.attachEvent("onload", iniciar);
}

function iniciar () {
	var imagenes = document.getElementsByClassName("obtener");//obteniendo todas las imagenes de las mesas
	imagenes[0].style.border="thick double #FF6C00";//colocando estilo al por defecto
	var radios= mesaslocal.elements['mesa'];//obteniendo todos los radios button de las mesas
	for (var i = 0; i < imagenes.length; i++) {
		imagenes[i].setAttribute('onclick', 'ponerckequeado('+ i +')');
		radios[i].setAttribute('onchange', 'ponerborder('+ i +')');
	};
	try {
	//asignacion de eventos a ocupar
	document.getElementById("peque").onclick = function(){mostrar(1)};
	document.getElementById("mesapp").onclick = function(){ocultar(1)};
	document.getElementById("media").onclick = function(){mostrar(2)};
	document.getElementById("mesamm").onclick = function(){ocultar(2)};
	document.getElementById("grande").onclick = function(){mostrar(3)};
	document.getElementById("mesagg").onclick = function(){ocultar(3)};
	document.getElementById("btn-reser").onclick = function(){selector_mesa()};
	document.getElementById("Restart").onclick = function(){restaurar()};
	}catch (e){
		console.log(e);
	}
	//verificando el uso de localstore
	if(typeof(Storage) == "undefined") {
		alert("El navegador no tiene soporte para HTML5 y almacenamiento local. Se recomienda actualizarlo. Por lo tanto la pagina no funcionara correctamente");
	}
}

function ponerckequeado (cual){
	var radios= mesaslocal.elements['mesa'];//obteniendo todos los radios button de las mesas
	radios[cual].checked=true;//colocando el checked en la imagen selecionada aunque este oculto
	var imagenes = document.getElementsByClassName("obtener");//obteniendo todas las imagenes de las mesas
	//quitando el border de todas las imagenes
	for (var i = 0; i < imagenes.length; i++) {
		imagenes[i].style.border="none";
	};
	//colando el estilo de border de la imagen selecionada
	imagenes[cual].style.border="thick double #FF6C00";
}
function ponerborder(saber){
	var radios= mesaslocal.elements['mesa'];//obteniendo todos los radios button de las mesas
	radios[saber].checked=true;//colocando el checked en la imagen selecionada aunque este oculto
	var imagenes = document.getElementsByClassName("obtener");//obteniendo todas las imagenes de las mesas
	//quitando el border de todas las imagenes
	for (var i = 0; i < imagenes.length; i++) {
		imagenes[i].style.border="none";
	};
	//colando el estilo de border de la imagen selecionada
	imagenes[saber].style.border="thick double #FF6C00";

}
//para mostrar el contenido del articulo
function mostrar(x){
	if(x==1){
		document.getElementById("peque").style.display = "none";
		document.getElementById("mesap").style.display = "block";
	}else if(x==2){
		document.getElementById("media").style.display = "none";
		document.getElementById("mesam").style.display = "block";
	}else{
		document.getElementById("grande").style.display = "none";
		document.getElementById("mesag").style.display = "block";
	}
}
//para ocultar el contenido de los articulo
function  ocultar(x){
	if (x==1){
		document.getElementById("peque").style.display = "block";
		document.getElementById("mesap").style.display = "none";
	}
	else if (x==2){
		document.getElementById("media").style.display = "block";
		document.getElementById("mesam").style.display = "none";
	}
	else{
		document.getElementById("grande").style.display = "block";
		document.getElementById("mesag").style.display = "none";
	}
}

function selector_mesa(){

	//comprobamos primero si hay logeado algun cliente
	var sesion = localStorage.getItem("usuario");
	if (sesion != null){
	for (i=0; document.mesaslocal.mesa.length; i++){
		if (document.mesaslocal.mesa[i].checked){
			mesa=document.mesaslocal.mesa[i].value;
			break;
		}
	}
	//guardado de numero de mesa en el LocalStogare
	try {
		localStorage.setItem("mesaTemp", mesa);
		msg = "numero de mesa guardados en el localStorage.";
		console.log(msg);
		location.href="reservar-mesa.html";
	}
	catch (e) {
		//Verificar si el límite de almacenamiento no se ha sobrepasado
		if (e >= QUOTA_EXCEEDED_ERR) {
			console.log("Error: Límite para almacenamiento local se ha alcanzado.");
		}
		else {
			console.log("Error: Guardando en el almacenamiento local.");
		}
	}
	}else{
		alert("Para poder realizar una reserva debe estar logeado en el sistema por favor");
		var deseadirecionamiento = confirm('Desea dirigirse a la pagina de login/registración?');
		if(deseadirecionamiento==true){
			location.href="login.html";
		}
	}
}

function restaurar () {
	var imagenes = document.getElementsByClassName("obtener");//obteniendo todas las imagenes de las mesas
	//quitando el border de todas las imagenes
	for (var i = 0; i < imagenes.length; i++) {
		imagenes[i].style.border="none";
	};
	//colando el estilo de border de la imagen selecionada
	imagenes[0].style.border="thick double #FF6C00";
}
//creando el evento load de la ventana para prepara las imagenes y eventos que se crearan
if(window.addEventListener){//navegadores recientes
window.addEventListener("load", verificar, false);
} else if (window.attachEvent){//internet explorer
window.attachEvent("onload", verificar);
}
//funcion que verificara si hay una persona logeada
function verificar () {
	document.getElementById("salir").onclick= function(){deslogearse()};
	var sesion = localStorage.getItem("usuario");
	if (sesion != null){//si la llave existe
		document.getElementById("esconder").style.display="none";
		document.getElementById("login").style.display="block";
		document.getElementById("alogin").innerHTML= sesion;
	}
}

function deslogearse () {
	var sesion = localStorage.getItem("usuario");
	//si hay un cliente logeado para salir
	if (sesion != null){
	document.getElementById("esconder").style.display="block";
	document.getElementById("login").style.display="none";
	document.getElementById("alogin").innerHTML= "";
	//borrando las claves de sessionStore
	localStorage.removeItem("usuario");
	localStorage.removeItem("contra");
	//sacando la Url para ver en donde esta 
	var URLactual = window.location.href;
	var re = /(\W|^)(content)(\W|$)/;
	if (re.test(URLactual)){//si esta dentro de la carpeta de content 
		location.href="../index.html";//se direcionara hacia hacia main
	}}
}
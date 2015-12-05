var comen="";
//Cadena para crear tabla para ingresar comentarios
var tablero="<table class=\"table table-bordered\"><thead><tr><th>Comentarios</th></tr></thead><tbody>";
var tablero2="</tbody></table>"//Cadena para la terminacion de la tabla de comentarios
var imprimir="";//variable que nos servira para imprimir cada vez q se ejecute el script

//creando el evento load de la ventana para prepara los comentarios anteriores
if(window.addEventListener){//navegadores recientes
window.addEventListener("load", cargar, false);
} else if (window.attachEvent){//internet explorer
window.attachEvent("onload", cargar);
}
function cargar() {
	try {
		comen=localStorage.getItem("coment");
		if (comen != null){	restaurar();}
		document.getElementById("btn-coment").onclick = function(){hacerComentario()};
		document.getElementById("limpiar").onclick = function(){borrar()};
	}catch (e){
		console.log(e);
	}
}

function hacerComentario(){
	nom=document.getElementById("nom");
	email=document.getElementById("mail");
	tipo=document.getElementById("tipo");
	texto=document.getElementById("coment");
	try {		
		if(validar(nom.value,email.value,tipo.value,texto.value)){
			document.getElementById("comentarios").innerHTML = "";
			imprimir="";
			if (comen==null){
				comen="<tr class=";
			}else{
				comen+="<tr class=";
			}
			if(tipo.value=="Felicitacion"){
				comen+="\"success\"><td><div>"
				comen+=nom.value + "<h5><small> Tipo: Felicitacion - Email: " + email.value + "</small></h5><br>"
				comen+=texto.value + "</div></td></tr>"
			}//Fin de comentario tipo felicitacion
			else if (tipo.value=="Queja"){
				comen+="\"danger\"><td><div>"
				comen+=nom.value + "<h5><small> Tipo: Queja - Email: " + email.value + "</small></h5><br>"
				comen+=texto.value + "</div></td></tr>"
			}//Fin de comentario tipo queja
			else if (tipo.value=="Sugerencia"){
				comen+="\"info\"><td><div>"
				comen+=nom.value + "<h5><small> Tipo: Sugerencia - Email: " + email.value + "</small></h5><br>"
				comen+=texto.value + "</div></td></tr>"
			}//Fin de comentario tipo Sugerencia
			limpiar();
			imprimir+=tablero;
			imprimir+=comen;
			imprimir+=tablero2;
			localStorage.setItem("coment", comen);
			document.getElementById("comentarios").innerHTML = imprimir;
			document.getElementById("comentarios").focus();
		}
	}
	catch (e) {
		console.log(e);
	}
}

//Funcion que nos ayuda a restaurar los comentarios almacenados en el locaStorage si existen datos
function restaurar(){
	imprimir+=tablero;
	imprimir+=comen;
	imprimir+=tablero2;
	document.getElementById("comentarios").innerHTML = imprimir;
}

//funcion que limpia todos los campos del formulario despues de ingresar un nuevo comentario
function limpiar(){
	document.getElementById("nom").value="";
	document.getElementById("mail").value="";
	document.getElementById("tipo").value="";
	document.getElementById("coment").value="";
}

function validar(nom,email,tipo,texto){
	var errores =document.getElementsByClassName("error");//obteniendo todos los span
	var re=null;
	re = /^[A-Za-z]{3,}([\s][A-Za-z]{3,})+$/;
 	if(re.test(nom)){
 		errores[0].style.display="none";
 		re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
 		if(re.test(email)){
 			errores[1].style.display="none";
 			if(tipo=="Felicitacion"||tipo=="Queja"||tipo=="Sugerencia"){
 				errores[2].style.display="none";
 				if(texto!=""){
 					errores[3].style.display="none";
 					return true;
 				}
 				else{
 					errores[3].style.display="block";//mostrando el mensaje que esta en el span
					errores[3].style.color="red";
 				}
 			}
 			else{
 				errores[2].style.display="block";//mostrando el mensaje que esta en el span
				errores[2].style.color="red";
 			}
 		}else {
 			errores[1].style.display="block";//mostrando el mensaje que esta en el span
			errores[1].style.color="red";
 		}	
 	}else {
 		errores[0].style.display="block";//mostrando el mensaje que esta en el span
		errores[0].style.color="red";
 	}
}

function borrar(){
	localStorage.removeItem("coment");
	document.getElementById("comentarios").innerHTML = "";
}
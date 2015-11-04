var comen="";

//Cadena para crear tabla para ingresar comentarios
var tablero="<table class=\"table table-bordered\"><thead><tr><th>Comentarios</th></tr></thead><tbody>";
//Cadena para la terminacion de la tabla de comentarios
var tablero2="</tbody></table>"
//variable que nos servira para imprimir cada vez q se ejecute el script
var imprimir="";

//creando el evento load de la ventana para prepara los comentarios anteriores
if(window.addEventListener){//navegadores recientes
window.addEventListener("load", cargar, false);
} else if (window.attachEvent){//internet explorer
window.attachEvent("onload", cargar);
}

function cargar() {
	try {
		//Evento clic en el boton para agregar nuevo comentario

		comen=localStorage.getItem("coment");
		if (comen != null){
			restaurar();
		}
		document.getElementById("btn-coment").onclick = function(){hacerComentario()};


	}catch (e){
		console.log(e);
	}
	//verificando el uso de localstore
	if(typeof(Storage) == "undefined") {
		alert("El navegador no tiene soporte para HTML5 y almacenamiento local. Se recomienda actualizarlo. Por lo tanto la pagina no funcionara correctamente");
	}
}


function hacerComentario(){
	//Escribe comentario en pagina y 
	try {		
		
		if(validar()){
			document.getElementById("comentarios").innerHTML = "";
			imprimir="";
			nom=document.getElementById("nom").value;
			email=document.getElementById("mail").value;
			tipo=document.getElementById("tipo").value;
			texto=document.getElementById("coment").value;

			if (comen==null){
				comen="<tr class=";
			}else{
				comen+="<tr class=";
			}
		
			if(tipo=="Felicitacion"){
				comen+="\"success\"><td><div>"
				comen+=nom + "<h5><small> Tipo: Felicitacion - Email: " + email + "</small></h5><br>"
				comen+=texto + "</div></td></tr>"
			}//Fin de comentario tipo felicitacion
			else if (tipo=="Queja"){
				comen+="\"danger\"><td><div>"
				comen+=nom + "<h5><small> Tipo: Queja - Email: " + email + "</small></h5><br>"
				comen+=texto + "</div></td></tr>"
			}//Fin de comentario tipo queja
			else if (tipo=="Sugerencia"){
				comen+="\"info\"><td><div>"
				comen+=nom + "<h5><small> Tipo: Queja - Email: " + email + "</small></h5><br>"
				comen+=texto + "</div></td></tr>"
			}//Fin de comentario tipo Sugerencia
			limpiar();
			imprimir+=tablero;
			imprimir+=comen;
			imprimir+=tablero2;
			localStorage.setItem("coment", comen);
			msg = "los comentarios se guardaron en el localStorage.";
			console.log(msg);
			document.getElementById("comentarios").innerHTML = imprimir;
			document.getElementById("comentarios").focus();
		}
		
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

function validar(){
	nom=document.getElementById("nom").value;
	email=document.getElementById("mail").value;
	tipo=document.getElementById("tipo").value;
	texto=document.getElementById("coment").value;

	var re=null;
	re = /^[A-Za-z]{3,}([\s][A-Za-z]{3,})+$/;
 	if(re.test(nom)){
 		re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
 		if(re.test(email)){
 			if(tipo=="Felicitacion"||tipo=="Queja"||tipo=="Sugerencia"){
 				if(texto!=""){
 					return true;
 				}
 				else{
 					alert("Error encomentario debe Ingresar su opinion.");
 					document.getElementById("texto").focus();
 					document.getElementById("texto").clear();
 				}
 			}
 			else{
 				alert("Error en tipo de comentario debe seleccionar una opcion.");
 				document.getElementById("tipo").focus();
 			}
 		}else {
 			alert("Email ingresado invalido");
 			document.getElementById("email").focus();
 		}	
 	}else {
 		alert("Nombre ingresado invalido");	
 		document.getElementById("nom").focus();
 	}
 	
}
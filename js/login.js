//variables globales
//total de registros en el vector
var totalRegistrados=0;
//json que se ocupara para guardar datos
var Registro ={
	"Nombre": "",
	"Dui": "",
	"Telefono" :"",
	"Email" :"",
	"Usuario" :"",
	"Contrasena": "",
}
//vector donde se guardaran todos los usuarios registrados
var Registros= new Array();
//vector donde se instanciaran todos lo nuevos usuarios
var usuarios= new Array();

//creando el evento load de la ventana para prepara las imagenes y eventos que se crearan
if(window.addEventListener){//navegadores recientes
window.addEventListener("load", iniciar, false);
} else if (window.attachEvent){//internet explorer
window.attachEvent("onload", iniciar);
}


function iniciar () {
	if(typeof(Storage) == "undefined") {
 	alert("El navegador no tiene soporte para HTML5 y almacenamiento local. Se recomienda actualizarlo.");
 	}
 	else {
 	console.log("El navegador soporta tanto localStorage como sessionStorage.");
 	Restaurar();
 	}


	//asignando placeholder en los campos
	document.getElementById("NomComplet").placeholder="nombres apellidos";
	document.getElementById("Dui").placeholder="formato 12345678-9";
	document.getElementById("NumeroTelefono").placeholder="formato 0000-0000";
	document.getElementById("Correo").placeholder="ejemplo: example@gmail.com";
	document.getElementById("Registrarse").onclick= function(){validar()};
	document.getElementById("Logearse").onclick= function(){logearse()};
}



function Restaurar(){
	totalRegistrados= localStorage.getItem("TotalRegistrados");
	if (totalRegistrados==null){
		totalRegistrados=0;
	}
	Registros= localStorage.getItem("UserAll");
	if (Registros == null){
		Registros = new Array();
	}else{
		Registros= JSON.parse(Registros);
		console.log(totalRegistrados);
		console.log(Registros);
	}
}



function validar(){
	var NC=document.getElementById("NomComplet").value;
	var D =document.getElementById("Dui").value;
	var NT=document.getElementById("NumeroTelefono").value;
	var C=document.getElementById("Correo").value;
	var usuari = document.getElementById("user").value;
	var contra = document.getElementById("contra").value;
	var errores =document.getElementsByClassName("error");
	var re = null;
	//validando el nombre
	re= /^[A-Za-z]{3,}([\s][A-Za-z]{3,})+$/;
	if (re.test(NC)){
		errores[0].style.display="none";//ocultando el span correspondiente
		re= /^\d{8}-\d{1}$/;
		if (re.test(D)){
			errores[1].style.display="none";//ocultando el span correspondiente
			re=/^\d{4}-\d{4}$/;
			if (re.test(NT)){
					errores[2].style.display="none";//ocultando el span correspondiente
					re=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
					if (re.test(C)){
							errores[3].style.display="none";//ocultando el span correspondiente
							re= /^[A-Za-z0-9]{4,15}$/;
							if (re.test(usuari)){
								errores[4].style.display="none";//ocultando el span correspondiente
								//invocamos a la funcion donde instanciaremos un objecto de la clase de cliente
								registracion(NC,D,NT,C,usuari,contra);
							}else{
								errores[4].style.display="block";//mostrando el mensaje que esta en el span
								errores[4].style.color="red";
								alert("Solo se acepta minusculas-mayusculas y digitos con un minimo de 4 y maximo de 15 caracteres");
							}
					}else{
						errores[3].style.display="block";//mostrando el mensaje que esta en el span
						errores[3].style.color="red";
					}//fin de la validacion de correo
			}else{
				errores[2].style.display="block";//mostrando el mensaje que esta en el span
				errores[2].style.color="red";
			}//fin de la validacion del numero de telefono
		}else{
			errores[1].style.display="block";//mostrando el mensaje que esta en el span
			errores[1].style.color="red";
		}//fin de validacion de DUI
	}else{
		errores[0].style.display="block";//mostrando el mensaje que esta en el span
		errores[0].style.color="red";
	}//fin de validacion de nombre
}//fin de funcion


//clase que contendra los datos de usuario registrado
function Usuarios (nom,dui,phone,email,user,contra){
	//propiedades de la clase
	this.NombreCompleto =nom;
	this.DUI=dui;
	this.Telefono=phone;
	this.Correo = email;
	this.usuario= user;
	this.contrasena = contra;
	//metodos de la clase
	//registraremos una reservacion
	this.registrar = function (){
		//asignando cada uno del campos al json
		Registro.Nombre= this.NombreCompleto;
		Registro.Dui= this.DUI;
		Registro.Telefono= this.Telefono;
		Registro.Email= this.Correo;
		Registro.Usuario = this.usuario;
		Registro.Contrasena = this.contrasena;
		//guardando el Json en el vector
		Registros[totalRegistrados]= Registro;
		//aumentando al contador de usuarios registrados
		totalRegistrados++;
		//llamaremos a la funcion limpiarjson
		this.limpiarJson();
	}//fin de funcion de registrar
	
	//funcion para limpiar el Json y evitar convenientes luego
	this.limpiarJson= function (){
			Registro ={
			"Nombre": "",
			"Dui": "",
			"Telefono" :"",
			"Email" :"",
			"Usuario" :"",
			"Contrasena": "",
			}
	};//fin de funcion limpiar json

	//funcion que comprobara que no haya dos usuarios igual
	this.comprobar= function (){
		//comprobaremos la disponibilidad de la mesa a reservar
		var a = document.getElementById("user").value; 
		var ya = false;
		for (var i = 0; i < totalRegistrados; i++) {
			if ( a == Registros[i].Usuario){
				ya=true;
			}	
		};
		if (ya){
			return false;
		}else{
			return true;
		}
	}//fin de la funcion comprobar

}//fin de la clase


 function limpiar (){
		document.getElementById("NomComplet").value="";
		document.getElementById("Dui").value="";
		document.getElementById("NumeroTelefono").value="";
		document.getElementById("Correo").value="";
		document.getElementById("user").value="";
		document.getElementById("contra").value="";
}

 function LogearAutomaticamente(){
 			var a = document.getElementById("user").value;
 			var b = document.getElementById("contra").value;
			//guardando los datos en SessionStore
			localStorage.setItem("usuario",a);
			localStorage.setItem("contra",b);
			//ocultando el li de login y mostrando el correspondiente
			document.getElementById("esconder").style.display="none";
			document.getElementById("login").style.display="block";
			document.getElementById("alogin").innerHTML= a;
			location.href="../index.html";
}//fin de la funcion



function guardar() {
		 try {
		 	Registros=JSON.stringify(Registros);//pasando a cadena todo los json contenidos en el vector
 			localStorage.setItem("UserAll", Registros);//guardando la reserva hecha
 			localStorage.setItem("TotalRegistrados",totalRegistrados);//guardando el totalde reservas
 			Registros= JSON.parse(Registros);//pasando a Json de nuevo para seguir trabajando con el 
		 }
		 catch (e) {
		 //Verificar si el límite de almacenamiento no se ha sobrepasado
		 if (e >= QUOTA_EXCEEDED_ERR) {console.log("Error: Límite para almacenamiento local se ha alcanzado.");}
		 else {console.log("Error: Guardando en el almacenamiento local.");}
 	}
	}//fin de funcion guardar

function logearse () {
	var user = document.getElementById("usuario").value;
	var contr = document.getElementById("contralogin").value;
	var contador=0;
	//buscando datos recibidos con el vector guardado
	for (var i = 0; i < totalRegistrados; i++) {
		if ( user== Registros[i].Usuario && contr == Registros[i].Contrasena){
			contador++;
		}
	};
	if (contador==1){
			//guardando los datos en SessionStore
			localStorage.setItem("usuario",user);
			localStorage.setItem("contra",contr);
			//ocultando el li de login y mostrando el correspondiente
			document.getElementById("esconder").style.display="none";
			document.getElementById("login").style.display="block";
			document.getElementById("alogin").innerHTML= user;
			document.getElementById("usuario").value="";
			document.getElementById("contralogin").value="";
			location.href="../index.html";
	}else{
		alert("Los datos ingresados no coinciden");
	}
}

function registracion (a,b,c,d,e,f) {
	//instanciando un objecto de la clase Usuarios
	usuarios[totalRegistrados]= new Usuarios(a,b,c,d,e,f);//los parametros son los datos personales del formulario
	if (totalRegistrados>0){
		if (usuarios[totalRegistrados].comprobar()){
				usuarios[totalRegistrados].registrar();
				LogearAutomaticamente();
				limpiar();
				guardar();
				alert("Su registracion ha sido exitosa");
		}else {
			alert("El usuario selecionda ya esta registrado por favor selecionar otro");
		}
	}else{
		usuarios[totalRegistrados].registrar();
		LogearAutomaticamente();
		limpiar();		
		guardar();
		alert("Su registracion ha sido exitosa");
	}
}//fin de la funcion registrar

//expresiones regulares ocupadas
/*
nombre completo: /^[A-Za-z]{3,}([\s][A-Za-z]{3,})+$/;
DUI = /^\d{8}-\d{1}$/;
Telefono:/^\d{4}-\d{4}$/;
Correo:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
usuario: /^[A-Za-z]{4,}+$/;
*/
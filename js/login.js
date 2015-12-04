//variables globales
var totalRegistrados=0;//total de registros en el vector
var Registro ={//json(object) que se ocupara para guardar datos
	"Nombre": "",
	"Dui": "",
	"Telefono" :"",
	"Email" :"",
	"Usuario" :"",
	"Contrasena": "",
}
var Registros= new Array();//vector donde se guardaran todos los usuarios registrados
var usuarios= new Array();//vector donde se instanciaran todos lo nuevos usuarios

//creando el evento load de la ventana para prepara las imagenes y eventos que se crearan
if(window.addEventListener){//navegadores recientes
window.addEventListener("load", iniciar, false);
} else if (window.attachEvent){//internet explorer
window.attachEvent("onload", iniciar);
}

function iniciar () {
 	Restaurar();//restaurando los datos en cada una de las variables globales
	//asignando placeholder en los campos
	document.getElementById("NomComplet").placeholder="nombres apellidos";
	document.getElementById("Dui").placeholder="formato 12345678-9";
	document.getElementById("NumeroTelefono").placeholder="formato 0000-0000";
	document.getElementById("Correo").placeholder="ejemplo: example@gmail.com";
	document.getElementById("Registrarse").onclick= function(){validar()};
	document.getElementById("Logearse").onclick= function(){logearse()};
}
//funcion donde obtenemos los valores del localstorage
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
	}
}
//funcion para validar datos del formulario
function validar(){
	//obteniendo todos los input del formulario
	var NC=document.getElementById("NomComplet");
	var D =document.getElementById("Dui");
	var NT=document.getElementById("NumeroTelefono");
	var C=document.getElementById("Correo");
	var usuari = document.getElementById("user");
	var contra = document.getElementById("contra");
	var contra2 = document.getElementById("contra2");
	var errores =document.getElementsByClassName("error");//obteniendo todos los span
	var re = null;//expresion regular
	re= /^[A-Za-z]{3,}([\s][A-Za-z]{3,})+$/;//validando el nombre
	if (re.test(NC.value)){
		errores[0].style.display="none";
		re= /^\d{8}-\d{1}$/;//validando el dui
		if (re.test(D.value)){
			errores[1].style.display="none";
			re=/^\d{4}-\d{4}$/;//validando el telefono
			if (re.test(NT.value)){
					errores[2].style.display="none";
					re=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;//validando el correo
					if (re.test(C.value)){
							errores[3].style.display="none";
							re= /^[A-Za-z0-9]{4,15}$/;//validando el usuario
							if (re.test(usuari.value)){
								errores[4].style.display="none";
								if (contra.value !== ""){//verificando si esta vacio el campo de contra
									errores[5].style.display="none";
									if(contra2.value !== ""){
										errores[6].style.display="none";
										if (contra.value == contra2.value){
											errores[7].style.display="none";
											//invocamos a la funcion donde instanciaremos un objecto de la clase de cliente
											registracion(NC.value,D.value,NT.value,C.value,usuari.value,contra.value);
										}else{
											errores[7].style.display="block";//mostrando el mensaje que esta en el span
											errores[7].style.color="red";
											contra2.focus();
										}
									}else{
										errores[6].style.display="block";//mostrando el mensaje que esta en el span
										errores[6].style.color="red";
										contra2.focus();
									}
								}else{
									errores[5].style.display="block";//mostrando el mensaje que esta en el span
									errores[5].style.color="red";
									contra.focus();
								}	
							}else{
								errores[4].style.display="block";//mostrando el mensaje que esta en el span
								errores[4].style.color="red";
								usuari.focus();
							}
					}else{
						errores[3].style.display="block";//mostrando el mensaje que esta en el span
						errores[3].style.color="red";
						C.focus();
					}//fin de la validacion de correo
			}else{
				errores[2].style.display="block";//mostrando el mensaje que esta en el span
				errores[2].style.color="red";
				NT.focus();
			}//fin de la validacion del numero de telefono
		}else{
			errores[1].style.display="block";//mostrando el mensaje que esta en el span
			errores[1].style.color="red";
			D.focus();
		}//fin de validacion de DUI
	}else{
		errores[0].style.display="block";//mostrando el mensaje que esta en el span
		errores[0].style.color="red";
		NC.focus();
	}//fin de validacion de nombre
}//fin de funcion


//clase que contendra los datos de usuario registrado
//constructor del objecto
function Usuarios(nom,dui,phone,email,user,contra){
	//propiedades publicas de la clase
	this.NombreCompleto =nom;
	this.DUI=dui;
	this.Telefono=phone;
	this.Correo = email;
	this.usuario= user;
	this.contrasena = contra;
}//fin de la clase

//metodos publicos de la clase
//metodo para registrar un usuario nuevo
Usuarios.prototype.registrar = function (){
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
}//fin del metodo de registrar


//metodo para limpiar el Json y evitar convenientes luego
Usuarios.prototype.limpiarJson= function (){
			Registro ={
			"Nombre": "",
			"Dui": "",
			"Telefono" :"",
			"Email" :"",
			"Usuario" :"",
			"Contrasena": "",
			}
};//fin de funcion limpiar json

//metodo que comprobara que no haya dos usuarios igual
Usuarios.prototype.comprobar= function (){
		var a = document.getElementById("user").value;//usuario que se esta ingresando 
		var ya = false;//valor booleano
		for (var i = 0; i < totalRegistrados; i++) {
			if ( a == Registros[i].Usuario){
				ya=true;//si ya existe cambia su valor
			}	
		};
		if (ya){//retornara si ya esta registrado o no
			return false;
		}else{
			return true;
		}
}//fin de la funcion comprobar

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
			//guardando los datos en localstorage
			localStorage.setItem("usuario",a);
			localStorage.setItem("contra",b);
			//ocultando el li de login y mostrando el correspondiente
			document.getElementById("esconder").style.display="none";
			document.getElementById("login").style.display="block";
			document.getElementById("alogin").innerHTML= a;
			//generando efecto de loguearse
			swal({title: "Su registración ha sido exitosa",timer: 2000,showConfirmButton: false});
			setTimeout("location.href='../index.html';",2200);//generando pausa para el redirecionamiento
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
	//verificamos si es el usuario admin
	if (user=="admin"){
		var registro= localStorage.contraadmin
		//si la contra esta bien 
		if (contr==registro){
			document.getElementById("esconder").style.display="none";
			document.getElementById("login").style.display="block";
			document.getElementById("alogin").innerHTML= user;
			document.getElementById("usuario").value="";
			document.getElementById("contralogin").value="";
			swal({   title: "Hola administrador!!!!!!",   text: "Se ha iniciado seccion como administrador",   timer: 2000,   showConfirmButton: false });
			setTimeout("location.href='../index.html';",2200);//generando pausa para el redirecionamiento
			localStorage.setItem("usuario",user);
			localStorage.setItem("contra",contr);
		}else{
			sweetAlert("Error al loguearse como administrador...", "La contraseña del administrador no coincide", "error");}
	}else{//sino es el usuario
	for (var i = 0; i < totalRegistrados; i++) {//buscando datos recibidos con el vector guardado
		if ( user== Registros[i].Usuario && contr == Registros[i].Contrasena){
			contador++;//si encuentra coincidencia el contador sumara
		}};
	if (contador==1){//si encontro
			//guardando los datos en localStorage
			localStorage.setItem("usuario",user);
			localStorage.setItem("contra",contr);
			//ocultando el li de login y mostrando el correspondiente
			document.getElementById("esconder").style.display="none";
			document.getElementById("login").style.display="block";
			document.getElementById("alogin").innerHTML= user;
			document.getElementById("usuario").value="";
			document.getElementById("contralogin").value="";
			//generando efecto de loguearse
			swal({   title: "Longueandose...!",   text: "Se ha iniciado seccion con : " + user+".",   timer: 2000,   showConfirmButton: false });
			setTimeout("location.href='../index.html';",2200);//generando pausa para el redirecionamiento
	}else{sweetAlert("Error al intentar loguearse...", "Contraseña erronea del usuario", "error");}}
}//fin de la funcion

function registracion (a,b,c,d,e,f) {
	//instanciando un objecto de la clase Usuarios
	usuarios[totalRegistrados]= new Usuarios(a,b,c,d,e,f);//los parametros son los datos personales del formulario
	if (totalRegistrados>0){
		if (usuarios[totalRegistrados].comprobar()){
			console.log(usuarios[totalRegistrados]);
				usuarios[totalRegistrados].registrar();
				limpiar();
				guardar();
				LogearAutomaticamente();
		}else {
			alert("El usuario seleciond@ ya esta registrado por favor selecionar otro");
		}
	}else{
		usuarios[totalRegistrados].registrar();
		limpiar();		
		guardar();
		LogearAutomaticamente();}
}//fin de la funcion registrar
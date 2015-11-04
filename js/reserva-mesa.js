//variables globales
//total de reservas que se han realizado
var totalreserva=0;
//mesa que se seleciono
var mesa;
//json que se ocupara para guardar datos
var Reserva ={
	"Nombre": "",
	"Dui": "",
	"Telefono" :"",
	"Email" :"",
	"TipoMesa" :"",
	"NumeroMesa": "",
	"Cantidad" :"",
	"fecha" :"",
	"Horario" :"",
}
//vector donde se guardaran los json
var Reservas= new Array();
//vector donde se instanciaran los objectos de la clase cliente
var reservacion = new Array();

//creando el evento load de la ventana para prepara las imagenes y eventos que se crearan
if(window.addEventListener){//navegadores recientes
window.addEventListener("load", autoAjuste, false);
} else if (window.attachEvent){//internet explorer
window.attachEvent("onload", autoAjuste);
}

function autoAjuste(){
	if(typeof(Storage) == "undefined") {
 	alert("El navegador no tiene soporte para HTML5 y almacenamiento local. Se recomienda actualizarlo.");
 	}
 	else {
 	console.log("El navegador soporta tanto localStorage como sessionStorage.");
 	Restaurar();
 	}
	mesa = localStorage.getItem("mesaTemp");
	//asignacion a texbox de tipo de mesa elegida
	if(mesa==1 || mesa==2 || mesa==3 || mesa==4 || mesa==5){
		document.getElementById("TipoMesa").value="Mesa Pequeña (4 personas)"
	}
	else if (mesa==6 || mesa==7 || mesa==8 || mesa==9 || mesa==10){
		document.getElementById("TipoMesa").value="Mesa Mediana (6 personas)"
	}
	else if (mesa==11 || mesa==12 || mesa==13 || mesa==14 || mesa==15){
		document.getElementById("TipoMesa").value="Mesa Grande (10 personas)"	
	}
	else{
		document.getElementById("TipoMesa").value="Undefined"	
	}
	
	//Asignacion automatica del numero de mesa escogida
	if(mesa==1 || mesa==2 || mesa==3 || mesa==4 || mesa==5){
		document.getElementById("NumeroMesa").value= mesa;
	}
	else if (mesa==6 || mesa==7 || mesa==8 || mesa==9 || mesa==10){
		document.getElementById("NumeroMesa").value= mesa;
	}
	else if (mesa==11 || mesa==12 || mesa==13 || mesa==14 || mesa==15){
		document.getElementById("NumeroMesa").value= mesa;
	}
	else{
		document.getElementById("NumeroMesa").value="Undefined"	
	}

	//Asignacion automatica del numero de personas en la mesa
	if(mesa==1 || mesa==2 || mesa==3 || mesa==4 || mesa==5){
		document.getElementById("Cantidad-Visitantes").max="4";
	}
	else if (mesa==6 || mesa==7 || mesa==8 || mesa==9 || mesa==10){
		document.getElementById("Cantidad-Visitantes").max="6";
	}
	else if (mesa==11 || mesa==12 || mesa==13 || mesa==14 || mesa==15){
		document.getElementById("Cantidad-Visitantes").max="10";	
	}
	else{
		document.getElementById("Cantidad-Visitantes").max=0;
	}
	document.getElementById("Cantidad-Visitantes").value=1;
	//Obtener fecha, asignarla y posponer una semana despues la reserva
	var factual = new Date();
	var dia = factual.getDate();
	dia = parseInt(dia) + 7;
	factual.setDate(dia);
	var freserva = factual.getFullYear() + "-" + (factual.getMonth()+1) + "-";
	//Concatenacion del numero 0 para los valores menores a 10 evita errores!! 
	if (factual.getDate()<10){
		freserva = freserva + "0" + factual.getDate();
	}
	else{
		freserva = freserva + factual.getDate();	
	}
	//asignacion de fecha actual, maxima y minima
	document.getElementById("Fecha").value=freserva;
	document.getElementById("Fecha").min=freserva;
	var annio = factual.getFullYear();
	
}
function Restaurar(){
	totalreserva= localStorage.getItem("Total");
	if (totalreserva==null){
		totalreserva=0;
	}
	Reservas= localStorage.getItem("Reserva");
	if (Reservas == null){
		Reservas = new Array();
	}else{
		Reservas= JSON.parse(Reservas);
		console.log(totalreserva);
		console.log(Reservas);
	}
}

//clase que contendra los datos de cliente de reserva
function cliente (nom,dui,phone,email){
	//propiedades de la clase
	this.NombreCompleto =nom;
	this.DUI=dui;
	this.Telefono=phone;
	this.Correo = email;
	//metodos de la clase
	//registraremos una reservacion
	this.registrar = function (){
		//asignando cada uno del campos al json
		Reserva.Nombre= this.NombreCompleto;
		Reserva.Dui= this.DUI;
		Reserva.Telefono= this.Telefono;
		Reserva.Email= this.Correo;
		Reserva.TipoMesa = document.getElementById("TipoMesa").value;
		Reserva.NumeroMesa = document.getElementById("NumeroMesa").value;
		Reserva.Cantidad = document.getElementById("Cantidad-Visitantes").value;
		Reserva.fecha = document.getElementById("Fecha").value;
		Reserva.Horario = document.getElementById("horario").value;
		//se guardara un temporal para mostrarlo posteriormente
		Reserva=JSON.stringify(Reserva);//pasando a cadena todo los json contenidos en el vector
 		localStorage.setItem("TempMostrar", Reserva);//guardando la reserva hecha
 		Reserva= JSON.parse(Reserva);//pasando a Json de nuevo para seguir trabajando con el

		Reservas[totalreserva]= Reserva;
		//Reservas[totalreserva]= JSON.stringify(Reserva);
		totalreserva++;
		//llamaremos a la funcion limpiarjson
		this.limpiarJson();
	}//fin de funcion de registrar
	

	this.limpiarJson= function (){
	Reserva ={
		"Nombre": "",
		"Dui": "",
		"Telefono" :"",
		"Email" :"",
		"TipoMesa" :"",
		"NumeroMesa": "",
		"Cantidad" :"",
		"fecha" :"",
		"Horario" :"",
		}
	}//fin de funcion limpiar json




	this.comprobar= function (){
		//comprobaremos la disponibilidad de la mesa a reservar
		var a = document.getElementById("NumeroMesa").value;
		var b = document.getElementById("Fecha").value;
		var c = document.getElementById("horario").value;
		var ya = false;
		for (var i = 0; i < totalreserva; i++) {
			if ( a == Reservas[i].NumeroMesa && b == Reservas[i].fecha && c== Reservas[i].Horario){
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




function crear_Reserva (a,b,c,d){
	//instanciando un objecto de la clase consulta
	reservacion[totalreserva] = new cliente(a,b,c,d);//los parametros son los datos personales del formulario
	if (totalreserva>0){
		if (reservacion[totalreserva].comprobar()){
				reservacion[totalreserva].registrar();
				guardar();
				console.log("Se ha completado una reserva");
				alert("Se ha completado una reserva");
				location.href="reserva-hecha.html";
		}else {
			alert("La disponibilidad de esa mesa ya esta Reserva en el horario y la fecha solicitad");
		}
	}else{
		reservacion[totalreserva].registrar();
		console.log("Se ha completado una reserva");
		guardar();
	}
	
}


function guardar() {
		 try {
		 	Reservas=JSON.stringify(Reservas);//pasando a cadena todo los json contenidos en el vector
 			localStorage.setItem("Reserva", Reservas);//guardando la reserva hecha
 			localStorage.setItem("Total",totalreserva);//guardando el totalde reservas
 			Reservas= JSON.parse(Reservas);//pasando a Json de nuevo para seguir trabajando con el 
		 }
		 catch (e) {
		 //Verificar si el límite de almacenamiento no se ha sobrepasado
		 if (e >= QUOTA_EXCEEDED_ERR) {console.log("Error: Límite para almacenamiento local se ha alcanzado.");}
		 else {console.log("Error: Guardando en el almacenamiento local.");}
 	}
	}//fin de funcion guardar



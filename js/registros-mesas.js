var Reservas;
var total;
//carga de la pagina
$(document).ready(function(){
	mostrarTodo();
});
function mostrarTodo () {
	//obtiendo los datos de localStorage
	total= localStorage.Total;
	Reservas= localStorage.Reserva;
	Reservas= JSON.parse(Reservas);
	//cadena donde contendra la tabla
	var creartabla= "<table id= \"DatosTotales\"  class=\"table table-bordered table-condensed \"><thead><tr><th colspan=\"9\">Datos de todas las Reservaciones Realizada</th></tr></thead><tbody>";
		creartabla+= "<tr><td>#</td><td>Nombre</td><td>Dui del cliente</td><td>Telefono</td><td>Email</td><td>Numero de Mesa</td><td>Cantidad de comensales</td><td>Fecha de Reservacion:</td><td>Horario:</td></tr>";
		for (var i = 0; i < total; i++) {
			var hor="";
			Reservas[i].Horario= parseInt(Reservas[i].Horario);
					switch(Reservas[i].Horario) {
				    case 1:
				        hor="11:00 am - 12:30 pm.";
				        break;
				    case 2:
				        hor="12:30 pm - 2:00 pm.";
				        break;
				    case 3:
				        hor="6:00 pm - 7:30 pm.";
				        break;
				    case 4:
				        hor="7:30 pm - 9:00 pm.";
				        break;            
				    case 5:
				        hor="9:00 pm - 10:30 pm.";
				        break;
				    default:
				         hor="11:00 am - 12:30 pm.";
				         break;
					}
					creartabla+= "<tr><td>"+ (i+1) + "</td><td>"+Reservas[i].Nombre+"</td><td>"+Reservas[i].Dui+"</td><td>"+Reservas[i].Telefono+"</td><td>"+Reservas[i].Email+"</td><td>"+Reservas[i].NumeroMesa +"</td><td>"+Reservas[i].Cantidad+"</td><td>"+ Reservas[i].fecha+"</td><td>"+ hor+"</td></tr>";
		};
		creartabla+= "</tbody></table>";
		$("#todo").html(creartabla);
}
$("#resta").click(function(){
	mostrarTodo();
	$("#resta").css("display","none");
	$("#btn").css("display","block");
});

$("#btn").click(function(){
	var cadena= "<table id= \"DatosTotales\"  class=\"table table-bordered table-condensed \"><thead><tr><th colspan=\"9\">Datos de todas las Reservaciones Realizada</th></tr></thead><tbody>";
	cadena+= "<tr><td>#</td><td>Nombre</td><td>Dui del cliente</td><td>Telefono</td><td>Email</td><td>Numero de Mesa</td><td>Cantidad de comensales</td><td>Fecha de Reservacion:</td><td>Horario:</td></tr>";
	var dui = $("#DuiBuscar").val();
	var esta = false;
	var re= /^\d{8}-\d{1}$/;
	var errores =document.getElementsByClassName("error");
	if (re.test(dui)){
		errores[0].style.display="none";//ocultando el span correspondiente
		for (var i = 0; i < total; i++) {
		if ( dui == Reservas[i].Dui){ //buscador de reserva por numero de DUI
			var hor="";
			Reservas[i].Horario= parseInt(Reservas[i].Horario);
					switch(Reservas[i].Horario) {
					    case 1:
					        hor="11:00 am - 12:30 pm.";
					        break;
					    case 2:
					        hor="12:30 pm - 2:00 pm.";
					        break;
					    case 3:
					        hor="6:00 pm - 7:30 pm.";
					        break;
					    case 4:
					        hor="7:30 pm - 9:00 pm.";
					        break;            
					    case 5:
					        hor="9:00 pm - 10:30 pm.";
					        break;
					    default:
					         hor="11:00 am - 12:30 pm.";
					         break;
					}
					cadena+= "<tr><td>"+ (i+1) + "</td><td>"+Reservas[i].Nombre+"</td><td>"+Reservas[i].Dui+"</td><td>"+Reservas[i].Telefono+"</td><td>"+Reservas[i].Email+"</td><td>"+Reservas[i].NumeroMesa +"</td><td>"+Reservas[i].Cantidad+"</td><td>"+ Reservas[i].fecha+"</td><td>"+ hor+"</td></tr>";
		esta=true;
		};
	}
	if (esta){
		cadena+= "</tbody></table>";
		$("#todo").html(cadena);
		$("#DuiBuscar").val("");
		$("#resta").css("display","block");
		$("#btn").css("display","none");
	}else{
	alert("Reserva con numero de dui no encontrado");
	}
	}else{
		errores[0].style.display="block";//mostrando el mensaje que esta en el span
		errores[0].style.color="red";
	}
});

$("#borrar").click(function(){
	//borrando todos los datos
	localStorage.clear();
});
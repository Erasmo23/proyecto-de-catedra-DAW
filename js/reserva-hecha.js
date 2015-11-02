var total;
var reserva;

//creando el evento load de la ventana para prepara las imagenes y eventos que se crearan
if(window.addEventListener){//navegadores recientes
window.addEventListener("load", iniciar, false);
} else if (window.attachEvent){//internet explorer
window.attachEvent("onload", iniciar);
}

function iniciar () {
	//obteniendo los datos de localstore
	Reserva= localStorage.getItem("TempMostrar");
	Reserva= JSON.parse(Reserva);
	total= localStorage.getItem("Total");
	var hor="";
	switch(Reserva.Horario) {
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
	var cadena= "<table id= \"Datos\"> <thead> <tr><th colspan=\"2\">Datos de la Reserva Realizada</th></tr></thead><tbody>";
		cadena+= "<tr><td>Nombre completo:</td><td>" + Reserva.Nombre +"</td></tr>";
		cadena+= "<tr><td>DUI:</td><td>" + Reserva.Dui +"</td></tr>";
		cadena+= "<tr><td>Numero de Telefono:</td><td>" + Reserva.Telefono +"</td></tr>";
		cadena+= "<tr><td>Correo:</td><td>" + Reserva.Email+"</td></tr>";
		cadena+= "<tr><td>Tipo de mesa:</td><td>" + Reserva.TipoMesa +"</td></tr>";
		cadena+= "<tr><td>Numero de Mesa:</td><td>" + Reserva.NumeroMesa +"</td></tr>";
		cadena+= "<tr><td>Cantidad de comensales:</td><td>" + Reserva.Cantidad +"</td></tr>";
		cadena+= "<tr><td>Fecha de Reserva:</td><td>" + Reserva.fecha +"</td></tr>";
		cadena+= "<tr><td>Horario de reservacion:</td><td>"+ hor +"</td></tr></tbody></table>";
		document.getElementById("tablaGenerar").innerHTML=cadena;
		document.getElementById("total").innerHTML= "Total de Reservas registradas al momento: "+ total + "."
}



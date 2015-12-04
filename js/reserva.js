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
}

function ponerckequeado (cual){
	var radios= mesaslocal.elements['mesa'];//obteniendo todos los radios button de las mesas
	radios[cual].checked=true;//colocando el checked en la imagen selecionada aunque este oculto
	var imagenes = document.getElementsByClassName("obtener");//obteniendo todas las imagenes de las mesas
	for (var i = 0; i < imagenes.length; i++) {
		imagenes[i].style.border="none";//quitando el border de todas las imagenes
	};
	imagenes[cual].style.border="thick double #FF6C00";//colando el estilo de border de la imagen selecionada
}
function ponerborder(saber){
	var radios= mesaslocal.elements['mesa'];//obteniendo todos los radios button de las mesas
	radios[saber].checked=true;//colocando el checked en la imagen selecionada aunque este oculto
	var imagenes = document.getElementsByClassName("obtener");//obteniendo todas las imagenes de las mesas
	for (var i = 0; i < imagenes.length; i++) {//quitando el border de todas las imagenes
		imagenes[i].style.border="none";
	};
	imagenes[saber].style.border="thick double #FF6C00";//colando el estilo de border de la imagen selecionada
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
	var sesion = localStorage.getItem("usuario");//comprobamos primero si hay logeado algun cliente
	if (sesion != null){
	for (i=0; document.mesaslocal.mesa.length; i++){
		if (document.mesaslocal.mesa[i].checked){
			mesa=document.mesaslocal.mesa[i].value;
			break;
		}
	}
	try {//guardado de numero de mesa en el LocalStogare
		localStorage.setItem("mesaTemp", mesa);
		location.href="reservar-mesa.html";
	}
	catch (e) {
		//Verificar si el límite de almacenamiento no se ha sobrepasado
		if (e >= QUOTA_EXCEEDED_ERR) {
			console.log("Error: Límite para almacenamiento local se ha alcanzado.");
		}else {
			console.log("Error: Guardando en el almacenamiento local.");
		}
	}
	}else{
		swal({type: "warning",title: "Se requiere que se este registrado en el sistema",   text: "Para poder realizar una reserva debe estar logeado en el sistema por favor",   timer: 2000,   showConfirmButton: false });
		setTimeout("deseadirecionamiento()",2200);
	}
}
function deseadirecionamiento (){
	swal({
  title: "Desea direccionamiento??",
  text: "Desea dirigirse a la página de login/registración",
  type: "info",
  showCancelButton: true,
  confirmButtonClass: "btn-danger",
  confirmButtonText: "Si, por favor!",
  cancelButtonText: "No, gracias!",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm) {
  if (isConfirm) {
    location.href="login.html";
  } else {
    swal("Cancelado", "Para dirigirse a la parte de registración/login se encuentra en la parte superior derecha del menu", "error");
  }
});
}

function restaurar () {
	var imagenes = document.getElementsByClassName("obtener");//obteniendo todas las imagenes de las mesas
	for (var i = 0; i < imagenes.length; i++) {
		imagenes[i].style.border="none";//quitando el border de todas las imagenes
	};
	imagenes[0].style.border="thick double #FF6C00";//colando el estilo de border de la imagen selecionada
}
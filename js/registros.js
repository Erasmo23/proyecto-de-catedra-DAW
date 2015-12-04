$(document).ready(function(){
	var sesion = localStorage.usuario;
	//si es el superusuario mostramos el botton para ir a la nueva pagina
	if (sesion=="admin"){
		$("#registros").css("display","inline-block");
		$("#Restart").css("display","none");
		$("#btn-reser").css("display","none");
	}else{
		$("#registros").css("display","none");
		$("#Restart").css("display","inline-block");
		$("#btn-reser").css("display","inline-block");
	}
	//redireccionando a la pagina donde se veran todos los datos
	$("#registros").click(function(){
			location.href="registros-mesas.html";//se direcionara hacia hacia main
	});
});
let modules = [
	{id:1,clickFunction : loadStaff},
	{id:2,clickFunction : loadGeneralClient},
	{id:3,clickFunction : loadGeneralClient},
	{id:4,clickFunction : loadInterview},
	{id:5,clickFunction : loadResume},
];
let userNow = {};
$(function(){
	 findUser(sessionStorage.getItem("userId"));	
});
function findUser(userId){
	var dataParam = {
			id : userId
	};
	callAjaxPost("user/id",dataParam,function(data){
		$("#containerUsuario")
		.on("click",function(){ toggleOpcionesUsuario() } )
		.html("<i class='fa  fa-user-circle'></i><a>"+  ""+data.user.name+"</a> ");
		userNow = data.user;
		$("#containerLeft").html(
				data.options.reduce( (total,current) => total+"<div class='liModulo' id='liModulo"+current.id+"' onclick='verSeccion("+current.id+")'><i class='fa "+current.icon+"'></i>"+current.name+"</div>","")
			);

		verSeccion(data.options[0].id);
		addOpcionesUsuario();
	});
}

function verSeccion(id){
	$("#containerRight").html("");
	$(".liModulo").each(function(index,elem){
		$(elem).removeClass("liModuloActive");
	});
	$("#liModulo"+id).addClass("liModuloActive");
	let currentLi = modules.find( (curr) => curr.id === parseInt(id) );
	currentLi.clickFunction();
	$("#containerActions").find("button").remove();
	switch(parseInt(id)){
	case 1:
		$("#containerActions").append($("<button>",{click:seeAddStaff,html:"<i class='fa fa-plus'></i>New Staff"  }) );
		break;
	case 2:
		$("#containerActions").append($("<button>",{click:seeAddClient,html:"<i class='fa fa-plus'></i>New Client"  }) );
		break;
	case 3:
		$("#containerActions").append($("<button>",{click:seeAddClient,html:"<i class='fa fa-plus'></i>New Client"  }) );
		break;
	case 4:
		$("#containerActions").append($("<button>",{click:seeAddInterview,html:"<i class='fa fa-plus'></i>New Interview"  }) );
		break;
	case 5:
		$("#containerActions").append($("<button>",{click:seeAddResume,html:"<i class='fa fa-plus'></i>New Resume"  }) );
		break;
	}
	
	
}
function toggleOpcionesUsuario(){
	$("#divOpcionesUsuario").toggle();
}
function addOpcionesUsuario(){
	let innerText ="";
	innerText+="<div id='divMyAccount'> "+"My Account"+" </div>";
	innerText+="<div>"+userNow.name+"</div>";
	innerText+="<div>"+userNow.type.name+"</div>";
	innerText+="<div>"+userNow.firstName+" "+userNow.lastName+"</div>";
	innerText+="<div onclick='goLogin()' id='divCloseSession'><i class='fa fa-sign-out'></i>"+"Close session"+"</div>";
	$("#containerActions").append($("<div>",{id:"divOpcionesUsuario",html:innerText } ) );
}
function addFraseTop(){
	let randomIndex =Math.floor( Math.random()*frases.length );
	let frase = frases[randomIndex];
	$("#containerActions").css({"font-size":"13px","justify-content":"center","color":"white"}).html("'"+frase.message+"'    ("+frase.autor+")");
	addOpcionesUsuario();
}



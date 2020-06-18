$(function(){
	$("form").on("submit",function(e){
		e.preventDefault();
		searchUserName();
	})
});


function searchUserName(){
	const userName = $("#userName").val();
	const userPass = $("#userPass").val();
	var dataParam = {
			name : userName,
			pass : userPass
	};
	callAjaxPost("login/validated",dataParam,function(data){
		if(data.user){
			sessionStorage.setItem("userId", data.user.id);
			$("#msgError").text(data.user.type.name);
			window.location.href ="main";
		}else{
			$("#msgError").text("User doesn't exist");
		}
	});
	
}
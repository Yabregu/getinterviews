<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Login</title>
<script src="static/lib/jquery.min.js"></script>
<script src="static/js/data.js"></script>
<script src="static/js/login.js"></script>
<script src="static/js/util.js"></script>
 
<link rel="stylesheet" href="static/css/test.css" type="text/css">
</head>
<body>
<div id="containerGeneral">
	<div id="containerSubGeneral">
		<div id="containerLogin">
			 <div id="fraseInspiradora">"Over six million people have learned TM - people of all ages, cultures, religions, and walks of life"</div>
			<img id="imgLogo" src="static/imagenes/miu-logo.jpg">
			 
			<div id="tituloLogin">Welcome</div>
		
		<form>
		<div class="formRowInput">
		<input type="text" id="userName" placeholder="User" autofocus="true">
		</div>
		<div class="formRowInput">
		
		<input type="password" id="userPass" placeholder="Password">
		</div>
		<div class="formRowButton">
		
		<button type="submit">Login</button>
		<div class="formRowInput" id="msgError">
		</div>
		</div>
		
		</form>
		</div>
	</div>



</div>

</body>

</html>
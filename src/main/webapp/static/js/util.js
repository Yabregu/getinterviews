function callAjaxPost(pUrl,dataParam,functionSuccess){
	$.ajax({
		url : pUrl,
		type : 'post',
		data : JSON.stringify(dataParam),
		contentType : "application/json",
		dataType: "json",
		success : function(data) {
			functionSuccess(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}
function callAjaxPostNoJson(pUrl,data,functionSuccess){
	$.ajax({
		url : pUrl,
		type : 'post',
		contentType : false,
		data : data,
		processData : false,
		cache : false,
		xhrFields: {
            withCredentials: true
        },
        crossDomain: false,
		success : function(data) {
			functionSuccess(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}
function passDecimalToPercent(decimal){
	var porc;
	var aux=decimal*100;
	
	if(aux>=0){
		porc=aux.toFixed(2);
		return porc+"%"
	}else{
		return 0+"%"
	}
}
function goLogin(){
	window.location.href="login.html"
}

function compareLocalDate(day1,day2){

	
	var date1 = Date.UTC(day1.year,day1.monthValue,day1.dayOfMonth); 
	var date2 = Date.UTC(day2.year,day2.monthValue,day2.dayOfMonth);
	
	var dias = Math.floor( (date1-date2) / (1000 * 60 * 60 * 24));
	/*
	if(date1-date2===0){
		console.log("date 1");
		console.log(day1.dayOfMonth);
		console.log("date 2");
		console.log(day2.dayOfMonth);
	}
	*/
	return date1-date2;
	
}
function getInputDate(localDate){
	if(localDate){
		return localDate.year+"-"+
			(localDate.monthValue<10?"0":"")+localDate.monthValue+"-"+
			(localDate.dayOfMonth<10?"0":"")+localDate.dayOfMonth
	
	}else{
		return "";
	}
	
}
function getInputTime(localDate){
	if(localDate){
		return (localDate.hour<10?"0":"")+localDate.hour+":"+
			(localDate.minute<10?"0":"")+localDate.minute
	
	}else{
		return "";
	}
}
function convertBlobImg(codigoImagen,altura,ancho){
	
	var texto="<img src='data:image/png;base64,"+codigoImagen+"' " +
			"style='height:"+altura+"  ; width:"+ancho+"  '>";
	return texto;
	
	
}
class LocalDate extends Date{
	constructor(){
		super();
		this.year = this.getFullYear();
		this.monthValue = this.getMonth()+1;
		this.dayOfMonth = this.getDate();
	}
	
}
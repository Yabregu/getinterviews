var clients = [];
var staffsAsign = [];
var currentClient = {};
function loadGeneralClient(){
	$("#containerCenter").html("");
	$("#containerCenter")
	.append($("<div>",{class:"divSection",id:"divClient",text:"All client"}) )
	switch(userNow.type.id){
	case 1:
		loadAdminClient();
		break;
	case 2:
		loadStaffClient();
		break;
	}
}
function loadAdminClient(){
	
	 callAjaxPost("admin/clients",{id : userNow.id},function(data){
		 clients = data.clients;
		 staffsAsign = data.staffs;
		clients.forEach(function(val){
			const textClient = "<div id='liSection"+val.id+"' onclick='seeDetailsClient("+val.id+")' class='liSection'>"+
			"<p class='pUserName'>"+val.user.firstName+" "+val.user.lastName+"</p>"+
			"<p>Staff asociated:"+(val.staff.user.firstName+" "+val.staff.user.lastName)+"</p>"+
			"<p>DLI: "+(val.dateLastInterviewText)+" ("+val.numberDaysLastInterview+" day(s) ago)</p>"+
			"<p>IW: "+(val.interviewsWeek)+"</p>"+
			"</div>";
			$("#divClient").after(textClient);
		});
	 });
}
function loadStaffClient(){
	
	 callAjaxPost("staff/clients",{user:{id : userNow.id}},function(data){
		 clients = data.clients;
		 //staffsAsign = data.staffs;
		clients.forEach(function(val){
			const textClient = "<div id='liSection"+val.id+"' onclick='seeDetailsClient("+val.id+")' class='liSection'>"+
			"<p class='pUserName'>"+val.user.firstName+" "+val.user.lastName+"</p>"+
			"<p>DLI: "+(val.dateLastInterviewText)+" ("+val.numberDaysLastInterview+" day(s) ago)</p>"+
			"<p>IW: "+(val.interviewsWeek)+"</p>"+
			"</div>";
			$("#divClient").after(textClient);
		});
	 });
}

function seeDetailsClient(id){
	$(".liSection").each(function(index,elem){
		$(elem).removeClass("liSectionActive");
	});
	$("#liSection"+id).addClass("liSectionActive");
	currentClient = clients.find( (curr) => curr.id === parseInt(id) );
	createDescriptionClient(currentClient,"read");
	;
	
}
function createDescriptionClient(clientObj,action){
	$("#containerRight").html("");
	$("#liSection"+clientObj.id).removeClass("liSectionActive");
	$("#liSection"+clientObj.id).addClass("liSectionActive");
	
	if(action === "read"){
		const right = $("#containerRight");
		right.append($("<div>",{class:"descriptionTitle",text :"Client "+ clientObj.user.firstName+" "+clientObj.user.lastName})) 
		.append($("<button>",{class:"buttonTitle",click:updateClient,html:"<i class='fa fa-pencil-square-o'></i>Update"  }))
		.append($("<button>",{class:"buttonTitle",click:confirmDeleteClient,html:"<i class='fa fa-trash'></i>Delete"  }));
		
		let containerRight = $("<div>",{class:"gridDescription" ,id:"gridClientDescription" });
		right.append(containerRight);
		
		containerRight
		.append($("<div>",{class:"divDescriptionLabel" ,html:" User Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:clientObj.user.name}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" User Pass "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:"*******"}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date of Last Interview"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:clientObj.dateLastInterviewText+"   "+clientObj.numberDaysLastInterview+" day(s) ago" }))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Interviews last Week"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:clientObj.interviewsWeek  }))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" First Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:clientObj.user.firstName}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Last Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:clientObj.user.lastName}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Email"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:clientObj.user.email}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Phone"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:clientObj.user.phone}))
		if(userNow.type.id ===1){
			containerRight
			.append($("<div>",{class:"divDescriptionLabel" ,html:" Staff"}))
			.append($("<div>",{class:"divDescriptionInfo" ,text:clientObj.staff.user.firstName+" "+clientObj.staff.user.lastName}))	
		}else{
			callAjaxPost("resume",{user:{id : clientObj.user.id}},function(data){
				containerRight
				.append($("<div>",{class:"divDescriptionLabel" ,html:" Resumes ("+data.resumes.length+")"}))
				data.resumes.forEach(function(val){
					containerRight
					.append($("<div>",{class:"divDescriptionLabel" ,html:"<button onclick='generateWordResume("+val.id+")'><i class='fa fa-download'></i> </button>"+val.jobTitle}))
				});
				
			});
		}
		
		
	}
	if(action === "confirm-delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Client "+ clientObj.user.firstName+" "+clientObj.user.lastName}))
		.append($("<div>",{class:"gridDescription" ,id:"gridClientDescription" }));

		$("#gridClientDescription")
		.append($("<div>",{class:"divDescriptionLabel divConfirmText" ,html:"Are you sure you want to delete this client?"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"Reason Dismiss",keyup:seeByReasonDismiss,id:"inputReasonDismiss",type:"text",value:"" })}))
		.append($("<div>",{class:"divDescriptionInfo divDescriptionFull" ,id:"alertReasonDismiss" ,html: "Reason for dismiss is mandatory" }))
		.append($("<div>",{class:"divDescriptionInfo divDescriptionInfoFinal" ,html: "" }))
		$("#alertReasonDismiss").hide();
		$("#gridClientDescription").find(".divDescriptionInfoFinal")
		.append($("<button>",{class:"buttonTitle",click:deleteClient,html:"<i class='fa fa-trash'></i>Delete"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateClient,html:"<i class='fa fa-times'></i>Cancel"  }))
		
	}
	if(action === "wait-delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Client "+ clientObj.user.firstName+" "+clientObj.user.lastName}))
		.append($("<div>",{class:"gridDescription" ,id:"gridClientDescription" }));

		$("#gridClientDescription")
		.append($("<div>",{class:"divDescriptionLabel divConfirmText" ,html:"Deleting client<i class='fa fa-spin fa-cog'></i>"}))
		
	}
	if(action === "update"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Client "+ clientObj.user.firstName+" "+clientObj.user.lastName}))
		.append($("<button>",{class:"buttonTitle",click:saveUpdateClient,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateClient,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridClientDescription" }));
		console.log(clientObj.staff.id);
		let optionsSelect = staffsAsign.reduce( (total,current) => total+"<option value='"+current.id+"'  > "+current.user.firstName+" "+current.user.lastName+"</option>","");
		let grid = $("#gridClientDescription");
		grid
		.append($("<div>",{class:"divDescriptionLabel" ,html:"User Name"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html: clientObj.user.name }))
		.append($("<div>",{class:"divDescriptionLabel" ,html:"User pass"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:"*****"}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" First Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputFirstName",type:"text",value:""+clientObj.user.firstName})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Last Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputLastName",type:"text",value:""+clientObj.user.lastName})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Email  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputEmail",type:"text",value:""+clientObj.user.email})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Phone  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputPhone",type:"text",value:""+clientObj.user.phone})}))
		if(userNow.type.id ===1){
			grid
			.append($("<div>",{class:"divDescriptionLabel" ,html:" Staff"}))
			.append($("<div>",{class:"divDescriptionInfo" ,html:$("<select>",{id:"selStaff",html:""+optionsSelect })}))
			$("#selStaff").val(clientObj.staff.id);
		}
		;
		
	}
	if(action === "add"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"New Client " }))
		.append($("<button>",{class:"buttonTitle",click:saveAddClient,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelAddClient,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridClientDescription" }));
		let optionsSelect = staffsAsign.reduce( (total,current) => total+"<option value='"+current.id+"'> "+current.user.firstName+" "+current.user.lastName+"</option>","")
		$("#gridClientDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:" User name  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputName",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" User pass  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputPass",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" First Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputFirstName",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Last Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputLastName",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Email  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputEmail",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Phone  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputPhone",type:"text",value:""})}))
		if(userNow.type.id ===1){
			grid
			.append($("<div>",{class:"divDescriptionLabel" ,html:" Staff"}))
			.append($("<div>",{class:"divDescriptionInfo" ,html:$("<select>",{id:"selStaff",html:""+optionsSelect })}))
			
		}
		
		;
	}
	if(action === "delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Client "+ clientObj.dateText+" "+clientObj.timeText+" (Deleted)"}))
	}
	 
}


function seeAddClient(){
	createDescriptionClient({},"add");
}
function getClientFormData(){
	const name = $("#inputName").val();
	const pass = $("#inputPass").val();
	const firstName = $("#inputFirstName").val();
	const lastName = $("#inputLastName").val();
	const email = $("#inputEmail").val();
	const phone = $("#inputPhone").val();
	const staffId = $("#selStaff").val();
	var dataParam = {
			user:
			{name : name,
			pass : pass,
			firstName : firstName,
			lastName : lastName,
			phone : phone,
			email : email 
			},
			staff : {id : staffId, user:{id : userNow.id}}
	};
	return dataParam;
}
function saveAddClient(){
	var clientData = getClientFormData();
	
	callAjaxPost("client/insert",clientData,function(data){
		loadGeneralClient();
		$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>New client saved successfully"})); 
	});
}
function cancelAddClient(){
	$("#containerRight").html("");
}
function cancelUpdateClient(){
	createDescriptionClient(currentClient,"read");
}
function updateClient(){
	createDescriptionClient(currentClient,"update");
}
function saveUpdateClient(){
	var clientData = getClientFormData();
	clientData.id = currentClient.id;
	clientData.user.id = currentClient.user.id;
		callAjaxPost("client/update",clientData,function(data){
			loadGeneralClient();
			$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Client updated successfully"})); 
		});
	}
function confirmDeleteClient(){
	createDescriptionClient(currentClient,"confirm-delete");
}
function seeByReasonDismiss(){
	var reasonDismiss = $("#inputReasonDismiss").val();
	if(reasonDismiss.trim().length === 0){
		$("#alertReasonDismiss").show();
	}else{
		$("#alertReasonDismiss").hide();
	}
}
function deleteClient(){
	var reasonDismiss = $("#inputReasonDismiss").val();
	if(reasonDismiss.trim().length === 0){
		seeByReasonDismiss();
		return;
	}
	var dataParam = {
			user : {id : currentClient.user.id},
			reasonDismiss : reasonDismiss,
			id :currentClient.id
	}
	createDescriptionClient(currentClient,"wait-delete");
	
	callAjaxPost("client/delete",dataParam,function(data){
		loadGeneralClient();
		$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Client deleted successfully"}));
	});
}
var staffs = [];
var currentStaff = {};
function loadStaff(){
	$("#containerCenter").html("");
	$("#containerCenter")
	.append($("<div>",{class:"divSectionStaff",id:"divStaff",text:"All staff"}) )
	
	 callAjaxPost("admin/staffs",{id : userNow.id},function(data){
		 staffs = data.staffs;
		staffs.forEach(function(val){
			const textStaff = "<div id='liStaff"+val.id+"' onclick='seeDetailsStaff("+val.id+")' class='liStaff'>"+
			"<p class='pUserName'>"+val.user.firstName+" "+val.user.lastName+"</p>"+
			"<p>"+(val.user.email)+"</p>"+
			"<p>PCJ: "+passDecimalToPercent(val.percentClientsWithJob)+"</p>"+
			"<p>ICW: "+(val.interviewsClientsWeek)+"</p>"+
			"</div>";
			$("#divStaff").after(textStaff);
		});
	 });
}


function seeDetailsStaff(id){
	$(".liStaff").each(function(index,elem){
		$(elem).removeClass("liStaffActive");
	});
	$("#liStaff"+id).addClass("liStaffActive");
	currentStaff = staffs.find( (curr) => curr.id === parseInt(id) );
	createDescriptionStaff(currentStaff,"read");
	;
	
}
function createDescriptionStaff(staffObj,action){
	$("#containerRight").html("");
	$("#liStaff"+staffObj.id).removeClass("liStaffActive");
	$("#liStaff"+staffObj.id).addClass("liStaffActive");
	
	if(action === "read"){
		const right = $("#containerRight");
		right.append($("<div>",{class:"descriptionTitle",text :"Staff "+ staffObj.user.firstName+" "+staffObj.user.lastName})) 
		.append($("<button>",{class:"buttonTitle",click:updateStaff,html:"<i class='fa fa-pencil-square-o'></i>Update"  }))
		.append($("<button>",{class:"buttonTitle",click:confirmDeleteStaff,html:"<i class='fa fa-trash'></i>Delete"  }));
		
		let containerRight = $("<div>",{class:"gridDescription" ,id:"gridStaffDescription" });
		right.append(containerRight);
		
		containerRight
		.append($("<div>",{class:"divDescriptionLabel" ,html:" User Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:staffObj.user.name}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" User Pass "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:"*******"}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" First Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:staffObj.user.firstName}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Last Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:staffObj.user.lastName}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Email"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:staffObj.user.email}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Phone"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:staffObj.user.phone}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Area"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:staffObj.area}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Department"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:staffObj.department}))
		callAjaxPost("staff/clients",{user:{id : staffObj.user.id}},function(data){
			containerRight
			.append($("<div>",{class:"divDescriptionLabel" ,html:" Clients ("+data.clients.length+")"}))
			data.clients.forEach(function(val){
				containerRight
				.append($("<div>",{class:"divDescriptionLabel" ,html:"<i class='fa fa-caret-right'></i>"+val.user.firstName+" "+val.user.lastName}))
				.append($("<div>",{class:"divDescriptionInfo divDescriptionFull" ,text:"Date Last Interview: "+val.dateLastInterviewText}))
				.append($("<div>",{class:"divDescriptionInfo divDescriptionFull" ,text:"Interviews this Week: "+val.interviewsWeek}))
			});
			
		});
		
	}
	if(action === "confirm-delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Staff "+ staffObj.user.firstName+" "+staffObj.user.lastName}))
		.append($("<div>",{class:"gridDescription" ,id:"gridStaffDescription" }));

		$("#gridStaffDescription")
		.append($("<div>",{class:"divDescriptionLabel divConfirmText" ,html:"Are you sure you want to delete this staff?"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html: "" }))
		$("#gridStaffDescription").find(".divDescriptionInfo")
		.append($("<button>",{class:"buttonTitle",click:deleteStaff,html:"<i class='fa fa-trash'></i>Delete"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateStaff,html:"<i class='fa fa-times'></i>Cancel"  }))
		
	}
	if(action === "update"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Staff "+ staffObj.user.firstName+" "+staffObj.user.lastName}))
		.append($("<button>",{class:"buttonTitle",click:saveUpdateStaff,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateStaff,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridStaffDescription" }));
		
		$("#gridStaffDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:"User Name"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html: staffObj.user.name }))
		.append($("<div>",{class:"divDescriptionLabel" ,html:"User pass"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:"*****"}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" First Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputFirstName",type:"text",value:""+staffObj.user.firstName})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Last Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputLastName",type:"text",value:""+staffObj.user.lastName})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Email  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputEmail",type:"text",value:""+staffObj.user.email})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Phone  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputPhone",type:"text",value:""+staffObj.user.phone})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Area"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputArea",type:"text",value:""+staffObj.area})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Department"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDepartment",type:"text",value:""+staffObj.department})}))
		;
	}
	if(action === "add"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"New Staff " }))
		.append($("<button>",{class:"buttonTitle",click:saveAddStaff,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelAddStaff,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridStaffDescription" }));
		
		$("#gridStaffDescription")
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
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Area"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputArea",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Department"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDepartment",type:"text",value:""})}))
		;
	}
	if(action === "delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Staff "+ staffObj.dateText+" "+staffObj.timeText+" (Deleted)"}))
	}
	 
}


function seeAddStaff(){
	createDescriptionStaff({},"add");
}
function getStaffFormData(){
	const name = $("#inputName").val();
	const pass = $("#inputPass").val();
	const firstName = $("#inputFirstName").val();
	const lastName = $("#inputLastName").val();
	const email = $("#inputEmail").val();
	const phone = $("#inputPhone").val();
	const area = $("#inputArea").val();
	const department = $("#inputDepartment").val();
	var dataParam = {
			user:
			{name : name,
			pass : pass,
			firstName : firstName,
			lastName : lastName,
			phone : phone,
			email : email 
			},
			area : area,
			department : department
	};
	return dataParam;
}
function saveAddStaff(){
	var staffData = getStaffFormData();
	
	callAjaxPost("staff/insert",staffData,function(data){
		loadStaff();
		$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>New staff saved successfully"})); 
	});
}
function cancelAddStaff(){
	$("#containerRight").html("");
}
function cancelUpdateStaff(){
	createDescriptionStaff(currentStaff,"read");
}
function updateStaff(){
	createDescriptionStaff(currentStaff,"update");
}
function saveUpdateStaff(){
	var staffData = getStaffFormData();
	staffData.id = currentStaff.id;
	staffData.user.id = currentStaff.user.id;
		callAjaxPost("staff/update",staffData,function(data){
			loadStaff();
			$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Staff updated successfully"})); 
		});
	}
function confirmDeleteStaff(){
	createDescriptionStaff(currentStaff,"confirm-delete");
}
function deleteStaff(){
	var dataParam = {
			user : {id : currentStaff.user.id},
			id :currentStaff.id
	}
	callAjaxPost("staff/delete",dataParam,function(data){
		loadStaff();
		$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Staff deleted successfully"}));
	});
}
var interviews = [];
var currentInterview = {};
function loadInterview(){
	$("#containerCenter").html("");
	$("#containerCenter")
	.append($("<div>",{class:"divSection",id:"divInterviewToday",text:"Today"}) )
	.append($("<div>",{class:"divSection",id:"divInterviewPending",text:"Coming soon"}) )
	.append($("<div>",{class:"divSection",id:"divInterviewCompleted",text:"Completed"}) )
	
	 callAjaxPost("interview",{user:{id : userNow.id}},function(data){
		 interviews = data.interviews;
			let today = new LocalDate();
		interviews.forEach(function(val){
			const textInterview = "<div id='liInterview"+val.id+"' onclick='seeDetailsInterview("+val.id+")' class='liSection'>"+
			"<p class='pUserName'>"+val.companyName+"</p>"+
			"<p>"+(val.dateText)+"</p>"+
			"<p>"+(val.timeText)+"</p>"+
			"<p>Got Job: "+(val.dateStartJob != null?"Yes":"No")+"</p>"+
			
			"</div>";
			if(compareLocalDate(today,val.date)> 0){
				$("#divInterviewCompleted").after(textInterview);
			}else if(compareLocalDate(today,val.date)===0){
				$("#divInterviewToday").after(textInterview);
			}else{
				$("#divInterviewPending").after(textInterview);
			}
			
		});
	 });
}


function seeDetailsInterview(id){
	$(".liSection").each(function(index,elem){
		$(elem).removeClass("liSectionActive");
	});
	$("#liInterview"+id).addClass("liSectionActive");
	currentInterview = interviews.find( (curr) => curr.id === parseInt(id) );
	createDescriptionInterview(currentInterview,"read");
	;
	
}
function createDescriptionInterview(interviewObj,action){
	$("#containerRight").html("");
	$(".liSection").each(function(index,elem){
		$(elem).removeClass("liSectionActive");
	});
	$("#liInterview"+interviewObj.id).addClass("liSectionActive");
	
	if(action === "read"){
		const right = $("#containerRight");
		right.append($("<div>",{class:"descriptionTitle",text :"Interview "+ interviewObj.companyName})) 
		.append($("<button>",{class:"buttonTitle",click:updateInterview,html:"<i class='fa fa-pencil-square-o'></i>Update"  }))
		.append($("<button>",{class:"buttonTitle",click:confirmDeleteInterview,html:"<i class='fa fa-trash'></i>Delete"  }));
		
		let containerRight = $("<div>",{class:"gridDescription" ,id:"gridInterviewDescription" });
		right.append(containerRight);
		
		containerRight
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Company Name "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:interviewObj.companyName}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:interviewObj.dateText}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Time "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:interviewObj.timeText}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Got Job "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:(interviewObj.dateStartJob != null?"Yes":"No")}))
		
		if(interviewObj.dateStartJob != null){
			containerRight
			.append($("<div>",{class:"divDescriptionLabel" ,html:" Date start job"}))
			.append($("<div>",{class:"divDescriptionInfo" ,text:interviewObj.dateStartJobText}))
			.append($("<div>",{class:"divDescriptionLabel" ,html:" Date end job"}))
			.append($("<div>",{class:"divDescriptionInfo" ,text:interviewObj.dateEndJobText}))
		}
		
		
		
		
	}
	if(action === "confirm-delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Interview "+  interviewObj.companyName}))
		.append($("<div>",{class:"gridDescription" ,id:"gridInterviewDescription" }));

		$("#gridInterviewDescription")
		.append($("<div>",{class:"divDescriptionLabel divConfirmText" ,html:"Are you sure you want to delete this interview?"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html: "" }))
		$("#gridInterviewDescription").find(".divDescriptionInfo")
		.append($("<button>",{class:"buttonTitle",click:deleteInterview,html:"<i class='fa fa-trash'></i>Delete"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateInterview,html:"<i class='fa fa-times'></i>Cancel"  }))
		
	}
	if(action === "update"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Interview "+  interviewObj.companyName}))
		.append($("<button>",{class:"buttonTitle",click:saveUpdateInterview,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateInterview,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridInterviewDescription" }));
		$("#gridInterviewDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Company Name  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputCompanyName",type:"text",value:interviewObj.companyName})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDate",type:"date",value:getInputDate(interviewObj.date)})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Time"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputTime",type:"time",value:getInputTime(interviewObj.time)})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:"<input onchange='seeByGotJob()' type='checkbox' id='inputGotJob'  "+(interviewObj.dateStartJob==null?"":"checked")+"><label for='inputGotJob'> Got job </label>"}))
		
		.append($("<div>",{class:"divDescriptionLabel",id:"labelDateStartJob" ,html:" Date Start Job"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDateStartJob",type:"date",value:getInputDate(interviewObj.dateStartJob)})}))
		.append($("<div>",{class:"divDescriptionLabel",id:"labelDateEndJob"  ,html:" Date End Job"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDateEndJob",type:"date",value:getInputDate(interviewObj.dateEndJob)})}));
		
		seeByGotJob();
	}
	if(action === "add"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"New Interview " }))
		.append($("<button>",{class:"buttonTitle",click:saveAddInterview,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelAddInterview,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridInterviewDescription" }));
		
		$("#gridInterviewDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Company Name  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputCompanyName",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date  "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDate",type:"date",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Time"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputTime",type:"time",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:"<input onchange='seeByGotJob()' type='checkbox' id='inputGotJob'><label for='inputGotJob'> Got job </label>"}))
		
		.append($("<div>",{class:"divDescriptionLabel",id:"labelDateStartJob" ,html:" Date Start Job"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDateStartJob",type:"date",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel",id:"labelDateEndJob"  ,html:" Date End Job"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDateEndJob",type:"date",value:""})}));
		seeByGotJob();
		
		;
	}
	if(action === "delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Interview "+ interviewObj.dateText+" "+interviewObj.timeText+" (Deleted)"}))
	}
	 
}
function seeByGotJob(){
	const isGotJobChecked=$("#inputGotJob").prop("checked");
	if(isGotJobChecked){
		$("#labelDateStartJob").show();
		$("#labelDateEndJob").show();
		$("#inputDateStartJob").parent().show();
		$("#inputDateEndJob").parent().show();
	}else{
		$("#labelDateStartJob").hide();
		$("#labelDateEndJob").hide();
		$("#inputDateStartJob").parent().hide();
		$("#inputDateEndJob").parent().hide();
	}
}

function seeAddInterview(){
	createDescriptionInterview({},"add");
}
function getInterviewFormData(){
	const isGotJobChecked=$("#inputGotJob").prop("checked");
	const companyName = $("#inputCompanyName").val();
	const date = $("#inputDate").val();
	const time = $("#inputTime").val();
	const dateStartJob =!isGotJobChecked?null: $("#inputDateStartJob").val();
	const dateEndJob =!isGotJobChecked?null: $("#inputDateEndJob").val();
	
	var dataParam = {
			client : {id:userNow.client.id},
			companyName : companyName,
			date : date,
			time : time,
			dateStartJob : dateStartJob,
			dateEndJob : dateEndJob
	};
	return dataParam;
}
function saveAddInterview(){
	var interviewData = getInterviewFormData();
	
	callAjaxPost("interview/insert",interviewData,function(data){
		loadInterview();
		$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>New interview saved successfully"})); 
	});
}
function cancelAddInterview(){
	$("#containerRight").html("");
}
function cancelUpdateInterview(){
	createDescriptionInterview(currentInterview,"read");
}
function updateInterview(){
	createDescriptionInterview(currentInterview,"update");
}
function saveUpdateInterview(){
	var interviewData = getInterviewFormData();
	interviewData.id = currentInterview.id;
		callAjaxPost("interview/update",interviewData,function(data){
			loadInterview();
			$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Interview updated successfully"})); 
		});
	}
function confirmDeleteInterview(){
	createDescriptionInterview(currentInterview,"confirm-delete");
}
function deleteInterview(){
	var dataParam = {
			id :currentInterview.id
	}
	callAjaxPost("interview/delete",dataParam,function(data){
		loadInterview();
		$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Interview deleted successfully"}));
	});
}
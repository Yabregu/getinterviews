var resumes = [];
var currentResume = {};
function loadResume(){
	$("#containerCenter").html("");
	$("#containerCenter")
	.append($("<div>",{class:"divSection",id:"divResume",text:"All resumes"}) )
	
	 callAjaxPost("resume",{user:{id : userNow.id}},function(data){
		resumes = data.resumes;
		resumes.forEach(function(val){
			const textResume = "<div id='liResume"+val.id+"' onclick='seeDetailsResume("+val.id+")' class='liSection'>"+
			"<p class='pUserName'>"+val.jobTitle+"</p>"+
			"<p>"+(val.description.length > 50?val.description.substr(0,150)+"...":""+val.description)+"</p>"+
			
			"</div>";
			$("#divResume").after(textResume);
			
		});
	 });
}


function seeDetailsResume(id){
	$(".liSection").each(function(index,elem){
		$(elem).removeClass("liSectionActive");
	});
	$("#liResume"+id).addClass("liSectionActive");
	currentResume = resumes.find( (curr) => curr.id === parseInt(id) );
	createDescriptionResume(currentResume,"read");
	;
	
}
function createDescriptionResume(resumeObj,action){
	$("#containerRight").html("");
	$(".liSection").each(function(index,elem){
		$(elem).removeClass("liSectionActive");
	});
	$("#liResume"+resumeObj.id).addClass("liSectionActive");
	
	if(action === "read"){
		const right = $("#containerRight");
		right.append($("<div>",{class:"descriptionTitle",text :"Resume "+ resumeObj.jobTitle})) 
		.append($("<button>",{class:"buttonTitle",click:generateWordResume,html:"<i class='fa fa-file-word-o'></i>Word "  }))
		.append($("<button>",{class:"buttonTitle",click:updateResume,html:"<i class='fa fa-pencil-square-o'></i>Update"  }))
		.append($("<button>",{class:"buttonTitle",click:confirmDeleteResume,html:"<i class='fa fa-trash'></i>Delete"  }));
		
		let containerRight = $("<div>",{class:"gridDescription" ,id:"gridResumeDescription" });
		right.append(containerRight);
		
		containerRight
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Job title"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:resumeObj.jobTitle}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Description"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:resumeObj.description}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date start job"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:resumeObj.dateCanStartJobText}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Salary goal ($)"}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:resumeObj.salaryGoal}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Photo"}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:convertBlobImg(resumeObj.photo,"auto","100%")}))
				
		
	}
	if(action === "confirm-delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Resume "+  resumeObj.jobTitle}))
		.append($("<div>",{class:"gridDescription" ,id:"gridResumeDescription" }));

		$("#gridResumeDescription")
		.append($("<div>",{class:"divDescriptionLabel divConfirmText" ,html:"Are you sure you want to delete this resume?"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html: "" }))
		$("#gridResumeDescription").find(".divDescriptionInfo")
		.append($("<button>",{class:"buttonTitle",click:deleteResume,html:"<i class='fa fa-trash'></i>Delete"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateResume,html:"<i class='fa fa-times'></i>Cancel"  }))
		
	}
	if(action === "update"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Resume "+  resumeObj.jobTitle}))
		.append($("<button>",{class:"buttonTitle",click:saveUpdateResume,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateResume,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridResumeDescription" }));
		$("#gridResumeDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Job Title "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputJobTitle",type:"text",value:resumeObj.jobTitle})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Description"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<textarea>",{placeholder:"",id:"inputDescription",type:"text",html:resumeObj.description})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date can start job"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDateCanStartJob",type:"date",value:getInputDate(resumeObj.dateCanStartJob)})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Salary goal"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputSalaryGoal",type:"number",value:resumeObj.salaryGoal})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Photo"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<button>",
				{html:"<span><i class='fa fa-upload'></i>Upload  </span>",id:"buttonAddPhoto" })}))
		.append($("<div>",{class:"divDescriptionInfo",html:"<input id='inputPhoto' accept = 'image/*'  type='file' style='display:none'>"  }))
		.append($("<div>",{class:"divDescriptionLabel"  ,id:"divPhotoPreview"  }))
		.append($("<div>",{class:"divDescriptionLabel" ,html:convertBlobImg(resumeObj.photo,"auto","100%")}))
		$("#inputPhoto").on('change' , function(event, numFiles, label) {
			var reader = new FileReader();
			if($(this)[0].files){
				
			var file = $(this)[0].files[0];
			$("#divPhotoPreview").html( "<img style='width : 100%'  >" );
		    reader.onload = function(e) {
		      $('#divPhotoPreview > img').attr('src', e.target.result);
		    }
		    reader.readAsDataURL(file);
			}
		    
	      });
		$("#buttonAddPhoto").on('click' , function(event) {
			$("#inputPhoto").click();
	      });
	}
	if(action === "add"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"New Resume " }))
		.append($("<button>",{class:"buttonTitle",click:saveAddResume,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelAddResume,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridResumeDescription" }));
		
		$("#gridResumeDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Job Title "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputJobTitle",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Description"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<textarea>",{placeholder:"",id:"inputDescription",type:"text",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date start job"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDateCanStartJob",type:"date",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Salary goal"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputSalaryGoal",type:"number",value:""})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Photo"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<button>",
				{html:"<span><i class='fa fa-upload'></i>Upload  </span>",id:"buttonAddPhoto" })}))
		.append($("<div>",{class:"divDescriptionInfo",html:"<input id='inputPhoto' accept = 'image/*'  type='file' style='display:none'>"  }))
		.append($("<div>",{class:"divDescriptionLabel"  ,id:"divPhotoPreview"  }))
		
		;
		$("#inputPhoto").on('change' , function(event, numFiles, label) {
			var reader = new FileReader();
			if($(this)[0].files){
				
			var file = $(this)[0].files[0];
			$("#divPhotoPreview").html( "<img style='width : 100%'  >" );
		    reader.onload = function(e) {
		      $('#divPhotoPreview > img').attr('src', e.target.result);
		    }
		    reader.readAsDataURL(file);
			}
		    
	      });
		$("#buttonAddPhoto").on('click' , function(event) {
			$("#inputPhoto").click();
	      });
	}
	if(action === "delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Resume "+ resumeObj.dateText+" "+resumeObj.timeText+" (Deleted)"}))
	}
	 
}
function generateWordResume(resumeId){
	window.open("resume/informe?resumeId="
			+(  currentResume.id ), '_blank');	
}

function seeAddResume(){
	createDescriptionResume({},"add");
}
function getResumeFormData(){
	const jobTitle = $("#inputJobTitle").val();
	const description = $("#inputDescription").val();
	const dateCanStartJob = $("#inputDateCanStartJob").val();
	const salaryGoal = $("#inputSalaryGoal").val();
	
	var dataParam = {
			client : {id:userNow.client.id},
			jobTitle : jobTitle,
			description : description,
			dateCanStartJob : dateCanStartJob,
			salaryGoal : salaryGoal
	};
	return dataParam;
}
function saveAddResume(){
	var resumeData = getResumeFormData();
	
	callAjaxPost("resume/insert",resumeData,function(data){
		var photo = $("#inputPhoto")[0].files[0];
		if(photo){
			var dataForm = new FormData();
			dataForm.append("id",data.returnId);
			dataForm.append("photo",photo);
			 callAjaxPostNoJson("resume/update/photo",dataForm,function(){
				 $("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>New resume saved successfully"}));
					loadResume();
			 });
		}else{
			 $("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Resume updated successfully"}));
				loadResume();
		}
		
	});
}
function cancelAddResume(){
	$("#containerRight").html("");
}
function cancelUpdateResume(){
	createDescriptionResume(currentResume,"read");
}
function updateResume(){
	createDescriptionResume(currentResume,"update");
}
function saveUpdateResume(){
	var resumeData = getResumeFormData();
	resumeData.id = currentResume.id;
		callAjaxPost("resume/update",resumeData,function(data){
			var photo = $("#inputPhoto")[0].files[0];
			if(photo){
				var dataForm = new FormData();
				dataForm.append("id",resumeData.id);
				dataForm.append("photo",photo);
				 callAjaxPostNoJson("resume/update/photo",dataForm,function(){
					 $("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Resume updated successfully"}));

						loadResume();
				 });
			}else{
				 $("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Resume updated successfully"}));

					loadResume();
			}
		});
	}
function confirmDeleteResume(){
	createDescriptionResume(currentResume,"confirm-delete");
}
function deleteResume(){
	var dataParam = {
			id :currentResume.id
	}
	callAjaxPost("resume/delete",dataParam,function(data){
		loadResume();
		$("#containerRight").html($("<div>",{class:"descriptionTitle",html:"<i class='fa fa-check'></i>Resume deleted successfully"}));
	});
}
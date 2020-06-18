package project.controller;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import project.model.ClientDTO;
import project.model.ResumeDTO;
import project.service.interfaces.ResumeService;

@RestController
@RequestMapping("/resume")
public class ResumeController {
 
	  @Autowired
	  ResumeService resumeService;
   
  @RequestMapping(value="",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> getResumes(@RequestBody ClientDTO client) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resumes", resumeService.getResumes(client));
		 
	  return map;
  }
  @RequestMapping(value="/insert",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> insertResume(@RequestBody ResumeDTO resume) {
		Map<String, Object> map = new HashMap<String, Object>();
		Integer returnId = resumeService.insertResume(resume);
		map.put("returnId", returnId);
	  return map;
  }
  @RequestMapping(value="/update",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> updateResume(@RequestBody ResumeDTO resume) {
		Map<String, Object> map = new HashMap<String, Object>();
		resumeService.updateResume(resume);
	  return map;
  }
  @RequestMapping(value="/update/photo",  method = RequestMethod.POST,consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
  public Map<String, Object> updateResumePhoto(
		  @RequestParam("id") Integer resumeId,
			@RequestParam("photo") MultipartFile file) {
		Map<String, Object> map = new HashMap<String, Object>();
		ResumeDTO resume = new ResumeDTO();
		resume.setId(resumeId);
		try {
			resume.setPhoto(file.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		resumeService.updateResumePhoto(resume);
	  return map;
  }
  @RequestMapping(value="/delete",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> deleteResume(@RequestBody ResumeDTO resume) {
		Map<String, Object> map = new HashMap<String, Object>();
		resumeService.deleteResume(resume);
	  return map;
  }
  

	@RequestMapping(value = "/informe", method = RequestMethod.GET)
	public void getInforme(HttpServletRequest request,
			HttpServletResponse response) {

		try {
			ResumeDTO resume = new ResumeDTO();
			resume.setId(Integer.parseInt(request.getParameter("resumeId")));
		WordprocessingMLPackage hojaDeRuta = resumeService.getInforme(resume);
			
			try {
			response.setContentType("application/force-download");
			response.setHeader( "Content-Disposition","attachment; filename=Resume.docx");
			hojaDeRuta.save(response.getOutputStream());
			response.flushBuffer();
				

			} finally {}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
  
  
  
}
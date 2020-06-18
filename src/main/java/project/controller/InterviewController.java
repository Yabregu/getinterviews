package project.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.model.ClientDTO;
import project.model.InterviewDTO;
import project.service.interfaces.InterviewService;

@RestController
@RequestMapping("/interview")
public class InterviewController {
 
	  @Autowired
	  InterviewService interviewService;
   
  @RequestMapping(value="",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> getInterviews(@RequestBody ClientDTO client) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("interviews", interviewService.getInterviews(client));
		 
	  return map;
  }
  @RequestMapping(value="/insert",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> insertInterview(@RequestBody InterviewDTO staff) {
		Map<String, Object> map = new HashMap<String, Object>();
		interviewService.insertInterview(staff);
	  return map;
  }
  @RequestMapping(value="/update",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> updateInterview(@RequestBody InterviewDTO staff) {
		Map<String, Object> map = new HashMap<String, Object>();
		interviewService.updateInterview(staff);
	  return map;
  }
  @RequestMapping(value="/delete",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> deleteInterview(@RequestBody InterviewDTO staff) {
		Map<String, Object> map = new HashMap<String, Object>();
		interviewService.deleteInterview(staff);
	  return map;
  }
  
  
  
  
  
}
package project.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.model.StaffDTO;
import project.service.interfaces.ClientService;
import project.service.interfaces.StaffService;

@RestController
@RequestMapping("/staff")
public class StaffController {

	  @Autowired
	  StaffService staffService;
	  @Autowired
	  ClientService clientService;
   
  @RequestMapping(value="/clients",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> getClients(@RequestBody StaffDTO staff ) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("clients", clientService.getClientsStaff(staff));
		 
	  return map;
  }
  @RequestMapping(value="/insert",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> insertStaff(@RequestBody StaffDTO staff) {
		Map<String, Object> map = new HashMap<String, Object>();
		staffService.insertStaff(staff);
	  return map;
  }
  @RequestMapping(value="/update",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> updateStaff(@RequestBody StaffDTO staff) {
		Map<String, Object> map = new HashMap<String, Object>();
		staffService.updateStaff(staff);
	  return map;
  }
  @RequestMapping(value="/delete",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> deleteStaff(@RequestBody StaffDTO staff) {
		Map<String, Object> map = new HashMap<String, Object>();
		staffService.deleteStaff(staff);
	  return map;
  }
  
  
  
  
  
}
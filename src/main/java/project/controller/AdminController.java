package project.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.model.UserDTO;
import project.service.interfaces.ClientService;
import project.service.interfaces.StaffService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	  @Autowired
	  StaffService staffService;
	  @Autowired
	  ClientService clientService;
   

  @RequestMapping(value="/staffs",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> getStaffs(@RequestBody UserDTO user ) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("staffs", staffService.getStaffs());
	  return map;
  }

  @RequestMapping(value="/clients",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> getClients(@RequestBody UserDTO user ) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("clients", clientService.getClientsAdmin());
		map.put("staffs", staffService.getStaffsNoIndicators());
	  return map;
  }
  
  
  
  
}
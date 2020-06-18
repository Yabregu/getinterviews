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
import project.service.interfaces.ClientService;

@RestController
@RequestMapping("/client")
public class ClientController {
	
  @Autowired
  ClientService clientService;
   

  @RequestMapping(value="/insert",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> insertClient(@RequestBody ClientDTO client) {
		Map<String, Object> map = new HashMap<String, Object>();
		clientService.insertClient(client);
	  return map;
  }
  @RequestMapping(value="/update",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> updateClient(@RequestBody ClientDTO client) {
		Map<String, Object> map = new HashMap<String, Object>();
		clientService.updateClient(client);
	  return map;
  }
  @RequestMapping(value="/delete",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> deleteClient(@RequestBody ClientDTO client) {
		Map<String, Object> map = new HashMap<String, Object>();
		clientService.deleteClient(client);
	  return map;
  }
  
  
  
  
  
}
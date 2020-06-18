package project.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import project.model.UserDTO;
import project.service.interfaces.UserService;

@RestController
@RequestMapping("/login")
public class LoginController {
	
  @Autowired
  UserService userService;
  
  @RequestMapping(  method = RequestMethod.GET)
  public ModelAndView getView( ) {
	  return new ModelAndView("login");
  }
  

  @RequestMapping(value="/validated",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> validateLogin(@RequestBody UserDTO user ) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("user",userService.getUserByNamePass(user));
	  return map;
  }
  
  
  
  
}
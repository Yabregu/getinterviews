package project.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.model.MenuOpcionDTO;
import project.model.UserDTO;
import project.service.interfaces.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
  @Autowired
  UserService userService;
   

  @RequestMapping(value="/id",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Map<String, Object> validateLogin(@RequestBody UserDTO user ) {
		Map<String, Object> map = new HashMap<String, Object>();
	List<MenuOpcionDTO> options = new ArrayList<>();
	options.add(new MenuOpcionDTO(1,"Staffs","fa-users"));
	options.add(new MenuOpcionDTO(2,"Clients","fa-address-book"));
	options.add(new MenuOpcionDTO(3,"My Clients","fa-address-book"));
	options.add(new MenuOpcionDTO(4,"Interviews","fa-calendar"));
	options.add(new MenuOpcionDTO(5,"Resume","fa-file-code-o"));
	UserDTO userFind = userService.getUserById(user);
	switch(userFind.getType().getId()){
	case 1:
		options=options.stream().filter(x -> x.getId()==1 || x.getId()==2).collect(Collectors.toList());
		break;
	case 2:
		options=options.stream().filter(x -> x.getId()==3).collect(Collectors.toList());
		break;
	case 3:
		options=options.stream().filter(x -> x.getId()==4 || x.getId()==5).collect(Collectors.toList());
		break;
	}
	map.put("options", options);
		map.put("user",userFind);
	  return map;
  }
  
  
  
  
  
}
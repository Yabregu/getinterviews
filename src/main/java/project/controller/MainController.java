package project.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/main")
public class MainController {
	
  
  @RequestMapping(  method = RequestMethod.GET)
  public ModelAndView getMainView( ) {
	  return new ModelAndView("main");
  }
  
 
  
  
  
  
}
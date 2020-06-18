package project.service.interfaces;

import project.model.UserDTO;

public interface UserService {

	UserDTO getUserByNamePass(UserDTO user);

	UserDTO getUserById(UserDTO user);

}

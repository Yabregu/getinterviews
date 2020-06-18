package project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.model.UserDTO;
import project.repository.UserMapper;
import project.service.interfaces.UserService;

@Service
public class UserServiceImpl implements UserService{
@Autowired
UserMapper userMapper;
	public UserDTO getUserByNamePass(UserDTO user) {
		// TODO Auto-generated method stub
		return userMapper.getUserByNamePass(user);
	}
	public UserDTO getUserById(UserDTO user) {
		// TODO Auto-generated method stub
		return userMapper.getUserById(user);
	}

}

package project.repository;

import project.model.UserDTO;

public interface UserMapper {
UserDTO getUserByNamePass(UserDTO user);

UserDTO getUserById(UserDTO user);

void insertUser(UserDTO user);
Integer getMaxIdUser();
void updateUser(UserDTO user);
void deleteUser(UserDTO user);
}

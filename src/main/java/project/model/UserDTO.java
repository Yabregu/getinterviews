package project.model;

public class UserDTO {
	private Integer id;
private String name;
private String firstName;
private String lastName;
private String pass;
private UserTypeDTO type;
private String email;
private String phone;
private ClientDTO client;
@Override
public String toString(){
	return "name="+name+" pass:"+pass+" .. Type: "+type.getName();
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getPass() {
	return pass;
}
public void setPass(String pass) {
	this.pass = pass;
}
public UserTypeDTO getType() {
	return type;
}
public void setType(UserTypeDTO type) {
	this.type = type;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getFirstName() {
	return firstName;
}
public void setFirstName(String firstName) {
	this.firstName = firstName;
}
public String getLastName() {
	return lastName;
}
public void setLastName(String lastName) {
	this.lastName = lastName;
} 
public String getPhone() {
	return phone;
}
public void setPhone(String phone) {
	this.phone = phone;
}
public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public ClientDTO getClient() {
	return client;
}
public void setClient(ClientDTO client) {
	this.client = client;
}
}

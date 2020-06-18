package project.model;

public class SelectMenuDTO {
private Integer id;
private String name;
public SelectMenuDTO(){
	
}
public SelectMenuDTO(Integer id){
	this.id = id;
}
public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
}

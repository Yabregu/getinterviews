package project.model;

public class MenuOpcionDTO {
private Integer id;
private String name;
private String icon;
public MenuOpcionDTO(){
	super();
}
public MenuOpcionDTO(Integer id,String name,String icon){
	this.id = id;
	this.name = name;
	this.icon = icon;
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
public String getIcon() {
	return icon;
}
public void setIcon(String icon) {
	this.icon = icon;
}
}

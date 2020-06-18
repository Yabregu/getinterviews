package project.model;

public class StaffDTO {
private String department;
private String area;
private Double percentClientsWithJob;
private Double interviewsClientsWeek;
private Integer id;
private UserDTO user;
public StaffDTO setIndicators(StaffDTO staff){
	this.percentClientsWithJob = staff.getPercentClientsWithJob();
	this.interviewsClientsWeek = staff.getInterviewsClientsWeek();
	return this;
}
public String getDepartment() {
	return department;
}
public void setDepartment(String department) {
	this.department = department;
}

public String getArea() {
	return area;
}

public void setArea(String area) {
	this.area = area;
}

public Double getPercentClientsWithJob() {
	return percentClientsWithJob;
}

public void setPercentClientsWithJob(Double percentClientsWithJob) {
	this.percentClientsWithJob = percentClientsWithJob;
}

public Double getInterviewsClientsWeek() {
	return interviewsClientsWeek;
}

public void setInterviewsClientsWeek(Double interviewsClientsWeek) {
	this.interviewsClientsWeek = interviewsClientsWeek;
}
public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public UserDTO getUser() {
	return user;
}
public void setUser(UserDTO user) {
	this.user = user;
}
}

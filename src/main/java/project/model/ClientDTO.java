package project.model;

public class ClientDTO {
private Integer id;
private UserDTO user;
private String dateLastInterviewText;
private Integer numberDaysLastInterview;
private Integer interviewsWeek;
private StaffDTO staff;
private String reasonDismiss;
public ClientDTO setIndicators(ClientDTO client){
	this.dateLastInterviewText = client.getDateLastInterviewText();
	this.numberDaysLastInterview = client.getNumberDaysLastInterview();
	this.interviewsWeek = client.getInterviewsWeek();
	return this;
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
public String getDateLastInterviewText() {
	return dateLastInterviewText;
}
public void setDateLastInterviewText(String dateLastInterviewText) {
	this.dateLastInterviewText = dateLastInterviewText;
}
public Integer getNumberDaysLastInterview() {
	return numberDaysLastInterview;
}
public void setNumberDaysLastInterview(Integer numberDaysLastInterview) {
	this.numberDaysLastInterview = numberDaysLastInterview;
}
public Integer getInterviewsWeek() {
	return interviewsWeek;
}
public void setInterviewsWeek(Integer interviewsWeek) {
	this.interviewsWeek = interviewsWeek;
}
public StaffDTO getStaff() {
	return staff;
}
public void setStaff(StaffDTO staff) {
	this.staff = staff;
}
public String getReasonDismiss() {
	return reasonDismiss;
}
public void setReasonDismiss(String reasonDismiss) {
	this.reasonDismiss = reasonDismiss;
}
}

package project.model;

import java.time.LocalDate;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

public class ResumeDTO {
private ClientDTO client;
private Integer id;
private String jobTitle;
private String description;
private byte[] photo;
@JsonDeserialize(using = LocalDateDeserializer.class)
private LocalDate dateCanStartJob;

private String dateCanStartJobText;
private Integer salaryGoal;
public ClientDTO getClient() {
	return client;
}
public void setClient(ClientDTO client) {
	this.client = client;
}
public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public String getJobTitle() {
	return jobTitle;
}
public void setJobTitle(String jobTitle) {
	this.jobTitle = jobTitle;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public String getDateCanStartJobText() {
	return dateCanStartJobText;
}
public void setDateCanStartJobTexto(String dateCanStartJobText) {
	this.dateCanStartJobText = dateCanStartJobText;
}
public Integer getSalaryGoal() {
	return salaryGoal;
}
public void setSalaryGoal(Integer salaryGoal) {
	this.salaryGoal = salaryGoal;
}
public LocalDate getDateCanStartJob() {
	return dateCanStartJob;
}
public void setDateCanStartJob(LocalDate dateCanStartJob) {
	this.dateCanStartJob = dateCanStartJob;
}
public byte[] getPhoto() {
	return photo;
}
public void setPhoto(byte[] photo) {
	this.photo = photo;
}
}

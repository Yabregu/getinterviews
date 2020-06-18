package project.model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;

public class InterviewDTO {
private Integer id;

@JsonDeserialize(using = LocalDateDeserializer.class)
private LocalDate date;

@JsonDeserialize(using = LocalTimeDeserializer.class)
private LocalTime time;
private String dateText;
private String timeText;
private String companyName;
private ClientDTO client;
@JsonDeserialize(using = LocalDateDeserializer.class)
private LocalDate dateStartJob;

private String dateStartJobText;

@JsonDeserialize(using = LocalDateDeserializer.class)
private LocalDate dateEndJob;

private String dateEndJobText;
public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
}
public LocalDate getDate() {
	return date;
}
public void setDate(LocalDate date) {
	this.date = date;
}
public LocalTime getTime() {
	return time;
}
public void setTime(LocalTime time) {
	this.time = time;
}
public String getDateText() {
	return dateText;
}
public void setDateText(String dateText) {
	this.dateText = dateText;
}
public String getTimeText() {
	return timeText;
}
public void setTimeText(String timeText) {
	this.timeText = timeText;
}
public String getCompanyName() {
	return companyName;
}
public void setCompanyName(String companyName) {
	this.companyName = companyName;
}
public ClientDTO getClient() {
	return client;
}
public void setClient(ClientDTO client) {
	this.client = client;
}
public LocalDate getDateStartJob() {
	return dateStartJob;
}
public void setDateStartJob(LocalDate dateStartJob) {
	this.dateStartJob = dateStartJob;
}
public String getDateStartJobText() {
	return dateStartJobText;
}
public void setDateStartJobText(String dateStartJobText) {
	this.dateStartJobText = dateStartJobText;
}
public LocalDate getDateEndJob() {
	return dateEndJob;
}
public void setDateEndJob(LocalDate dateEndJob) {
	this.dateEndJob = dateEndJob;
}
public String getDateEndJobText() {
	return dateEndJobText;
}
public void setDateEndJobText(String dateEndJobText) {
	this.dateEndJobText = dateEndJobText;
}
}

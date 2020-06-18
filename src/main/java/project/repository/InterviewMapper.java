package project.repository;

import java.util.List;

import project.model.ClientDTO;
import project.model.InterviewDTO;

public interface InterviewMapper {

	List<InterviewDTO> getInterviews(ClientDTO client);

	void insertInterview(InterviewDTO interview);

	void updateInterview(InterviewDTO interview);

	void deleteInterview(InterviewDTO interview);

}

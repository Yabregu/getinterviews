package project.service.interfaces;

import java.util.List;

import project.model.ClientDTO;
import project.model.InterviewDTO;

public interface InterviewService {

	List<InterviewDTO> getInterviews(ClientDTO client);

	void insertInterview(InterviewDTO interview);

	void updateInterview(InterviewDTO interview);

	void deleteInterview(InterviewDTO interview);

}

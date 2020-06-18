package project.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.model.ClientDTO;
import project.model.InterviewDTO;
import project.repository.InterviewMapper;
import project.service.interfaces.InterviewService;

@Service
public class InterviewServiceImpl implements InterviewService{
@Autowired
InterviewMapper interviewMapper;

@Override
public List<InterviewDTO> getInterviews(ClientDTO client) {
	// TODO Auto-generated method stub
	return  interviewMapper.getInterviews(client);
}

@Override
public void insertInterview(InterviewDTO interview) {
	// TODO Auto-generated method stub
	interviewMapper.insertInterview(interview);
}

@Override
public void updateInterview(InterviewDTO interview) {
	// TODO Auto-generated method stub
	interviewMapper.updateInterview(interview);
}

@Override
public void deleteInterview(InterviewDTO interview) {
	// TODO Auto-generated method stub
	interviewMapper.deleteInterview(interview);
}

}

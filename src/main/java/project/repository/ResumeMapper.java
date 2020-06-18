package project.repository;

import java.util.List;

import project.model.ClientDTO;
import project.model.ResumeDTO;

public interface ResumeMapper {
	List<ResumeDTO> getResumes(ClientDTO client);

	void insertResume(ResumeDTO resume);

	void updateResume(ResumeDTO resume);

	void deleteResume(ResumeDTO resume);

	void updateResumePhoto(ResumeDTO resume);

	Integer getMaxIdResume();

	ResumeDTO getResumeById(ResumeDTO resume);
}

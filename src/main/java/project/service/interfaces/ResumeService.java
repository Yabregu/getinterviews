package project.service.interfaces;

import java.util.List;

import org.docx4j.openpackaging.packages.WordprocessingMLPackage;

import project.model.ClientDTO;
import project.model.ResumeDTO;

public interface ResumeService {

	List<ResumeDTO> getResumes(ClientDTO client);

	Integer insertResume(ResumeDTO resume);

	void updateResume(ResumeDTO resume);

	void deleteResume(ResumeDTO resume);

	void updateResumePhoto(ResumeDTO resume);

	WordprocessingMLPackage getInforme(ResumeDTO resume);
}

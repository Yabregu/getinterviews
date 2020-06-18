package project.service.impl;

import java.io.FileNotFoundException;
import java.util.List;

import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.wml.P;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.model.ClientDTO;
import project.model.ResumeDTO;
import project.repository.ResumeMapper;
import project.service.interfaces.ResumeService;
import project.util.WordGenerator;

@Service
public class ResumeServiceImpl implements ResumeService{
@Autowired
ResumeMapper resumeMapper;

@Override
public List<ResumeDTO> getResumes(ClientDTO client) {
	// TODO Auto-generated method stub
	return  resumeMapper.getResumes(client);
}

@Override
public Integer insertResume(ResumeDTO resume) {
	// TODO Auto-generated method stub
	resumeMapper.insertResume(resume);
	return resumeMapper.getMaxIdResume();
}

@Override
public void updateResume(ResumeDTO resume) {
	// TODO Auto-generated method stub
	resumeMapper.updateResume(resume);
}
@Override
public void updateResumePhoto(ResumeDTO resume) {
	// TODO Auto-generated method stub
	resumeMapper.updateResumePhoto(resume);
}

@Override
public void deleteResume(ResumeDTO resume) {
	// TODO Auto-generated method stub
	resumeMapper.deleteResume(resume);
}

@Override
public WordprocessingMLPackage getInforme(ResumeDTO resume) {
	// TODO Auto-generated method stub
	WordGenerator generatorWord = new WordGenerator();
	
	try{
		WordprocessingMLPackage plantilla = generatorWord.getTemplate("word/RESUME_TEMPLATE.docx");
		ResumeDTO resumeWord = resumeMapper.getResumeById(resume);
		generatorWord.replacePlaceholder(plantilla, resumeWord.getClient().getUser().getFirstName().toUpperCase()+" "+resumeWord.getClient().getUser().getLastName().toUpperCase(), "_title");		
		generatorWord.replacePlaceholder(plantilla, resumeWord.getClient().getUser().getEmail()+" - " +resumeWord.getClient().getUser().getPhone(), "_subtitle");		
		generatorWord.replacePlaceholder(plantilla, resumeWord.getJobTitle(), "_jobtitle");
		generatorWord.replacePlaceholder(plantilla, resumeWord.getDescription(), "_description");
		generatorWord.replacePlaceholder(plantilla, resumeWord.getDateCanStartJobText(), "_datecan");
		generatorWord.replacePlaceholder(plantilla,"$ "+ resumeWord.getSalaryGoal().toString(), "_salary");
		
		  
			/************ inserta logo ****************/
			if(resumeWord.getPhoto()!=null){
				P pImage = generatorWord.newImage(plantilla,resumeWord.getPhoto() );
				generatorWord.replaceCellTableWithImage(new String[] { "$Photo" }, pImage, plantilla);
				}else{
					generatorWord.replacePlaceholder(plantilla,"no photo","$Photo");
				}
			/************ fin inserta evidencia ****************/
			 
		return plantilla;
			 
		

	} catch (FileNotFoundException e) {
		e.printStackTrace();
	} catch (Docx4JException e) {
		e.printStackTrace();
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	return null;
}

}

package project.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.model.ClientDTO;
import project.model.StaffDTO;
import project.model.UserTypeDTO;
import project.repository.ClientMapper;
import project.repository.UserMapper;
import project.service.interfaces.ClientService;
import project.util.SecretConstants;

@Service
public class ClientServiceImpl implements ClientService{

	@Autowired
	ClientMapper clientMapper;
	@Autowired
	UserMapper userMapper;
	
	@Override
	public List<ClientDTO> getClientsAdmin() {
		List<ClientDTO> clients = clientMapper.getClientsAdmin();
		List<ClientDTO> indicators = clientMapper.getIndicatorsAdmin();
		clients = clients.stream()
				.map(x -> x.setIndicators( indicators.stream().filter(y -> y.getId().equals(x.getId())).findFirst().get() ) )
				.collect(Collectors.toList());
		return clients;
	}

	@Override
	public void insertClient(ClientDTO client) {
		client.getUser().setType(new UserTypeDTO(3));
		userMapper.insertUser(client.getUser());
		client.getUser().setId(userMapper.getMaxIdUser());
		clientMapper.insertClient(client);
	}
	@Override
	public void updateClient(ClientDTO client) {
		userMapper.updateUser(client.getUser());
		clientMapper.updateClient(client);
	}
	@Override
	public void deleteClient(ClientDTO client) {
		ClientDTO clientDelete = clientMapper.getClientById(client);
		clientDelete.setReasonDismiss(client.getReasonDismiss());
		
		clientMapper.deleteAllInterview(client);
		clientMapper.deleteAllResume(client);
		
		clientMapper.deleteClient(client);
		prepareMailDeleteClient(clientDelete);
		
		userMapper.deleteUser(client.getUser());
	
	}
	public String getEmailBodyDeleteClient(ClientDTO client){
		return "<html>"
		 		+ "<head>"
		 		+ "	<style>"
		 		+ ".table-simple>tbody>tr>td{"
		 		+ "border-top:none; "
		 		+ "border-left:none ; border-right: none"
		 		+ "}"
		 		+"	table{"
		 		+ "	width: 90%;"
		 		+ "	}"
		 		+ " table>tbody>tr>td{"
		 		+ "	border: 1px solid black;"
		 		+ "}"
		 		+ "img{"
		 		+ "height: 60px;"
		 		+ "}"
		 		+ ".label{" + 
		 		"	font-size: 20px;" + 
		 		"	color: #33a6a6;" + 
		 		"	font-family: Arial,Helvetica,sans-serif;" + 
		 		"	font-weight: bold;" + 
		 		"}"	
		 		+ "	</style>"
		 		+ "</head>"
		 		+ "<body>"
		 		+ "<table style='width:700px; /*background-color:#eff0f0;*/ border: 1px solid #adb1af;"
		 			+ "border-top: 25px solid #56bdb3; border-left: 25px solid #56bdb3;"
		 			+ "border-right: 25px solid #56bdb3;' align='center' cellspacing='0' cellpadding='0'>"
		 		+ "<tbody>"
		 			+ "<tr>"
			 			+ "<td style='background-color:white; border-bottom: 2px solid #0c8bf7; border: none;"
			 				+ "padding: 10px 0px 10px 10px;/*border-bottom: 2px solid #0c8bf7;*/'>"
			 				//+"<a href='www.gosst.io' alt='logo2' border='0'><img src='https://image.ibb.co/fmbdvv/gosst_Logo.png' alt='logo2' border='0'></a>"
			 				+"<a href='https://www.getinterviews.com/' alt='logo2' border='0' style='zoom:150%'><img style='height: 60px' src='https://www.getinterviews.com/templates/jsn_getinterviews/images/logo.png' alt='logoGetInter' border='0'></a>"
				 			+ " "
			 			+ "</td>"
		 			+ "</tr>" 
		 			+ "<tr>"
			 			+ "<td style='    padding-top: 0px;padding-bottom: 16px;    border: none;    padding-left: 20px;'>"
			 			+ "<div style='" + 
			 			"    border-top: 2px solid #0c8bf7;" + 
			 			"    margin-left: 0%;" + 
			 			"    margin-right: 3%;" + 
			 			"'> <br> </div>"
			 			+ "<span style=' font-size: 24px;   color: #6c6c6c;    font-family: Arial,Helvetica,sans-serif; font-weight: bold;'>"
			 			+"Dear client "+client.getUser().getFirstName()
			 			+"</span>"
			 			 + "</td>"
		 			 + "</tr>" 
		 			+ "<tr>"
		 			+ "<td style='padding-top: 12px; padding-bottom: 24px;    border: none;    padding-left: 20px;'>"
		 			+"<span style='font-size: 17px;color: #6c6c6c;font-family: Arial,Helvetica,sans-serif;font-weight: 700;'>"
		 			+ "We are sorry to inform you that we can no longer provide you our services.<br>"
		 			+ "<u>Reason</u> : "+client.getReasonDismiss()
		 			+"<br><br>Hope the best for you in your upcoming projects:<br><br>The GetInterviews teams"
		 			+"</span>"
		 			 + "</td>"
		 			 + "</tr>" 
		 			+ "<tr>"
		 			+ "<td style='background-color: #0c8bf7;padding-top: 10px;padding-bottom: 10px;    padding-left: 20px;    border: none;'>"
		 			+"<span style='color: #10412f;font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif;'>"
		 			+ "©GetInterviews all rights reserved"
		 			+"</span>" 
		 			+ "</td>"
		 			 + "</tr>" 
		 		+ "</tbody>"
		 		+ "</table>"
		 		+ "" 
		 		
		 		+ "</body>"
		 		+ ""
		 		+ "</html>";
	}
	
	public void prepareMailDeleteClient(ClientDTO client)  {
		   String FROM = SecretConstants.MAIL;
		      String FROMNAME = "GetInterviews"; 
		       String SMTP_USERNAME = SecretConstants.USER; 
		       String SMTP_PASSWORD = ""+SecretConstants.PASS;
		      String HOST = "email-smtp.us-west-2.amazonaws.com"; 
		       int PORT = 587;
	    String TO = client.getUser().getEmail();
	      String SUBJECT = "Dismiss from GetInterviews services";
	      String CuerpoFinal=getEmailBodyDeleteClient(client);
	      Properties props = System.getProperties();
	    	props.put("mail.transport.protocol", "smtp");
	    	props.put("mail.smtp.port", PORT); 
	    	props.put("mail.smtp.starttls.enable", "true");
	    	props.put("mail.smtp.auth", "true");
	    	Session session = Session.getDefaultInstance(props);
	        MimeMessage msg = new MimeMessage(session);
	        
	        try {
				msg.setFrom(new InternetAddress(FROM,FROMNAME));
		        msg.setRecipient(Message.RecipientType.TO, new InternetAddress(TO));
		        msg.setSubject(SUBJECT);
		        MimeBodyPart texto = new MimeBodyPart();
				texto.setContent(CuerpoFinal, "text/html");
				
				MimeMultipart multiParte = new MimeMultipart();
				multiParte.addBodyPart(texto);
				msg.setContent(multiParte);
 
	            Transport transport = session.getTransport();
	            transport.connect(HOST,PORT, SMTP_USERNAME, SMTP_PASSWORD);
	        	  
	            transport.sendMessage(msg, msg.getAllRecipients());
	            System.out.println("Email sent!"+TO);
			} catch (MessagingException e ) {
				// TODO Auto-generated catch block
	            System.out.println("The email was not sent."+TO+" "+new Date());
	            System.out.println("Error message: " + e.getMessage());
				e.printStackTrace();
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

	}
	@Override
	public List<ClientDTO> getClientsStaff(StaffDTO staff) {
		List<ClientDTO> clients = clientMapper.getClientsStaff(staff);
		List<ClientDTO> indicators = clientMapper.getIndicatorsStaff(staff);
		clients = clients.stream()
				.map(x -> x.setIndicators( indicators.stream().filter(y -> y.getId().equals(x.getId())).findFirst().get() ) )
				.collect(Collectors.toList());
		return clients;
	}

}

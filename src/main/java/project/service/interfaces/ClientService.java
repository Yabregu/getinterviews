package project.service.interfaces;

import java.util.List;

import project.model.ClientDTO;
import project.model.StaffDTO;

public interface ClientService {
public List<ClientDTO> getClientsAdmin();
void insertClient(ClientDTO client);

void updateClient(ClientDTO client);
void deleteClient(ClientDTO client);
public List<ClientDTO> getClientsStaff(StaffDTO staff);
}

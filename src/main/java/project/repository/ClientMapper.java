package project.repository;

import java.util.List;

import project.model.ClientDTO;
import project.model.StaffDTO;

public interface ClientMapper {

void insertClient(ClientDTO client);

void updateClient(ClientDTO client);
void deleteClient(ClientDTO client);

List<ClientDTO> getIndicatorsAdmin();
List<ClientDTO> getClientsAdmin();

void updateClientsNullStaff(StaffDTO staff);

List<ClientDTO> getClientsStaff(StaffDTO staff);

List<ClientDTO> getIndicatorsStaff(StaffDTO staff);

void deleteAllInterview(ClientDTO client);
void deleteAllResume(ClientDTO client);

ClientDTO getClientById(ClientDTO client);
}

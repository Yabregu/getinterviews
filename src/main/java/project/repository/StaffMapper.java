package project.repository;

import java.util.List;

import project.model.StaffDTO;

public interface StaffMapper {

	List<StaffDTO> getStaffs();

	List<StaffDTO> getIndicators();

	void insertStaff(StaffDTO staff);
	void updateStaff(StaffDTO staff);
	void deleteStaff(StaffDTO staff);

}

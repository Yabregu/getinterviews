package project.service.interfaces;

import java.util.List;

import project.model.StaffDTO;

public interface StaffService {

	List<StaffDTO> getStaffs( );
	List<StaffDTO> getStaffsNoIndicators( );

	void insertStaff(StaffDTO staff);

	void updateStaff(StaffDTO staff);
	void deleteStaff(StaffDTO staff);


}

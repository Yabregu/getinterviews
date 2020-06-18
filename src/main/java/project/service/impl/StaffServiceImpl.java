package project.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.model.StaffDTO;
import project.model.UserTypeDTO;
import project.repository.ClientMapper;
import project.repository.StaffMapper;
import project.repository.UserMapper;
import project.service.interfaces.StaffService;

@Service
public class StaffServiceImpl implements StaffService{

	@Autowired
	ClientMapper clientMapper;
	@Autowired
	StaffMapper staffMapper;
	@Autowired
	UserMapper userMapper;

	@Override
	public List<StaffDTO> getStaffs() {
		// TODO Auto-generated method stub
		List<StaffDTO> staffs = staffMapper.getStaffs();
		List<StaffDTO> indicators = staffMapper.getIndicators();
		staffs = staffs.stream()
				.map(x -> x.setIndicators( indicators.stream().filter(y -> y.getId().equals(x.getId())).findFirst().get() ) )
				.collect(Collectors.toList());
		return staffs;
	}
	@Override
	public List<StaffDTO> getStaffsNoIndicators() {
		// TODO Auto-generated method stub
		List<StaffDTO> staffs = staffMapper.getStaffs(); 
		return staffs;
	}

	@Override
	public void insertStaff(StaffDTO staff) {
		// TODO Auto-generated method stub
		staff.getUser().setType(new UserTypeDTO(2));
		userMapper.insertUser(staff.getUser());
		staff.getUser().setId(userMapper.getMaxIdUser());
		staffMapper.insertStaff(staff);
	}
	@Override
	public void updateStaff(StaffDTO staff) {
		// TODO Auto-generated method stub
		userMapper.updateUser(staff.getUser());
		staffMapper.updateStaff(staff);
	}
	@Override
	public void deleteStaff(StaffDTO staff) {
		// TODO Auto-generated method stub
		clientMapper.updateClientsNullStaff(staff);
		staffMapper.deleteStaff(staff);
		userMapper.deleteUser(staff.getUser());
	}

}

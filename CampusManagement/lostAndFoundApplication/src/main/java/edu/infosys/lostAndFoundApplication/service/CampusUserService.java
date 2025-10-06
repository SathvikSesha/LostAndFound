package edu.infosys.lostAndFoundApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.infosys.lostAndFoundApplication.bean.CampusUser;
import edu.infosys.lostAndFoundApplication.dao.CampusUserRepository;

@Service
public class CampusUserService implements UserDetailsService{
	
	@Autowired
	private CampusUserRepository repository;
	
	private String userId;
	private String role;
	private CampusUser user;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		this. user=repository.findById(username).get();
		this.userId=user.getUsername();
		this.role=user.getRole();
		return user;
		
	}
	
	public void save(CampusUser user) {
		repository.save(user);
	}
	
	public String getUserId() {
		return userId;
	}
	
	public String getRole() {
		return role;
	}
	public CampusUser getUser() {
		return user;
	}
	public List<CampusUser> getAllStudents(){
		return repository.getAllStudents();
	}
}

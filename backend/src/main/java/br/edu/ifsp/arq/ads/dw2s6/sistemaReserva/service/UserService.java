package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Permission;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.User;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.PermissionRepository;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PermissionRepository permissionRepository;
	
	public List<User> list() {
		return userRepository.findAll();
	}
	
	public User create(User user) {
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		user.setPermissions(addCommonUserPermissions());
		
		return userRepository.save(user);
	}
	
	public List<Permission> addCommonUserPermissions(){
		List<Permission> permissions = new ArrayList<>();
		
		permissions.add(permissionRepository.findById(1L).get());
		permissions.add(permissionRepository.findById(2L).get());
		permissions.add(permissionRepository.findById(3L).get());
		permissions.add(permissionRepository.findById(4L).get());
		permissions.add(permissionRepository.findById(5L).get());
		permissions.add(permissionRepository.findById(6L).get());
		permissions.add(permissionRepository.findById(7L).get());
		permissions.add(permissionRepository.findById(8L).get());
		permissions.add(permissionRepository.findById(9L).get());
		permissions.add(permissionRepository.findById(10L).get());
		permissions.add(permissionRepository.findById(11L).get());
		permissions.add(permissionRepository.findById(12L).get());
		permissions.add(permissionRepository.findById(13L).get());
		permissions.add(permissionRepository.findById(14L).get());
		permissions.add(permissionRepository.findById(15L).get());
		
		return permissions;
	}
	
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}
	
	public void deleteById(Long id) {
		userRepository.deleteById(id);
	}

	public User update(Long id, User user) {
		User userSaved = findUserById(id);
		BeanUtils.copyProperties(user, userSaved, "id");
		return userRepository.save(userSaved);		
	}
	
	public User findUserById(Long id) {
		User userSaved = userRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return userSaved;
	}
}
package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.User;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UserResource {
	@Autowired
	private UserService userService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_USER') and hasAuthority('SCOPE_read')")
	public List<User> list() {
		return userService.list();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_USER') and hasAuthority('SCOPE_write')")
	public User create(@Valid @RequestBody User user, HttpServletResponse response) {
		return userService.create(user);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_SEARCH_USER') and hasAuthority('SCOPE_read')")
	public ResponseEntity<User> findById(@PathVariable Long id) {
		Optional<User> user = userService.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_USER') and hasAuthority('SCOPE_write')")
	public void remove(@PathVariable Long id) {
		userService.deleteById(id);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_USER') and hasAuthority('SCOPE_write')")
	public ResponseEntity<User> update(@PathVariable Long id, @Valid @RequestBody User user) {
		User userSaved = userService.update(id, user);
		return ResponseEntity.ok(userSaved);
	}
}
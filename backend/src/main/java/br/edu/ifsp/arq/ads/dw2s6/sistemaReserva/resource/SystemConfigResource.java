package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.SystemConfig;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.SystemConfigRepository;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service.SystemConfigService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/config_system")
public class SystemConfigResource {

	@Autowired
	private SystemConfigRepository systemConfigRepository;
	
	@Autowired
	private SystemConfigService systemConfigService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_CONFIG') and hasAuthority('SCOPE_read')")
	public List<SystemConfig> list(){
		return systemConfigRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_CONFIG') and hasAuthority('SCOPE_write')")
	public SystemConfig create(@Valid @RequestBody SystemConfig systemConfig, HttpServletResponse response) {
		return systemConfigRepository.save(systemConfig);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_SEARCH_CONFIG') and hasAuthority('SCOPE_read')")
	public ResponseEntity<SystemConfig> findById(@PathVariable Long id){
		Optional<SystemConfig> systemConfig = systemConfigRepository.findById(id);
        return systemConfig.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_CONFIG') and hasAuthority('SCOPE_write')")
	public void remove(@PathVariable Long id) {
		systemConfigRepository.deleteById(id);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_CONFIG') and hasAuthority('SCOPE_write')")
	public ResponseEntity<SystemConfig> update(@PathVariable Long id, @Valid @RequestBody SystemConfig systemConfig) {
		SystemConfig systemConfigSaved = systemConfigService.update(id, systemConfig);
		return ResponseEntity.ok(systemConfigSaved);
	}
}

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

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Resource;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.ResourceRepository;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service.ResourceService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/recursos")
public class ResourceResource {
	
	@Autowired
	private ResourceRepository resourceRepository;
	
	@Autowired
	private ResourceService resourceService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_RESOURCE') and hasAuthority('SCOPE_read')")
	public List<Resource> list(){
		return resourceRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_RESOURCE') and hasAuthority('SCOPE_write')")
	public Resource create(@Valid @RequestBody Resource resource, HttpServletResponse response) {
		return resourceRepository.save(resource);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_RESOURCE') and hasAuthority('SCOPE_read')")
	public ResponseEntity<Resource> findById(@PathVariable Long id){
		Optional<Resource> resource = resourceRepository.findById(id);
		if(resource.isPresent()) {
			return ResponseEntity.ok(resource.get());
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_RESOURCE') and hasAuthority('SCOPE_write')")
	public void remove(@PathVariable Long id) {
		resourceRepository.deleteById(id);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_RESOURCE') and hasAuthority('SCOPE_write')")
	public ResponseEntity<Resource> update(@PathVariable Long id, @Valid @RequestBody Resource resource) {
		Resource recursoSaved = resourceService.update(id, resource);
		return ResponseEntity.ok(recursoSaved);
	}
}

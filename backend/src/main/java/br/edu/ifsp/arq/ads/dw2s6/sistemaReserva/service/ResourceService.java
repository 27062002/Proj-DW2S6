package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Resource;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.ResourceRepository;

@Service
public class ResourceService {

	@Autowired
	private ResourceRepository resourceRepository;
	
	public Resource update(Long id, Resource resource) {
		Resource recursoSaved = findRecursoById(id);
		BeanUtils.copyProperties(resource, recursoSaved, "id");
		return resourceRepository.save(recursoSaved);
	}
	
	public Resource findRecursoById(Long id) {
		Resource recursoSaved = resourceRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return recursoSaved;
	}
}

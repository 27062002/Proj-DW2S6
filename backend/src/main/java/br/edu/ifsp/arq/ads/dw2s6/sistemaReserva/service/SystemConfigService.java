package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.SystemConfig;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.SystemConfigRepository;

@Service
public class SystemConfigService {

	@Autowired
	private SystemConfigRepository systemConfigRepository;
	
	public SystemConfig update(Long id, SystemConfig systemConfig) {
		SystemConfig systemConfigSaved = findsystemConfigById(id);
		BeanUtils.copyProperties(systemConfig, systemConfigSaved, "id");
		return systemConfigRepository.save(systemConfigSaved );
	}
	
	public SystemConfig findsystemConfigById(Long id) {
		SystemConfig systemConfigSaved = systemConfigRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return systemConfigSaved;
	}
}

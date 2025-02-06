package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model;

public enum ResourceType {

	SALA("Sala"),
	EQUIPAMENTO("Equipamento"),
	OUTRO("Outro");
	
	private String description;
	
	private ResourceType(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}

}


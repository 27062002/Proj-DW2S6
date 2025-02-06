package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model;

public enum Type {

	SALA("Sala"),
	EQUIPAMENTO("Equipamento"),
	OUTRO("Outro");
	
	private String description;
	
	private Type(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}

}


package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model;

public enum UserType {
	DOCENTE("Docente"),
	DISCENTE("Discente");
	
	private String description;
	
	private UserType(String description) {
		this.description = description;
	}
	
	public String getDescricao() {
		return description;
	}
}
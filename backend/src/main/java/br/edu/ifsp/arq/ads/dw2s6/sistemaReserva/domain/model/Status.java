package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model;

public enum Status {

	EMUSO("Em uso"),
	LIVRE("Livre"),
	OUTRO("Outro");
	
	private String description;
	
	private Status(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}

}

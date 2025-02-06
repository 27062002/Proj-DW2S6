package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.filter;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class BookingFilter {
	
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime initialDate;
	
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime finalDate;

	public LocalDateTime getInitialDate() {
		return initialDate;
	}

	public void setInitialDate(LocalDateTime initialDate) {
		this.initialDate = initialDate;
	}

	public LocalDateTime getFinalDate() {
		return finalDate;
	}

	public void setFinalDate(LocalDateTime finalDate) {
		this.finalDate = finalDate;
	}
}

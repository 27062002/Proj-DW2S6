package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.booking;

import java.util.List;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Booking;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.filter.BookingFilter;

public interface BookingRepositoryQuery {
	
	public List<Booking> filter(BookingFilter bookingFilter);
	
}

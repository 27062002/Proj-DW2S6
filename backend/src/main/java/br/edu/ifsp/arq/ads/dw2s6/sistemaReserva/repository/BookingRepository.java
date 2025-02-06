package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Booking;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Resource;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.booking.BookingRepositoryQuery;

public interface BookingRepository extends JpaRepository<Booking, Long>, BookingRepositoryQuery {
	public List<Booking> findByResource(Resource resource);
}

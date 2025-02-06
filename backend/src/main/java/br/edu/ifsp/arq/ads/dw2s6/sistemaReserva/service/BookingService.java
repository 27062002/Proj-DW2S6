package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Booking;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.BookingRepository;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.filter.BookingFilter;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepository;
	
	public Booking update(Long id, Booking booking) {
		Booking bookingSaved = findReservaById(id);
		BeanUtils.copyProperties(booking, bookingSaved, "id");
		return bookingRepository.save(bookingSaved);
	}
	
	public Booking findReservaById(Long id) {
		Booking bookingSaved = bookingRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return bookingSaved;
	}
	
	public Booking create(Booking booking) {		
		return bookingRepository.save(booking);
	}

	public List<Booking> search(BookingFilter bookingFilter) {
		return bookingRepository.filter(bookingFilter);
	}
}

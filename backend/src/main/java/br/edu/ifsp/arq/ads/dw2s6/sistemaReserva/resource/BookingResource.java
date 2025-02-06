package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.resource;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Booking;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.BookingRepository;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.filter.BookingFilter;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service.BookingService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/reservas")
public class BookingResource {

	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private BookingService bookingService;
	
	@GetMapping
	public List<Booking> all(){
		return bookingRepository.findAll();
	}
	
	@GetMapping("/search")
	public List<Booking> search(LocalDateTime startDate, LocalDateTime endDate){
		BookingFilter bookingFilter = new BookingFilter();
		bookingFilter.setInitialDate(startDate);
		bookingFilter.setFinalDate(endDate);
		
		return bookingService.search(bookingFilter);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_BOOKING') and hasAuthority('SCOPE_write')")
	public Booking create(@Valid @RequestBody Booking booking, HttpServletResponse response) {
		return bookingRepository.save(booking);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_BOOKING') and hasAuthority('SCOPE_read')")
	public ResponseEntity<Booking> findById(@PathVariable Long id){
		Optional<Booking> booking = bookingRepository.findById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_BOOKING') and hasAuthority('SCOPE_write')")
	public void remove(@PathVariable Long id) {
		bookingRepository.deleteById(id);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_BOOKING') and hasAuthority('SCOPE_write')")
	public ResponseEntity<Booking> update(@PathVariable Long id, @Valid @RequestBody Booking booking) {
		Booking bookingSaved = bookingService.update(id, booking);
		return ResponseEntity.ok(bookingSaved);
	}
}

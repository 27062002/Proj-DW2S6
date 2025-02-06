package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.resource;

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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Ticket;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.TicketRepository;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service.TicketService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/chamados")
public class TicketResource {
	@Autowired
	private TicketRepository ticketRepository;
	
	@Autowired
	private TicketService ticketService;
	
	@PostMapping("/criar-chamado")
    public ResponseEntity<String> criarChamado(@RequestBody Ticket ticket) {
        try {
			ticketService.createTicket(ticket.getProblem(), ticket.getProblem());

            return ResponseEntity.status(201).body("Chamado criado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao criar chamado.");
        }
    }
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_TICKET') and hasAuthority('SCOPE_read')")
	public List<Ticket> list(){
		return ticketRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_TICKET') and hasAuthority('SCOPE_write')")
	public Ticket create(@Valid @RequestBody Ticket booking, HttpServletResponse response) {
		return ticketRepository.save(booking);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_TICKET') and hasAuthority('SCOPE_read')")
	public ResponseEntity<Ticket> findById(@PathVariable Long id){
		Optional<Ticket> called = ticketRepository.findById(id);
        return called.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_TICKET') and hasAuthority('SCOPE_write')")
	public void remove(@PathVariable Long id) {
		ticketRepository.deleteById(id);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_TICKET') and hasAuthority('SCOPE_write')")
	public ResponseEntity<Ticket> update(@PathVariable Long id, @Valid @RequestBody Ticket called) {
		Ticket calledSaved = ticketService.update(id, called);
		return ResponseEntity.ok(calledSaved);
	}
}

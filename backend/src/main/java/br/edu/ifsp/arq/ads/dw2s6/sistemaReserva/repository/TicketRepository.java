package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long>{

}

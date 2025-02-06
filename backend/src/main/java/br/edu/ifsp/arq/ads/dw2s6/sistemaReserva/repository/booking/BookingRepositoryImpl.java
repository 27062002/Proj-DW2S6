package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.booking;

import java.util.ArrayList;
import java.util.List;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Booking;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.filter.BookingFilter;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class BookingRepositoryImpl implements BookingRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;
	
	@Override
	public List<Booking> filter(BookingFilter bookingFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Booking> criteria = builder.createQuery(Booking.class);
		Root<Booking> root = criteria.from(Booking.class);
		
		Predicate[] predicates = createConstraints(bookingFilter, builder, root);
		criteria.where(predicates);
		
		TypedQuery<Booking> query = manager.createQuery(criteria);
		return query.getResultList();
	}
	
	private Predicate[] createConstraints(BookingFilter bookingFilter, CriteriaBuilder builder, Root<Booking> root) {
		List<Predicate> predicates = new ArrayList<>();
		
		if (bookingFilter.getInitialDate() != null) {
			predicates.add(
					builder.greaterThanOrEqualTo(root.get("start_date"), bookingFilter.getInitialDate()));
		}
		
		if (bookingFilter.getFinalDate() != null) {
			predicates.add(
					builder.lessThanOrEqualTo(root.get("end_date"), bookingFilter.getFinalDate()));
		}
		
		return predicates.toArray(new Predicate[predicates.size()]);
	}

}

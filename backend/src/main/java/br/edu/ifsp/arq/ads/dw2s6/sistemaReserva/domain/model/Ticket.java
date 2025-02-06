package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model;

import java.time.LocalDate;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "ticket")
public class Ticket {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "open_date")
	@JsonFormat(pattern =  "dd/MM/yyyy")
	private LocalDate open_date;
	@NotNull
	@Size(max = 100)
	private String problem;
//	@Size(min = 3, max = 45)
//	@Enumerated(EnumType.STRING)
//	private Status status;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user_id;
	@ManyToOne
	@JoinColumn(name = "resource_id")
	private Resource resource_id;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getOpen_date() {
		return open_date;
	}
	public void setOpen_date(LocalDate open_date) {
		this.open_date = open_date;
	}
	public String getProblem() {
		return problem;
	}
	public void setProblem(String problem) {
		this.problem = problem;
	}
	public User getUser_id() {
		return user_id;
	}
	public void setUser_id(User user_id) {
		this.user_id = user_id;
	}
	public Resource getResource_id() {
		return resource_id;
	}
	public void setResource_id(Resource resource_id) {
		this.resource_id = resource_id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Ticket other = (Ticket) obj;
		return Objects.equals(id, other.id);
	}
}

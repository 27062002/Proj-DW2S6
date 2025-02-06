package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.domain.model.Ticket;
import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.repository.TicketRepository;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    private final WebClient webClient;

    @Value("${glpi.app.token}")
    private String appToken;

    @Value("${glpi.user.token}")
    private String userToken;

    public TicketService(WebClient.Builder webClientBuilder, @Value("${glpi.url}") String url) {
        this.webClient = webClientBuilder.baseUrl(url).build();
    }

    public Ticket update(Long id, Ticket called) {
        Ticket calledSaved = findCalledById(id);
        BeanUtils.copyProperties(called, calledSaved, "id");
        return ticketRepository.save(calledSaved);
    }

    public Ticket findCalledById(Long id) {
        return ticketRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
    }

    public void createTicket(String titulo, String descricao) {
        String jsonBody = "{\n" +
                "  \"input\": {\n" +
                "    \"name\": \"" + titulo + "\",\n" +
                "    \"content\": \"" + descricao + "\"\n" +
                "  }\n" +
                "}";

        try {
            var sessionToken = getSessionToken();
            System.out.println("Session token: " + sessionToken);
            this.webClient.post()
                    .uri(uriBuilder -> uriBuilder.path("/Ticket").queryParam("app_token", appToken).queryParam("session_token", sessionToken).build())
                    .header(HttpHeaders.CONTENT_TYPE, "application/json")
                    .bodyValue(jsonBody)
                    .retrieve().toEntity(TicketResponse.class).block();
        } catch (WebClientResponseException e) {
            System.out.println(e.getStatusCode());
            System.out.println(e.getResponseBodyAsString());
            throw e;
        } catch (Exception e) {
            System.out.println("Default exception " + e.getMessage());
            throw e;
        }
    }

    private String getSessionToken() {
        try {
            var response = this.webClient.post()
                    .uri(uriBuilder -> uriBuilder.path("/initSession").queryParam("app_token", appToken).build())
                    .header(HttpHeaders.AUTHORIZATION, "user_token " + userToken)
                    .retrieve()
                    .toEntity(SessionResponse.class).block();

            return response != null && response.getBody() != null ? response.getBody().getSessionToken() : null;
        } catch (WebClientResponseException e) {
            System.out.println(e.getStatusCode());
            System.out.println(e.getResponseBodyAsString());
            throw e;
        }
    }

    public static class SessionResponse {
        String session_token;

        public String getSessionToken() {
            return session_token;
        }

        public void setSession_token(String session_token) {
            this.session_token = session_token;
        }
    }

    public static class TicketResponse {
        String id;
        String message;

        public String getId() {
            return id;
        }

        public String getMessage() {
            return message;
        }

        public void setId(String id) {
            this.id = id;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}

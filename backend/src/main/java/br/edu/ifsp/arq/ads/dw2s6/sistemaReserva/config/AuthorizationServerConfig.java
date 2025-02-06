package br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.config;

import java.io.InputStream;
import java.security.KeyStore;
import java.time.Duration;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import br.edu.ifsp.arq.ads.dw2s6.sistemaReserva.security.SystemUser;

@Configuration
public class AuthorizationServerConfig {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CorsConfig corsConfig;

	@Value("${application.authorization-server.allowed-redirects}")
	private String allowedRedirects;

	@Bean
	RegisteredClientRepository registeredClientRepository() {
		List<String> redirects = Arrays.asList(allowedRedirects.split(","));

		RegisteredClient angularClient = RegisteredClient.withId(UUID.randomUUID().toString()).clientId("angular")
				.clientSecret(passwordEncoder.encode("@ngul@r0"))
				.clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
				.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
				.authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
				.redirectUris(uris -> uris.addAll(redirects)).scope("read").scope("write")
				.tokenSettings(TokenSettings.builder().accessTokenTimeToLive(Duration.ofMinutes(30))
						.refreshTokenTimeToLive(Duration.ofDays(30)).build())
				.clientSettings(ClientSettings.builder().requireAuthorizationConsent(false).build()).build();

		return new InMemoryRegisteredClientRepository(Collections.singletonList(angularClient));
	}

	@Bean
	@Order(Ordered.HIGHEST_PRECEDENCE)
	SecurityFilterChain authServerFilterChain(HttpSecurity http) throws Exception {
		OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

		return http.cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
				.csrf(AbstractHttpConfigurer::disable).formLogin(Customizer.withDefaults()).build();
	}

	@Bean
	OAuth2TokenCustomizer<JwtEncodingContext> jwtBuildCustomizer() {
		return (context) -> {
			UsernamePasswordAuthenticationToken authenticationToken = context.getPrincipal();
			SystemUser systemUser = (SystemUser) authenticationToken.getPrincipal();

			Set<String> authorities = new HashSet<>();
			for (GrantedAuthority grantedAuthority : systemUser.getAuthorities()) {
				authorities.add(grantedAuthority.getAuthority());
			}

			context.getClaims().claim("name", systemUser.getUser().getName());
			context.getClaims().claim("authorities", authorities);
		};
	}

	@Bean
    JWKSet jwkSet() throws Exception {
    	final InputStream inputStream  = new ClassPathResource("keystore/sistemaReserva.jks").getInputStream();
    	
    	
    	final KeyStore keyStore = KeyStore.getInstance("JKS");
        keyStore.load(inputStream, "123456".toCharArray());
    			
        RSAKey rsaKey = RSAKey.load(
        		keyStore, 
        		"sistemaReserva",
        		"123456".toCharArray()
        );

        return new JWKSet(rsaKey);
    }

	@Bean
	JWKSource<SecurityContext> jwkSource(JWKSet jwkSet) {
		return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
	}

	@Bean
	JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
		return new NimbusJwtEncoder(jwkSource);
	}

	@Bean
	AuthorizationServerSettings providerSettings() {
		return AuthorizationServerSettings.builder().issuer("http://localhost:8080").build();
	}

}

package org.kim.market.security;

import org.kim.market.jwt.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;

@Configuration // Marks this class as a Spring security configuration
@EnableWebSecurity // Enables Spring Security
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    // Injects JwtUtil for handling JWT operations
    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean // Defines a password encoder using BCrypt
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean // Configures security filters and authorization rules
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationConverter jwtAuthenticationConverter) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Disables CSRF protection for stateless authentication
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // Restricts admin routes to ADMIN role
                        .requestMatchers("/api/auth/login", "/api/auth/signup").permitAll() // Allows public access to login/signup
                        .requestMatchers("/api/auth/admin/signup").permitAll() // Allows admin signup
                        .requestMatchers(HttpMethod.POST, "/api/clients").permitAll() // Allows adding clients
                        .requestMatchers("/actuator/health").permitAll() // Allows health check access
                        .anyRequest().authenticated() // Requires authentication for all other endpoints
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Uses stateless session management
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter)) // Configures JWT authentication
                )
                .build();
    }

    @Bean // Configures JWT decoder using the signing key from JwtUtil
    public JwtDecoder jwtDecoder() {
        SecretKey key = jwtUtil.getSigningKey();
        return NimbusJwtDecoder.withSecretKey(key).build();
    }

    @Bean // Converts JWT claims into authentication objects
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        return new JwtAuthenticationConverter();
    }
}

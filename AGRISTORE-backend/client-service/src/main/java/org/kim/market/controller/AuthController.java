package org.kim.market.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.kim.market.entity.Client;
import org.kim.market.entity.Role;
import org.kim.market.jwt.JwtUtil;
import org.kim.market.repository.ClientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final ClientRepository clientRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(ClientRepository clientRepository, JwtUtil jwtUtil) {
        this.clientRepository = clientRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtUtil = jwtUtil;
    }

    // ✅ Register a Client
    @PostMapping("/signup")
    public ResponseEntity<Client> registerClient(@RequestBody Client client) {
        if (clientRepository.findByEmail(client.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        client.setRoles(Collections.singletonList(Role.CLIENT));
        return ResponseEntity.ok(clientRepository.save(client));
    }

    // ✅ Register an Admin
    @PostMapping("/admin/signup")
    public ResponseEntity<Client> registerAdmin(@RequestBody Client admin) {
        if (clientRepository.findByEmail(admin.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        // ✅ Store roles as List<Role>
        admin.setRoles(List.of(Role.ADMIN));

        return ResponseEntity.ok(clientRepository.save(admin));
    }


    // ✅ Login with JWT Authentication
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Client loginRequest) {
        System.out.println("DEBUG - Received Login Request: " + loginRequest);

        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            System.out.println("❌ DEBUG - Email or password is null!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email and password are required!"));
        }

        Optional<Client> clientOpt = clientRepository.findByEmail(loginRequest.getEmail());

        if (clientOpt.isPresent()) {
            Client client = clientOpt.get();
            System.out.println("DEBUG - Found Client: " + client.getEmail());

            if (client.getPassword() == null) {
                System.out.println("❌ DEBUG - Stored password is NULL for: " + client.getEmail());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Stored password is missing"));
            }

            boolean passwordMatches = passwordEncoder.matches(loginRequest.getPassword(), client.getPassword());
            System.out.println("DEBUG - Password Matches: " + passwordMatches);

            if (passwordMatches) {
                List<String> roles = client.getRoles().stream()
                        .map(Enum::name)
                        .toList();

                String token = jwtUtil.generateToken(client.getEmail(), roles.toString());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("email", client.getEmail());
                response.put("role", roles);
                response.put("clientId", client.getId());

                return ResponseEntity.ok(response);
            } else {
                System.out.println("❌ DEBUG - Password does not match for: " + loginRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
            }
        }

        System.out.println("❌ DEBUG - Email not found: " + loginRequest.getEmail());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }

}




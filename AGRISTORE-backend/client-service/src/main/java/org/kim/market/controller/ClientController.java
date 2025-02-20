package org.kim.market.controller;

import org.kim.market.entity.Client;
import org.kim.market.repository.ClientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    public ClientController(ClientRepository clientRepository , PasswordEncoder passwordEncoder) {
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // Get all clients
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(clientRepository.findAll());
    }

    // Get client by ID
    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Integer id) {
        Optional<Client> client = clientRepository.findById(id);
        return client.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Modify createClient method
    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        if (clientRepository.findByEmail(client.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build(); // Avoid duplicate emails
        }

        // Ensure password is hashed before saving
        client.setPassword(passwordEncoder.encode(client.getPassword()));

        Client savedClient = clientRepository.save(client);
        return ResponseEntity.ok(savedClient);
    }

    // Modify a client
    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody Client clientDetails) {
        return clientRepository.findById(id).map(client -> {
            client.setFirstName(clientDetails.getFirstName());
            client.setLastName(clientDetails.getLastName());
            client.setEmail(clientDetails.getEmail());
            client.setAdresse(clientDetails.getAdresse());

            // Ensure roles are updated
            client.setRoles(clientDetails.getRoles());

            Client updatedClient = clientRepository.save(client);
            return ResponseEntity.ok(updatedClient);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }


    // Delete a client
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        if (clientRepository.existsById(id)) {
            clientRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //Get client by email
    @GetMapping("/by-email/{email}")
    public ResponseEntity<Client> getClientByEmail(@PathVariable String email) {
        Optional<Client> client = clientRepository.findByEmail(email);
        return client.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}

package org.kim.market.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Base64;

@Component // Marks this class as a Spring-managed bean
public class JwtUtil {
    private static final String SECRET_KEY = "Nm9IbGFsZ3FqblN3OEtWTG1GSm1YV05ScDg0UzA3M0E="; // Base64-encoded secret key

    // Returns the signing key for JWT using HMAC SHA-256
    public SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    // Generates a JWT token with email and roles, valid for 1 hour
    public String generateToken(String email, String roles) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1-hour expiration
                .claim("roles", roles) // Stores roles as a string
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extracts claims (payload) from the JWT token
    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Extracts roles from the JWT token
    public List<String> extractRoles(String token) {
        return extractClaims(token).get("roles", List.class);
    }
}

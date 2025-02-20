package org.kim.market.controller;

import org.kim.market.entity.Payment;
import org.kim.market.repository.PaymentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    private final PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        try {
            logger.info("🔹 Received Payment Request: {}", payment);

            // ✅ Process Payment (No Client/Product Validation Needed)
            Payment savedPayment = paymentRepository.save(payment);
            logger.info("✅ Payment processed successfully: {}", savedPayment);

            return ResponseEntity.ok(savedPayment);
        } catch (Exception e) {
            logger.error("❌ Error processing payment: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        logger.info("📃 Returning {} payments", payments.size());
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Integer id) {
        return paymentRepository.findById(id)
                .map(payment -> {
                    logger.info("✅ Found payment with ID: {}", id);
                    return ResponseEntity.ok(payment);
                })
                .orElseGet(() -> {
                    logger.warn("❌ Payment with ID {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }
}

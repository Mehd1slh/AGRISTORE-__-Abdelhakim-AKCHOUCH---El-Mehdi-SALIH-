package org.kim.market.kafka;

import org.kim.market.entity.Payment;
import org.kim.market.entity.PaymentStatus;
import org.kim.market.repository.PaymentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentConsumer {
    private static final Logger logger = LoggerFactory.getLogger(PaymentConsumer.class);
    private final PaymentRepository paymentRepository;

    public PaymentConsumer(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @KafkaListener(topics = "order-events", groupId = "payment-group")
    public void processPayment(OrderEvent orderEvent) {
        logger.info("🔹 Processing payment for order: {}", orderEvent.getOrderId());

        // ✅ Directly create payment from event data (No need to call Client/Product services again)
        Payment payment = Payment.builder()
                .orderId(orderEvent.getOrderId())
                .clientId(orderEvent.getClientId())
                .amount(orderEvent.getAmount())
                .status(PaymentStatus.SUCCESS) // ✅ Assume success for now
                .paymentDate(LocalDateTime.now())
                .build();

        paymentRepository.save(payment);
        logger.info("✅ Payment processed successfully: {}", payment);

        // ✅ Send Payment Confirmation (Optional: Implement Kafka event for order confirmation)
        sendPaymentConfirmation(orderEvent);
    }

    private void sendPaymentConfirmation(OrderEvent orderEvent) {
        logger.info("🔹 Sending payment confirmation for order: {}", orderEvent.getOrderId());
        // Implement Kafka Producer to notify Order Service about payment success
    }
}

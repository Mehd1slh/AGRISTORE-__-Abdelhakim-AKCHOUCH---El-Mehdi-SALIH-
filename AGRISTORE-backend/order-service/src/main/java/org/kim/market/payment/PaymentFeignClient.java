package org.kim.market.payment;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "PAYMENT-SERVICE")
public interface PaymentFeignClient {
    @PostMapping("/api/payments")
    ResponseEntity<Payment> processPayment(@RequestBody Payment payment);
}

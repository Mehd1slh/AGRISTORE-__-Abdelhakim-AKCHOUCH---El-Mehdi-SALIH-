package org.kim.market.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Payment {
    private Integer orderId;
    private Integer clientId;
    private Integer productId;
    private BigDecimal amount;
    private String status; // Optional: "PENDING", "SUCCESS", "FAILED"
    private LocalDateTime paymentDate;
}

package org.kim.market.kafka;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import org.kim.market.entity.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
public class OrderEvent {

    private Integer orderId;
    private Integer clientId;
    private BigDecimal amount;
    private PaymentStatus status;
    private LocalDateTime paymentDate;
}

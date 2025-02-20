package org.kim.market.kafka;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderEvent {
    private Integer orderId;
    private Integer clientId;
    private Integer productId;
    private Integer quantity;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
    private String orderStatus; // ✅ Can be "PENDING", "CONFIRMED", etc.
}

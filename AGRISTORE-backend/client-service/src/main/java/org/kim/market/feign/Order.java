package org.kim.market.feign;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
public class Order {
    private Integer id;
    private Integer clientId;
    private Integer productId;
    private Integer quantity;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
}

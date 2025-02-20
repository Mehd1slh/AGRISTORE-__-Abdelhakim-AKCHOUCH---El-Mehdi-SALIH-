package org.kim.market.product;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
public class Product {
    private Integer id;
    private String name;
    private String description;
    private double availableQuantity;
    private BigDecimal price;

}

package org.kim.market.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.kim.market.client.Client;
import org.kim.market.product.Product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private Integer clientId;
    @Transient
    private Client client;

    @NotNull
    private Integer productId;
    @Transient
    private Product product;

    @NotNull
    @Min(value = 1)
    private Integer quantity;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
    private String status;
}


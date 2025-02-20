package org.kim.market.controller;

import jakarta.validation.Valid;
import org.kim.market.client.ClientFeignClient;
import org.kim.market.entity.Order;
import org.kim.market.product.ProductFeignClient;
import org.kim.market.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    private final OrderRepository orderRepository;
    private final ClientFeignClient clientFeignClient;
    private final ProductFeignClient productFeignClient;

    public OrderController(OrderRepository orderRepository, ClientFeignClient clientFeignClient,
                           ProductFeignClient productFeignClient) {
        this.orderRepository = orderRepository;
        this.clientFeignClient = clientFeignClient;
        this.productFeignClient = productFeignClient;
    }

    //add an order
    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody Order orderRequest) {
        try {
            logger.info("Received order request: {}", orderRequest);

            // ✅ Fetch Client Info with Token
            var client = clientFeignClient.getClientById(orderRequest.getClientId(), token);
            if (client == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Client ID");
            }

            // ✅ Fetch Product Info
            var product = productFeignClient.getProductById(orderRequest.getProductId(), token);
            if (product == null || product.getAvailableQuantity() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product Not Available");
            }

            // ✅ Calculate Total Price
            BigDecimal totalAmount = product.getPrice().multiply(BigDecimal.valueOf(orderRequest.getQuantity()));

            // ✅ Save Order to Database
            Order order = Order.builder()
                    .clientId(client.getId())
                    .productId(product.getId())
                    .quantity(orderRequest.getQuantity())
                    .totalAmount(totalAmount)
                    .orderDate(LocalDateTime.now())
                    .status("PENDING")
                    .build();

            Order savedOrder = orderRepository.save(order);
            logger.info("Order saved successfully: {}", savedOrder);

            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            logger.error("Error while creating order: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected Error");
        }
    }

    //get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return ResponseEntity.ok(orders);
    }
}

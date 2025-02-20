package org.kim.market.controller;

import org.kim.market.feign.Order;
import org.kim.market.feign.OrderFeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')") // only users with ADMIN role can access
public class AdminController {
    private final OrderFeignClient orderFeignClient;

    // Injects the OrderFeignClient dependency via constructor
    public AdminController(OrderFeignClient orderFeignClient) {
        this.orderFeignClient = orderFeignClient;
    }

    @GetMapping("/orders") // Handles GET requests to /api/admin/orders
    public ResponseEntity<List<Order>> getAllOrders(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        // Calls the OrderFeignClient to retrieve all orders with authorization token
        return ResponseEntity.ok(orderFeignClient.getAllOrders(token));
    }
}

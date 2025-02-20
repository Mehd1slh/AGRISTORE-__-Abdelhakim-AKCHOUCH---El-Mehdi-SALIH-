package org.kim.market.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import java.util.List;

@FeignClient(name = "ORDER-SERVICE", path = "/api/orders")
public interface OrderFeignClient {

    @GetMapping
    List<Order> getAllOrders(@RequestHeader("Authorization") String token);
}

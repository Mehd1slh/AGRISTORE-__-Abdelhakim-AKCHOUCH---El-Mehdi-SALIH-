package org.kim.market.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "CLIENT-SERVICE", path = "/api/clients")
public interface ClientFeignClient {

    @GetMapping("/{id}")
    Client getClientById(
            @PathVariable("id") Integer id,
            @RequestHeader("Authorization") String token
    );
}

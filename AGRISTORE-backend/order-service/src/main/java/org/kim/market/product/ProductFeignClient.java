package org.kim.market.product;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "PRODUCT-SERVICE", path = "/api/products")
public interface ProductFeignClient {

    @GetMapping("/{id}")
    Product getProductById(
            @PathVariable("id") Integer id,
            @RequestHeader("Authorization") String token

    );
}
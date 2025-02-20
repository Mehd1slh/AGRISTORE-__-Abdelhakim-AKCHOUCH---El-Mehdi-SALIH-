package org.kim.market.feign;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

@Configuration // Marks this class as a Spring configuration class
public class FeignClientConfig {

    @Bean // Defines a Feign RequestInterceptor bean
    public RequestInterceptor requestInterceptor() {
        return template -> {
            // Retrieves the Authorization token from the current request context
            String token = (String) RequestContextHolder.getRequestAttributes()
                    .getAttribute("Authorization", RequestAttributes.SCOPE_REQUEST);

            // If a token exists, add it to the request header
            if (token != null) {
                template.header("Authorization", token);
            }
        };
    }
}

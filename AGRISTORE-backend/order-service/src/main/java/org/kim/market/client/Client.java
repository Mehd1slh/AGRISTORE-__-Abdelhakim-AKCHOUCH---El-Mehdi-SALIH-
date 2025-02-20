package org.kim.market.client;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
public class Client {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;

}

package org.kim.market.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Adresse {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAdresse;
    private String street;
    private String houseNumber;
    private String zipCode;
}

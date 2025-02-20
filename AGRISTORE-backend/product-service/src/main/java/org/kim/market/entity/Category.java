package org.kim.market.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;
    @Column(unique = true, nullable = false)
    private String name;


}

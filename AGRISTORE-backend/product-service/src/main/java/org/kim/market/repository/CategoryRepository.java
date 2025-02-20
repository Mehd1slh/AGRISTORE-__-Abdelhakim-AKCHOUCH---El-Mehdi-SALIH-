package org.kim.market.repository;

import org.kim.market.entity.Category;
import org.kim.market.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Category findByName(String name);

}

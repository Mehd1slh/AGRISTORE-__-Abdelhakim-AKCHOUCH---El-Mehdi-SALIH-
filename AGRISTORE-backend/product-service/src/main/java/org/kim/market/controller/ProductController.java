package org.kim.market.controller;

import org.kim.market.entity.Category;
import org.kim.market.entity.Product;
import org.kim.market.repository.CategoryRepository;
import org.kim.market.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductController(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new product
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        if (product.getCategory() == null || product.getCategory().getId() == null) {
            return ResponseEntity.badRequest().body("Category ID is required.");
        }

        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Invalid Category ID"));

        Product newProduct = new Product();
        newProduct.setName(product.getName());
        newProduct.setDescription(product.getDescription());
        newProduct.setAvailableQuantity(product.getAvailableQuantity());
        newProduct.setPrice(product.getPrice());
        newProduct.setImageUrl(product.getImageUrl());
        newProduct.setCategory(category); // ✅ Assign category entity

        return ResponseEntity.ok(productRepository.save(newProduct));
    }




    // Update a product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setAvailableQuantity(productDetails.getAvailableQuantity());
            product.setPrice(productDetails.getPrice());
            product.setCategory(productDetails.getCategory());
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.ok(updatedProduct);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


}

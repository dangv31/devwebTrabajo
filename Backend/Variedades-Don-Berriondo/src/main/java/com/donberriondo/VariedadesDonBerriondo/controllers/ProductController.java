package com.donberriondo.VariedadesDonBerriondo.controllers;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestCreateDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestNotifyDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.ProductRequestResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.ProductResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductEntity;
import com.donberriondo.VariedadesDonBerriondo.services.IProductRequestService;
import com.donberriondo.VariedadesDonBerriondo.services.IProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private IProductService productService;
    @Autowired
    private IProductRequestService productRequestService;

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO productDTO) {
        ProductResponseDTO newProduct = productService.saveProduct(productDTO);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductEntity> updateProduct(@PathVariable Long id, @RequestBody ProductEntity productDetails) {
        return productService.updateProduct(id, productDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {

        if (productService.findProductById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/requests")
    public ResponseEntity<Void> createRequest(@Valid @RequestBody ProductRequestCreateDTO requestDTO) {
        productRequestService.createProductRequest(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/requests")
    public ResponseEntity<List<ProductRequestResponseDTO>> getAllRequests() {
        return ResponseEntity.ok(productRequestService.getAllProductRequests());
    }

    @PostMapping("/requests/{id}/notify")
    public ResponseEntity<Void> notifyUser(@PathVariable Long id, @Valid @RequestBody ProductRequestNotifyDTO notifyDTO) {
        productRequestService.notifyUserAndCompleteRequest(id, notifyDTO);
        return ResponseEntity.ok().build();
    }
}

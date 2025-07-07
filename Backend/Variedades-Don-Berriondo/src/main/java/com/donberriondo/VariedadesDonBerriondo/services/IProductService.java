package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.ProductResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductEntity;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<ProductResponseDTO> findAllProducts();
    ProductResponseDTO saveProduct(ProductRequestDTO product);
    Optional<ProductEntity> findProductById(Long id);
    Optional<ProductEntity> updateProduct(Long id, ProductEntity productDetails);
    void deleteProduct(Long id);
}

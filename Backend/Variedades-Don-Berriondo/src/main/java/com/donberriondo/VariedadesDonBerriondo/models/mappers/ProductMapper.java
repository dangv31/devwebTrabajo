package com.donberriondo.VariedadesDonBerriondo.models.mappers;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.ProductResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.CategoryEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductEntity;

public class ProductMapper {

    public static ProductResponseDTO toResponseDTO(ProductEntity product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setDiscount(product.getDiscount());
        dto.setImageRoute(product.getImageRoute());
        if (product.getCategory() != null) {
            dto.setCategoryName(product.getCategory().getName());
        }
        dto.setBestSeller(product.isBestSeller());
        dto.setStock(product.getStock());
        dto.setSales(product.getSales());
        dto.setEnabled(product.isEnabled());
        return dto;
    }

    public static ProductEntity toEntity(ProductRequestDTO dto, CategoryEntity category) {
        ProductEntity product = new ProductEntity();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setDiscount(dto.getDiscount());
        product.setImageRoute(dto.getImageRoute());
        product.setCategory(category);
        product.setStock(dto.getStock());
        product.setBestSeller(false);
        product.setSales(0);
        product.setEnabled(true);
        return product;
    }
}

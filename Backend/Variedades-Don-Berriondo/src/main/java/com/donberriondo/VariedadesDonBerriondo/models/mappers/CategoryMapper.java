package com.donberriondo.VariedadesDonBerriondo.models.mappers;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CategoryRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.CategoryResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.CategoryEntity;

public class CategoryMapper {

    public static CategoryEntity toEntity(CategoryRequestDTO dto) {
        CategoryEntity category = new CategoryEntity();
        category.setName(dto.getName());
        return category;
    }

    public static CategoryResponseDTO toResponseDTO(CategoryEntity entity) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }
}

package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CategoryRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.CategoryResponseDTO;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    List<CategoryResponseDTO> findAllCategories();
    CategoryResponseDTO createCategory(CategoryRequestDTO categoryDTO);
    Optional<CategoryResponseDTO> updateCategory(Long id, CategoryRequestDTO categoryDTO);
    void deleteCategory(Long id);
}

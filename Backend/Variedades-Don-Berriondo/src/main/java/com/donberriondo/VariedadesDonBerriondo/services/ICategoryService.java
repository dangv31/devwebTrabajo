package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CategoryRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.CategoryResponseDTO;

import java.util.List;

public interface ICategoryService {
    List<CategoryResponseDTO> findAllCategories();
    CategoryResponseDTO createCategory(CategoryRequestDTO categoryDTO);
}

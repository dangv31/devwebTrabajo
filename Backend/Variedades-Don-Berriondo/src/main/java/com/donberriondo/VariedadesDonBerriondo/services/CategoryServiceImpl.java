package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CategoryRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.CategoryResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.CategoryEntity;
import com.donberriondo.VariedadesDonBerriondo.models.mappers.CategoryMapper;
import com.donberriondo.VariedadesDonBerriondo.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements ICategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponseDTO> findAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryDTO) {
        categoryRepository.findByName(categoryDTO.getName()).ifPresent(c -> {
            throw new DataIntegrityViolationException("La categoría '" + categoryDTO.getName() + "' ya existe.");
        });

        CategoryEntity category = CategoryMapper.toEntity(categoryDTO);
        CategoryEntity savedCategory = categoryRepository.save(category);
        return CategoryMapper.toResponseDTO(savedCategory);
    }

}

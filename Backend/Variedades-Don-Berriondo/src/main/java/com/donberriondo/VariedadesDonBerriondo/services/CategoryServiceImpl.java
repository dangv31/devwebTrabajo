package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CategoryRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.CategoryResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.CategoryEntity;
import com.donberriondo.VariedadesDonBerriondo.models.mappers.CategoryMapper;
import com.donberriondo.VariedadesDonBerriondo.repositories.CategoryRepository;
import com.donberriondo.VariedadesDonBerriondo.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements ICategoryService{

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;

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

    @Override
    @Transactional
    public Optional<CategoryResponseDTO> updateCategory(Long id, CategoryRequestDTO categoryDTO) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    // Verificar si el nuevo nombre ya existe en otra categoría
                    categoryRepository.findByName(categoryDTO.getName()).ifPresent(otherCategory -> {
                        if (!otherCategory.getId().equals(id)) {
                            throw new DataIntegrityViolationException("El nombre de categoría '" + categoryDTO.getName() + "' ya está en uso.");
                        }
                    });

                    existingCategory.setName(categoryDTO.getName());
                    CategoryEntity updatedCategory = categoryRepository.save(existingCategory);
                    return CategoryMapper.toResponseDTO(updatedCategory);
                });
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        CategoryEntity categoryToDelete = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con el id: " + id));

        // Validar que la categoría no esté siendo usada por ningún producto
        if (productRepository.existsByCategory(categoryToDelete)) {
            throw new DataIntegrityViolationException("No se puede eliminar la categoría porque está en uso por uno o más productos.");
        }

        categoryRepository.deleteById(id);
    }

}

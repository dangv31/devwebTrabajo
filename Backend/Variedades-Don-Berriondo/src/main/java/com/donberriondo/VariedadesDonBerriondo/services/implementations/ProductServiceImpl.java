package com.donberriondo.VariedadesDonBerriondo.services.implementations;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.ProductResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.CategoryEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductEntity;
import com.donberriondo.VariedadesDonBerriondo.models.mappers.ProductMapper;
import com.donberriondo.VariedadesDonBerriondo.repositories.CategoryRepository;
import com.donberriondo.VariedadesDonBerriondo.repositories.ProductRepository;
import com.donberriondo.VariedadesDonBerriondo.services.IProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> findAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProductResponseDTO saveProduct(ProductRequestDTO productDTO) {
        CategoryEntity category = categoryRepository.findByName(productDTO.getCategoryName())
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con el nombre: " + productDTO.getCategoryName()));

        ProductEntity product = ProductMapper.toEntity(productDTO, category);

        ProductEntity savedProduct = productRepository.save(product);

        return ProductMapper.toResponseDTO(savedProduct);
    }

    @Override
    public Optional<ProductEntity> findProductById(Long id) {
        return productRepository.findById(id);
    }


    @Override
    @Transactional
    public Optional<ProductEntity> updateProduct(Long id, ProductEntity productDetails) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setName(productDetails.getName());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setDiscount(productDetails.getDiscount());
            existingProduct.setStock(productDetails.getStock());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setImageRoute(productDetails.getImageRoute());
            existingProduct.setBestSeller(productDetails.isBestSeller());
            existingProduct.setEnabled(productDetails.isEnabled());

            return productRepository.save(existingProduct);
        });
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
package com.donberriondo.VariedadesDonBerriondo.services.implementations;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestCreateDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestNotifyDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.ProductRequestResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductRequestEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.UserEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.RequestStatusEnum;
import com.donberriondo.VariedadesDonBerriondo.repositories.ProductRepository;
import com.donberriondo.VariedadesDonBerriondo.repositories.ProductRequestRepository;
import com.donberriondo.VariedadesDonBerriondo.repositories.UserRepository;
import com.donberriondo.VariedadesDonBerriondo.services.IEmailService;
import com.donberriondo.VariedadesDonBerriondo.services.IProductRequestService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ProductRequestServiceImpl implements IProductRequestService {
    @Autowired private ProductRepository productRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ProductRequestRepository productRequestRepository;
    @Autowired private IEmailService emailService;

    @Override
    @Transactional
    public void createProductRequest(ProductRequestCreateDTO requestDTO) {
        ProductEntity product = productRepository.findById(requestDTO.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con ID: " + requestDTO.getProductId()));

        if (product.getStock() > -4) {
            throw new IllegalStateException("No se puede solicitar el producto '" + product.getName() + "' porque su stock actual (" + product.getStock() + ") es mayor que -4.");
        }

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity currentUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Usuario autenticado no encontrado."));

        ProductRequestEntity newRequest = new ProductRequestEntity();
        newRequest.setProduct(product);
        newRequest.setUser(currentUser);
        newRequest.setQuantity(requestDTO.getQuantity());
        newRequest.setComment(requestDTO.getComment());
        newRequest.setRequestDate(LocalDateTime.now());
        newRequest.setStatus(RequestStatusEnum.PENDIENTE);

        productRequestRepository.save(newRequest);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductRequestResponseDTO> getAllProductRequests() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d 'de' MMM 'de' yyyy, hh:mm a", new Locale.Builder().setLanguage("es").setRegion("CO").build());

        return productRequestRepository.findAll().stream()
                .map(req -> new ProductRequestResponseDTO(
                        req.getId(),
                        req.getProduct().getName(),
                        req.getProduct().getImageRoute(),
                        req.getUser().getEmail(),
                        req.getQuantity(),
                        req.getComment(),
                        req.getRequestDate().format(formatter),
                        req.getStatus().name()
                ))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void notifyUserAndCompleteRequest(Long requestId, ProductRequestNotifyDTO notifyDTO) {
        ProductRequestEntity request = productRequestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException("Solicitud de producto no encontrada con ID: " + requestId));

        ProductEntity product = request.getProduct();

        product.setStock(notifyDTO.getNewStock());
        productRepository.save(product);

        String userEmail = request.getUser().getEmail();
        String userName = request.getUser().getName();
        String productName = product.getName();

        emailService.sendProductAvailableEmail(userEmail, userName, productName);

        request.setStatus(RequestStatusEnum.COMPLETADA);
        productRequestRepository.save(request);
    }
}

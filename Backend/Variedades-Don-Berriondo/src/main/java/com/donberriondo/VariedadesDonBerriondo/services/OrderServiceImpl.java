package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.OrderDetailResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.UserEntity;
import com.donberriondo.VariedadesDonBerriondo.models.exceptions.NoStockException;
import com.donberriondo.VariedadesDonBerriondo.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CheckoutRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.OrderConfirmationDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.OrderDetailEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.OrderEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductEntity;
import com.donberriondo.VariedadesDonBerriondo.repositories.OrderRepository;
import com.donberriondo.VariedadesDonBerriondo.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements IOrderService{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public OrderConfirmationDTO processOrder(CheckoutRequestDTO checkoutRequest) throws NoStockException {

        // Obtener el email del usuario autenticado desde el contexto de seguridad
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity currentUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario autenticado no encontrado en la base de datos."));

        OrderEntity order = new OrderEntity();
        order.setUser(currentUser);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("Pendiente");

        double totalAmount = 0;
        Map<Long, ProductEntity> productsToUpdate = new HashMap<>();

        // Validar y calcular el total
        for (var item : checkoutRequest.getItems()) {
            ProductEntity product = productRepository.findById(item.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con ID: " + item.getId()));

            if (product.getStock() < item.getQuantity()) {
                throw new NoStockException("Stock insuficiente para el producto: " + product.getName());
            }

            totalAmount += product.getPrice() * item.getQuantity();
            productsToUpdate.put(product.getId(), product);

            // Crear el detalle de la orden
            OrderDetailEntity detail = new OrderDetailEntity();
            detail.setProduct(product);
            detail.setOrder(order);
            detail.setQuantity(item.getQuantity());
            detail.setPriceAtPurchase(product.getPrice()); // Usar el precio de la BD
            order.getOrderDetails().add(detail);
        }

        order.setTotalPrice(totalAmount);

        // Actualizar el stock y las ventas de los productos
        for (var item : checkoutRequest.getItems()) {
            ProductEntity product = productsToUpdate.get(item.getId());
            int newStock = product.getStock() - item.getQuantity();
            product.setStock(newStock);
            product.setSales(product.getSales() + item.getQuantity());
            productRepository.save(product);
        }

        // Guardar la orden
        OrderEntity savedOrder = orderRepository.save(order);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(
                "d 'de' MMM 'de' yyyy, hh:mm a",
                new Locale.Builder().setLanguage("es").setRegion("CO").build()
        );
        String formattedDate = savedOrder.getOrderDate().format(formatter);

        // Mapear los detalles de la orden al DTO de respuesta
        List<OrderDetailResponseDTO> itemResponses = new ArrayList<>();
        for (OrderDetailEntity detail : savedOrder.getOrderDetails()) {
            itemResponses.add(new OrderDetailResponseDTO(
                    detail.getProduct().getName(),
                    detail.getQuantity(),
                    detail.getPriceAtPurchase()
            ));
        }

        return new OrderConfirmationDTO(
                savedOrder.getId(),
                formattedDate,
                savedOrder.getStatus(),
                savedOrder.getTotalPrice(),
                itemResponses
        );
    }

    @Override
    public List<OrderConfirmationDTO> getAllOrders() {
        List<OrderEntity> orders = orderRepository.findAll();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(
                "d 'de' MMM 'de' yyyy, hh:mm a",
                new Locale.Builder().setLanguage("es").setRegion("CO").build()
        );

        return orders.stream()
                .map(order -> {
                    List<OrderDetailResponseDTO> itemResponses = order.getOrderDetails().stream()
                            .map(detail -> new OrderDetailResponseDTO(
                                    detail.getProduct().getName(),
                                    detail.getQuantity(),
                                    detail.getPriceAtPurchase()
                            )).collect(Collectors.toList());

                    String formattedDate = order.getOrderDate().format(formatter);

                    return new OrderConfirmationDTO(
                            order.getId(),
                            formattedDate,
                            order.getStatus(),
                            order.getTotalPrice(),
                            itemResponses
                    );
                })
                .collect(Collectors.toList());
    }
}


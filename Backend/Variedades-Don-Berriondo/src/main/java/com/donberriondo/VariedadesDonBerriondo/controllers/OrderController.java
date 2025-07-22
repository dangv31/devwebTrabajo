package com.donberriondo.VariedadesDonBerriondo.controllers;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CheckoutRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.OrderConfirmationDTO;
import com.donberriondo.VariedadesDonBerriondo.models.exceptions.NoStockException;
import com.donberriondo.VariedadesDonBerriondo.services.IOrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderConfirmationDTO>> getAllOrders() {
        List<OrderConfirmationDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderConfirmationDTO> checkout(@Valid @RequestBody CheckoutRequestDTO checkoutRequest) throws NoStockException {
        OrderConfirmationDTO confirmation = orderService.processOrder(checkoutRequest);
        return new ResponseEntity<>(confirmation, HttpStatus.CREATED);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderConfirmationDTO>> getMyOrders() {
        List<OrderConfirmationDTO> orders = orderService.findOrdersByCurrentUser();
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{orderId}/delivered")
    public ResponseEntity<Void> markOrderAsDelivered(@PathVariable Long orderId) {
        System.out.println("Marking order " + orderId + " as delivered");
        orderService.markOrderAsDelivered(orderId);
        return ResponseEntity.ok().build();
    }

}

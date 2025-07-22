package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CheckoutRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.OrderConfirmationDTO;
import com.donberriondo.VariedadesDonBerriondo.models.exceptions.NoStockException;

import java.util.List;

public interface IOrderService {
    OrderConfirmationDTO processOrder(CheckoutRequestDTO checkoutRequest) throws NoStockException;
    List<OrderConfirmationDTO> getAllOrders();
    List<OrderConfirmationDTO> findOrdersByCurrentUser();
    void markOrderAsDelivered(Long orderId);
}

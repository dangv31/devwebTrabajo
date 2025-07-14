package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.CheckoutRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.OrderConfirmationDTO;
import com.donberriondo.VariedadesDonBerriondo.models.exceptions.NoStockException;

public interface IOrderService {
    OrderConfirmationDTO processOrder(CheckoutRequestDTO checkoutRequest) throws NoStockException;
}

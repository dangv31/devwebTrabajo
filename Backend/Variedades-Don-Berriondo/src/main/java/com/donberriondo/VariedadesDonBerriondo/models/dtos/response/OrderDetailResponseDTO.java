package com.donberriondo.VariedadesDonBerriondo.models.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderDetailResponseDTO {
    private String productName;
    private int quantity;
    private double priceAtPurchase;
}

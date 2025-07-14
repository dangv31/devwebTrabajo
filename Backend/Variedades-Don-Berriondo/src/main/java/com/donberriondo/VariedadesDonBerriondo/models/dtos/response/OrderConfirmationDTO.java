package com.donberriondo.VariedadesDonBerriondo.models.dtos.response;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderConfirmationDTO {
    private Long orderId;
    private String orderDate;
    private String status;
    private double totalAmount;
    private List<OrderDetailResponseDTO> items;
}

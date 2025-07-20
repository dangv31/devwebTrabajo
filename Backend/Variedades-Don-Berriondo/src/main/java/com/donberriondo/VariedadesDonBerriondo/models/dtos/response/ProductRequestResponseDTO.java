package com.donberriondo.VariedadesDonBerriondo.models.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class ProductRequestResponseDTO {
    private Long requestId;
    private String productName;
    private String productImageRoute;
    private String requestedByEmail;
    private int quantity;
    private String comment;
    private String requestDate;
    private String status;
}

package com.donberriondo.VariedadesDonBerriondo.models.dtos.request;

import jakarta.validation.Valid;
import lombok.Data;

import java.util.List;

@Data
public class CheckoutRequestDTO {
    @Valid
    private List<CartItemRequestDTO> items;
}

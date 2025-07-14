package com.donberriondo.VariedadesDonBerriondo.models.dtos.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CartItemRequestDTO {
    @NotNull(message = "El ID del producto no puede ser nulo.")
    private Long id;

    @NotNull(message = "La cantidad no puede ser nula.")
    @Positive(message = "La cantidad debe ser un número positivo.")
    private int quantity;
}

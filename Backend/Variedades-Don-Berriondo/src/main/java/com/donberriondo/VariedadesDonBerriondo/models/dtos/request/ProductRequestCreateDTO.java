package com.donberriondo.VariedadesDonBerriondo.models.dtos.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductRequestCreateDTO {
    @NotNull(message = "El ID del producto es obligatorio.")
    private Long productId;

    @NotNull(message = "La cantidad es obligatoria.")
    @Positive(message = "La cantidad debe ser mayor que cero.")
    private int quantity;

    @Size(max = 500, message = "El comentario no puede superar los 500 caracteres.")
    private String comment;
}

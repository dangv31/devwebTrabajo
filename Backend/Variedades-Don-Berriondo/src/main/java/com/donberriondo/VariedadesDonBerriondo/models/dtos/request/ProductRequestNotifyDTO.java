package com.donberriondo.VariedadesDonBerriondo.models.dtos.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

public class ProductRequestNotifyDTO {
    @NotNull(message = "El nuevo stock no puede ser nulo.")
    @Min(value = 0, message = "El stock no puede ser un número negativo.")
    private int newStock;
}

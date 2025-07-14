package com.donberriondo.VariedadesDonBerriondo.models.dtos.request;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class ProductRequestDTO {
    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(min = 3, max = 255, message = "El nombre debe tener entre 3 y 255 caracteres.")
    private String name;

    @Size(max = 1000, message = "La descripción no puede superar los 1000 caracteres.")
    private String description;

    @NotNull(message = "El precio es obligatorio.")
    @Positive(message = "El precio debe ser un valor positivo.")
    private int price;

    @Min(value = 0, message = "El descuento no puede ser negativo.")
    private int discount;

    @NotBlank(message = "La ruta de la imagen no puede estar vacía.")
    private String imageRoute;

    @NotNull(message = "El nombre de la categoria es obligatorio.")
    private String categoryName;

    @NotNull(message = "")
    private boolean bestSeller;

    @NotNull(message = "El stock es obligatorio.")
    @Min(value = 0, message = "El stock no puede ser negativo.")
    private int stock;
}

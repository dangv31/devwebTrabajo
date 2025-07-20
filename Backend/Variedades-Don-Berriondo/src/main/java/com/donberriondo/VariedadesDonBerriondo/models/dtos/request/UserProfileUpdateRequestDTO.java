package com.donberriondo.VariedadesDonBerriondo.models.dtos.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserProfileUpdateRequestDTO {
    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(max = 255)
    private String name;

    @NotBlank(message = "El apellido no puede estar vacío.")
    @Size(max = 255)
    private String lastName;

    @Size(max = 255, message = "La dirección no puede superar los 255 caracteres.")
    private String address;
}

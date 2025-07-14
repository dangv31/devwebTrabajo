package com.donberriondo.VariedadesDonBerriondo.models.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthRegisterRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String lastName;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String address;
    @NotBlank
    @Size(min = 8, max = 16, message = "La contraseña debe tener entre 8 y 16 caracteres.")
    private String password;
}

package com.donberriondo.VariedadesDonBerriondo.models.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthLoginRequest {
    @NotBlank
    private String username; // username es el email del usuario
    @NotBlank
    private String password;
}

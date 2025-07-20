package com.donberriondo.VariedadesDonBerriondo.models.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponseDTO {
    private String name;
    private String lastName;
    private String email;
    private String address;
}

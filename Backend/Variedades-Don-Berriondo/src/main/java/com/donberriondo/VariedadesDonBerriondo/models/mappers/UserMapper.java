package com.donberriondo.VariedadesDonBerriondo.models.mappers;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.UserProfileResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.UserEntity;

public class UserMapper {
    public static UserProfileResponseDTO toProfileResponseDTO(UserEntity user) {
        return new UserProfileResponseDTO(
                user.getName(),
                user.getLastName(),
                user.getEmail(),
                user.getAddress()
        );
    }
}

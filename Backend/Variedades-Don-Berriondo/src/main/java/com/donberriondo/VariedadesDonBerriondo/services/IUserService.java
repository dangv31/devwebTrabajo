package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.UserProfileUpdateRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.UserProfileResponseDTO;

public interface IUserService {
    UserProfileResponseDTO getUserProfile();
    UserProfileResponseDTO updateUserProfile(UserProfileUpdateRequestDTO updateRequest);
}

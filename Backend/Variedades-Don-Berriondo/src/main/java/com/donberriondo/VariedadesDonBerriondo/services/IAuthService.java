package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.AuthLoginRequest;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.AuthRegisterRequest;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.AuthResponse;

public interface IAuthService {
    AuthResponse loginUser(AuthLoginRequest request);
    void registerUser(AuthRegisterRequest request);
}

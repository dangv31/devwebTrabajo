package com.donberriondo.VariedadesDonBerriondo.controllers;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.AuthLoginRequest;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.AuthRegisterRequest;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.AuthResponse;
import com.donberriondo.VariedadesDonBerriondo.services.IAuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private IAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginRequest request) {
        return ResponseEntity.ok(authService.loginUser(request));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid AuthRegisterRequest request) {
        authService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

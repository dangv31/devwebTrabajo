package com.donberriondo.VariedadesDonBerriondo.controllers;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.UserProfileUpdateRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.UserProfileResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.services.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> getUserProfile() {
        return ResponseEntity.ok(userService.getUserProfile());
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> updateUserProfile(@Valid @RequestBody UserProfileUpdateRequestDTO updateRequest) {
        return ResponseEntity.ok(userService.updateUserProfile(updateRequest));
    }
}

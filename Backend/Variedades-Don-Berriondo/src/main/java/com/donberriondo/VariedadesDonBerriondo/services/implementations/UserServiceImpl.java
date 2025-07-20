package com.donberriondo.VariedadesDonBerriondo.services.implementations;

import com.donberriondo.VariedadesDonBerriondo.models.mappers.UserMapper;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.UserProfileUpdateRequestDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.UserProfileResponseDTO;
import com.donberriondo.VariedadesDonBerriondo.models.entities.UserEntity;
import com.donberriondo.VariedadesDonBerriondo.repositories.UserRepository;
import com.donberriondo.VariedadesDonBerriondo.services.IUserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponseDTO getUserProfile() {
        UserEntity currentUser = getCurrentUser();
        return UserMapper.toProfileResponseDTO(currentUser);
    }

    @Override
    @Transactional
    public UserProfileResponseDTO updateUserProfile(UserProfileUpdateRequestDTO updateRequest) {
        UserEntity currentUser = getCurrentUser();

        currentUser.setName(updateRequest.getName());
        currentUser.setLastName(updateRequest.getLastName());
        currentUser.setAddress(updateRequest.getAddress());

        UserEntity updatedUser = userRepository.save(currentUser);

        return UserMapper.toProfileResponseDTO(updatedUser);
    }

    private UserEntity getCurrentUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Usuario autenticado no encontrado en la base de datos."));
    }
}

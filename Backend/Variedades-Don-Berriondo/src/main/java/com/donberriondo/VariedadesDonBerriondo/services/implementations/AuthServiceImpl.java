package com.donberriondo.VariedadesDonBerriondo.services.implementations;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.AuthLoginRequest;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.AuthRegisterRequest;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.AuthResponse;
import com.donberriondo.VariedadesDonBerriondo.models.entities.RoleEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.UserEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.RoleEnum;
import com.donberriondo.VariedadesDonBerriondo.repositories.RoleRepository;
import com.donberriondo.VariedadesDonBerriondo.repositories.UserRepository;
import com.donberriondo.VariedadesDonBerriondo.config.security.JwtUtils;
import com.donberriondo.VariedadesDonBerriondo.services.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthServiceImpl implements IAuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public AuthResponse loginUser(AuthLoginRequest request) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        authenticationManager.authenticate(authentication);
        String username = userRepository.findByEmail(request.getUsername())
                .map(UserEntity::getName)
                .orElse("Usuario no encontrado");
        String token = jwtUtils.createToken(authentication);
        boolean isAdmin = userRepository.findByEmail(request.getUsername())
                .map(UserEntity::getRoles)
                .orElse(Set.of())
                .stream()
                .anyMatch(role -> role.getName() == RoleEnum.ADMIN);
        return new AuthResponse(username, token, isAdmin);
    }

    @Override
    public void registerUser(AuthRegisterRequest request) {
        RoleEntity defaultRole = roleRepository.findByName(RoleEnum.USER)
                .orElseThrow(() -> new RuntimeException("Error: El rol USER no se encontró. Asegúrese de que se haya cargado en la base de datos."));

        UserEntity user = UserEntity.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .address(request.getAddress())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(defaultRole))
                .build();

        userRepository.save(user);
    }
}

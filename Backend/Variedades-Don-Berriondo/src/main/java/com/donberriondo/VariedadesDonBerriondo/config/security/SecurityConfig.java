package com.donberriondo.VariedadesDonBerriondo.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthorizationFilter jwtAuthorizationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    // Endpoints públicos
                    auth.requestMatchers("/auth/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/products/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/categories/**").permitAll();
                    auth.requestMatchers("/uploads/**").permitAll();

                    // Endpoints de ADMIN
                    auth.requestMatchers(HttpMethod.POST, "/products", "/categories").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/products/**", "/categories").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/products/**", "/categories").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.GET, "/orders", "/products/requests").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/api/files/upload").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.POST, "/requests/{id}/notify").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/orders/{orderId}/delivered").hasRole("ADMIN");
                    // Endpoints de USUARIO
                    auth.requestMatchers("/orders/checkout").hasRole("USER");
                    auth.requestMatchers(HttpMethod.POST, "/products/requests").hasRole("USER");
                    auth.requestMatchers(HttpMethod.GET, "/orders/my-orders").hasRole("USER");

                    // Endpoints de USUARIO y ADMIN
                    auth.requestMatchers("/users/profile").hasAnyRole("USER", "ADMIN");

                    // Resto de endpoints deben estar autenticados
                    auth.anyRequest().authenticated();
                })
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}

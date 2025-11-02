package edu.infosys.lostAndFoundApplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import edu.infosys.lostAndFoundApplication.service.CampusUserService;

@Configuration
@EnableMethodSecurity
public class SystemConfig {

    @Autowired
    private EncoderConfig encoderConfig;

    @Autowired
    private CampusUserService service;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())

            // 🚀 This line ensures each login is isolated — no shared sessions
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.POST, "/lost-found/login/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/lost-found/login/**").permitAll()
                .requestMatchers("/lost-found/**").permitAll()
                .requestMatchers("/ws/**").permitAll()
                .requestMatchers("/api/chat/**").permitAll()
                .anyRequest().authenticated()
            );

        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}

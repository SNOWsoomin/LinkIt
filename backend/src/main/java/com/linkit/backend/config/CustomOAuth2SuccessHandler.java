package com.linkit.backend.config;

import com.linkit.backend.entity.User;
import com.linkit.backend.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();
        String email = (String) attributes.get("email");

        User user = userRepository.findByGoogleEmail(email).orElse(null);

        if (user == null) {
            User newUser = new User();
            newUser.setGoogleEmail(email);
            newUser.setInfoCheck(0);
            userRepository.save(newUser);
            response.sendRedirect("http://localhost:5173/register?email=" + email);
            return;
        }

        if (user.getInfoCheck() == 0) {
            response.sendRedirect("http://localhost:5173/register?email=" + email);
        } else {
            response.sendRedirect("http://localhost:5173/my-card?email=" + email);
        }
    }
}
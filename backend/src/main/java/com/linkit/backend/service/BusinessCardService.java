package com.linkit.backend.service;

import com.linkit.backend.entity.BusinessCard;
import com.linkit.backend.entity.User;
import com.linkit.backend.repository.BusinessCardRepository;
import com.linkit.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BusinessCardService {

    private final BusinessCardRepository repository;
    private final UserRepository userRepository;

    public BusinessCard getMyCard(String email) {
        return repository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Card not found: " + email));
    }

    @Transactional
    public BusinessCard registerCard(String email, BusinessCard cardData) {
        User user = userRepository.findByGoogleEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        cardData.setUserEmail(user.getGoogleEmail());
        user.setInfoCheck(1);
        return repository.save(cardData);
    }

    @Transactional
    public String generateShareToken(String email) {
        BusinessCard card = repository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("명함을 먼저 등록해주세요."));

        if (card.getShareToken() == null || card.getShareToken().isEmpty()) {
            String newToken = UUID.randomUUID().toString().substring(0, 20);
            card.setShareToken(newToken);
            repository.save(card);
        }
        return card.getShareToken();
    }

    public BusinessCard getCardByToken(String token) {
        return repository.findByShareToken(token)
                .orElseThrow(() -> new RuntimeException("유효하지 않은 링크입니다."));
    }
}
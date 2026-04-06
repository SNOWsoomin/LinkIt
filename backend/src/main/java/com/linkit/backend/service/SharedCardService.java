package com.linkit.backend.service;

import com.linkit.backend.entity.SharedCard;
import com.linkit.backend.repository.SharedCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SharedCardService {

    private final SharedCardRepository sharedCardRepository;

    @Transactional
    public void saveSharedCard(String viewerEmail, String token) {
        if (sharedCardRepository.existsByOwnerEmailAndShareToken(viewerEmail, token)) {
            throw new RuntimeException("이미 명함첩에 저장된 명함입니다.");
        }

        SharedCard saveRecord = new SharedCard();
        saveRecord.setOwnerEmail(viewerEmail);
        saveRecord.setShareToken(token);
        sharedCardRepository.save(saveRecord);
    }
}
package com.linkit.backend.repository;

import com.linkit.backend.entity.BusinessCard;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BusinessCardRepository extends JpaRepository<BusinessCard, String> {
    Optional<BusinessCard> findByUserEmail(String userEmail);
    Optional<BusinessCard> findByShareToken(String shareToken);
}
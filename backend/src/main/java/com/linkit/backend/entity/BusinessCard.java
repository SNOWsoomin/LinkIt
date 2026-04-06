package com.linkit.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "business_cards")
@Getter
@Setter
public class BusinessCard {

    @Id
    @Column(name = "user_email")
    private String userEmail;

    private String name;
    private String engName;
    private String companyName;
    private String teamName;
    private String position;
    private String companyImg;
    private String companyPhone;
    private String personalPhone;
    private String companyEmail;
    private String personalEmail;
    private String companyAddress;

    @Column(name = "share_token")
    private String shareToken; // 내 명함을 공유하기 위한 토큰

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
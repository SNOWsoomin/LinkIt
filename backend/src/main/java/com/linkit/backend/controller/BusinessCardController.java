package com.linkit.backend.controller;

import com.linkit.backend.entity.BusinessCard;
import com.linkit.backend.service.BusinessCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api") // 프론트의 /api/share/token과 /api/cards/my를 모두 수용하기 위해 수정
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BusinessCardController {

    private final BusinessCardService service;

    // 기존 내 명함 조회: /api/cards/my
    @GetMapping("/cards/my")
    public BusinessCard getMyCard(@RequestParam String email) {
        return service.getMyCard(email);
    }

    // 기존 명함 등록: /api/cards/register
    @PostMapping("/cards/register")
    public BusinessCard registerCard(@RequestParam String email, @RequestBody BusinessCard cardData) {
        return service.registerCard(email, cardData);
    }

    // ⭐ 추가: 공유 토큰 생성 및 반환: /api/share/token
    @PostMapping("/share/token")
    public ResponseEntity<?> generateToken(@RequestParam String email) {
        try {
            String token = service.generateShareToken(email);
            // 프론트엔드(MyCardPage.jsx)가 response.data.share_token을 기대하므로 키 이름을 맞춤
            return ResponseEntity.ok(Map.of("share_token", token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
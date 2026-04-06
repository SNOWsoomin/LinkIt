package com.linkit.backend.controller;

import com.linkit.backend.service.SharedCardService;
import com.linkit.backend.repository.SharedCardRepository;
import com.linkit.backend.service.BusinessCardService;
import com.linkit.backend.entity.BusinessCard;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SharedCardController {

    private final SharedCardService sharedCardService;
    private final SharedCardRepository sharedCardRepository;
    private final BusinessCardService businessCardService;

    @GetMapping("/shared-view")
    public BusinessCard getSharedCard(@RequestParam String token) {
        return businessCardService.getCardByToken(token);
    }

    @PostMapping("/wallet/save")
    public ResponseEntity<?> saveSharedCard(@RequestBody Map<String, String> request) {
        try {
            sharedCardService.saveSharedCard(request.get("owner_email"), request.get("share_token"));
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/wallet")
    public ResponseEntity<?> getWallet(@RequestParam String email) {
        try {
            List<Map<String, Object>> cards = sharedCardRepository.findMyWalletCards(email);
            return ResponseEntity.ok(cards);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
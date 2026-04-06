package com.linkit.backend.repository;

import com.linkit.backend.entity.SharedCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Map;

public interface SharedCardRepository extends JpaRepository<SharedCard, Object> {

    boolean existsByOwnerEmailAndShareToken(String ownerEmail, String shareToken);

    @Query(value = "SELECT b.name, b.eng_name, b.company_name, b.team_name, b.position, " +
            "b.company_phone, b.personal_phone, b.company_email, b.personal_email, b.company_address " +
            "FROM shared_card s " +
            "JOIN business_cards b ON s.share_token = b.share_token " +
            "WHERE s.owner_email = :ownerEmail", nativeQuery = true)
    List<Map<String, Object>> findMyWalletCards(@Param("ownerEmail") String ownerEmail);
}
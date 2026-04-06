package com.linkit.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import java.io.Serializable;

@Entity
@Table(name = "shared_card")
@Getter
@Setter
@IdClass(SharedCardId.class)
public class SharedCard {

    @Id
    @Column(name = "owner_email")
    private String ownerEmail;

    @Id
    @Column(name = "share_token")
    private String shareToken;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
class SharedCardId implements Serializable {
    private String ownerEmail;
    private String shareToken;
}
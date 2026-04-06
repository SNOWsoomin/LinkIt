package com.linkit.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @Column(name = "google_email")
    private String googleEmail;

    @Column(name = "info_check")
    private int infoCheck;
}
package com.donberriondo.VariedadesDonBerriondo.models.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.Set;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String description;

    private int price;

    // discount = -1 if there is no any discount
    private int discount;

    private String imageRoute;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    private boolean bestSeller;

    private int stock;

    private int sales;

    private boolean isEnabled;
}

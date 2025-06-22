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

    private float price;

    private String description;

    private float discount;

    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "product_category", joinColumns = @JoinColumn(name="product_id"),inverseJoinColumns = @JoinColumn(name="category_id"))
    private Set<CategoryEntity> categories;

    private int stock;

    private boolean isEnabled;
}

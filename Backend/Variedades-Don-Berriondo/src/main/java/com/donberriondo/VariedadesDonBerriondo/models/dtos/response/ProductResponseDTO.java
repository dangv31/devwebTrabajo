package com.donberriondo.VariedadesDonBerriondo.models.dtos.response;

import lombok.Data;

@Data
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String description;
    private int price;
    private int discount;
    private String imageRoute;
    private String categoryName;
    private boolean bestSeller;
    private int stock;
    private int sales;
    private boolean isEnabled;
}

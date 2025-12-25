package com.HubControl.dto;

import java.math.BigDecimal;

public class ProductRequest {
    private String sku;
    private String productName;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private Integer supplierId;

    public ProductRequest(){}

    public ProductRequest(String sku, String productName, String description, BigDecimal price, String imageUrl, Integer supplierId) {
        this.sku = sku;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.supplierId = supplierId;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }
}

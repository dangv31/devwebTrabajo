package com.donberriondo.VariedadesDonBerriondo.services;

import com.donberriondo.VariedadesDonBerriondo.models.dtos.request.ProductRequestCreateDTO;
import com.donberriondo.VariedadesDonBerriondo.models.dtos.response.ProductRequestResponseDTO;
import java.util.List;

public interface IProductRequestService {
    void createProductRequest(ProductRequestCreateDTO requestDTO);
    List<ProductRequestResponseDTO> getAllProductRequests();
}

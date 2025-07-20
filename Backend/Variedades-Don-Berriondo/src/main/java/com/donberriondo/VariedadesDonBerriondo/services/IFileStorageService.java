package com.donberriondo.VariedadesDonBerriondo.services;

import org.springframework.web.multipart.MultipartFile;

public interface IFileStorageService {
    String storeFile(MultipartFile file);
}

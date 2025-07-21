package com.donberriondo.VariedadesDonBerriondo.services;

public interface IEmailService {
    void sendProductAvailableEmail(String userEmail, String userName, String productName);
}

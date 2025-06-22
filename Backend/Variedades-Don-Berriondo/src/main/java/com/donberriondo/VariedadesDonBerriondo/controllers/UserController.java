package com.donberriondo.VariedadesDonBerriondo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class UserController {

    @GetMapping("hola")
    public String prueba(){
        return "HolaMundo";
    }

}

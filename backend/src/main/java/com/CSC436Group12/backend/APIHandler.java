package com.CSC436Group12.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class APIHandler {

    @GetMapping({"/getAppointments"})
    public String getAppointments() {
        return "appointments";
    }

}
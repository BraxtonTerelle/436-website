package com.CSC436Group12.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class APIHandler {

    private ArrayList<DailyAppointmentTracker> appointmentsList;

    public APIHandler(){
        appointmentsList = new ArrayList<>();
    }

    @GetMapping({"/getAppointments"})
    public String getAppointments() {
        return "Appointments list";
    }

    @GetMapping({"/createAppointment"})
    public String createAppointment(@RequestParam String date, @RequestParam String time, @RequestParam String name, @RequestParam String phoneNumber){
        return "Appointment created";
    }

    @GetMapping({"/deleteAppointment"})
    public String deleteAppointment(@RequestParam String date, @RequestParam String time){
        return "Appointment deleted";
    }

}
package com.CSC436Group12.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class APIHandler {

    private ArrayList<DailyAppointmentTracker> appointmentsList;

    public APIHandler(){
        appointmentsList = new ArrayList<>();
        appointmentsList.add(new DailyAppointmentTracker("10/20/2023"));
    }

    @GetMapping({"/getAppointments"})
    public String getAppointments(@RequestParam String date) {
        //search for correct DailyAppointmentTracker, replace "0" with index
        return appointmentsList.get(0).toString();
    }

    @GetMapping({"/createAppointment"})
    public String createAppointment(@RequestParam String date, @RequestParam String time, @RequestParam String name, @RequestParam String phoneNumber){
        //search for correct DailyAppointmentTracker, replace "0" with index
        appointmentsList.get(0).createAppointment(time, name, phoneNumber);
        return "Appointment created";
    }

    @GetMapping({"/deleteAppointment"})
    public String deleteAppointment(@RequestParam String date, @RequestParam String time){
        //search for correct DailyAppointmentTracker, replace "0" with index
        appointmentsList.get(0).deleteAppointment(time);
        return "Appointment deleted";
    }

}
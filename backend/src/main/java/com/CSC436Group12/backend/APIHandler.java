package com.CSC436Group12.backend;

import org.springframework.web.bind.annotation.*;

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

    @PostMapping({"/createAppointment"})
    @ResponseBody
    public AppointmentInfo createAppointment(@RequestBody createAppointmentBody appointmentBody){
        return new AppointmentInfo(appointmentBody.getDate(), appointmentBody.getTime(), appointmentBody.getDuration(), appointmentBody.getContactInfo());
    }

    @GetMapping({"/wdeleteAppointment"})
    public String deleteAppointment(@RequestParam String date, @RequestParam String time){
        return "Appointment deleted";
    }

    @PostMapping("/reserveSlot")
    public String reserveSlot(@RequestBody ReserveBody body) {
        System.out.println(body);
        return "Created reservation: " + body.toString();
    }

}
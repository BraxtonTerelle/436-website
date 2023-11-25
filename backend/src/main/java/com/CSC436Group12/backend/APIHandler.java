package com.CSC436Group12.backend;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.SortedSet;
import java.util.TreeSet;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class APIHandler {

    private SortedSet<DailyAppointments> dailyAppointments;

    public APIHandler(){
        dailyAppointments = new TreeSet<>((dailyAppointments1, dailyAppointments2) -> dailyAppointments1.getDate().compareTo(dailyAppointments2.getDate()));
    }

    @GetMapping({"/getAppointments"})
    public String getAppointments() {
    	if (dailyAppointments.size() == 0) {
    		return "There are no scheduled appointments";
    	}
    	
    	
    	String retval = "";
    	for (DailyAppointments dailyApts : dailyAppointments) {
    		System.out.println(dailyApts);
    		retval += dailyApts.toString() + "\n";
    	}
    	
        return retval;
    }

    @PostMapping({"/createAppointment"})
    @ResponseBody
    public Appointment createAppointment(@RequestBody createAppointmentBody appointmentBody){
        //if dailyAppointments has appointmentBody.getDate() then add appointment to that DailyAppointments
        //else create new DailyAppointments with appointmentBody.getDate() and add appointment to that DailyAppointments
        //return appointment
        for(DailyAppointments dailyAppointment : dailyAppointments){
            if(dailyAppointment.getDate().compareTo(appointmentBody.getDate()) == 0){
                dailyAppointment.createAppointment(appointmentBody.getTime(), appointmentBody.getDuration(), appointmentBody.getContactInfo());
                return dailyAppointment.getAppointment(appointmentBody.getTime());
            }
        }
        Appointment a = new Appointment(appointmentBody.getDate(), appointmentBody.getTime(), appointmentBody.getDuration(), appointmentBody.getContactInfo());
        dailyAppointments.add(new DailyAppointments(appointmentBody.getDate(), a));
        System.out.println(a.toJSON());
        return a;
    }

    @PostMapping({"/deleteAppointment"})
    public String deleteAppointment(@RequestBody deleteAppointmentBody appointmentBody){
        for(DailyAppointments dailyAppointment : dailyAppointments){
            if(dailyAppointment.getDate().compareTo(appointmentBody.getDate()) == 0){
                dailyAppointment.deleteAppointment(appointmentBody.getTime());
                return "deleted";
            }
        }
        return "This appointment does not exist";
    }

    @PostMapping("/reserveSlot")
    public String reserveSlot(@RequestBody ReserveBody body) {
        System.out.println(body);
        return "Created reservation: " + body.toString();
    }

    @PostMapping("/testBackup")
    public void testBackup() {
        DailyAppointments toSave = new DailyAppointments(new Date(11, 24, 2023));
        toSave.createAppointment(new Time(11, 30), new Time(0, 30));
        toSave.createAppointment(new Time(15, 0), new Time(1, 0));
        toSave.writeAppointments("testA");
        DailyAppointments toLoad = new DailyAppointments(Date.getToday());
        boolean status = toLoad.readAppointments("testA2023-11-24.ser");
        System.out.println(status);
    }

}
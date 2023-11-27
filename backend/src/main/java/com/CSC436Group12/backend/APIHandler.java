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
        dailyAppointments = setTestingValues(dailyAppointments);
    }
    
    public SortedSet<DailyAppointments> setTestingValues(SortedSet<DailyAppointments> d) {
    	DailyAppointments d1 = new DailyAppointments(new Date(11, 10, 2023));
    	DailyAppointments d2 = new DailyAppointments(new Date(12, 10, 2023));
    	DailyAppointments d3 = new DailyAppointments(new Date(11, 20, 2021));
    	
    	Appointment a1 = new Appointment(
    			new Date(11, 10, 2023), new Time(12, 00), new Time(0, 20), 
    			new ContactInfo("joe", "Lastname", "joe@email.com", "1234567"));
    	
    	Appointment a2 = new Appointment(
    			new Date(11, 10, 2023), new Time(15, 00), new Time(0, 20), 
    			new ContactInfo("Bob", "Lastname", "bob@email.com", "1234567"));
    	
    	Appointment a3 = new Appointment(
    			new Date(12, 10, 2023), new Time(12, 00), new Time(0, 20), 
    			new ContactInfo("jim", "Lastname", "jim@email.com", "1234567"));
    	
    	Appointment a4 = new Appointment(
    			new Date(12, 10, 2023), new Time(15, 00), new Time(0, 20), 
    			new ContactInfo("rom", "Lastname", "rom@email.com", "1234567"));
    	
    	Appointment a5 = new Appointment(
    			new Date(11, 20, 2021), new Time(12, 00), new Time(0, 20), 
    			new ContactInfo("han", "Lastname", "han@email.com", "1234567"));
    	
    	Appointment a6 = new Appointment(
    			new Date(11, 20, 2021), new Time(15, 00), new Time(0, 20), 
    			new ContactInfo("bud", "Lastname", "bud@email.com", "1234567"));
    	
    	d1.addAppointment(a1);
    	d1.addAppointment(a2);
    	d2.addAppointment(a3);
    	d2.addAppointment(a4);
    	d3.addAppointment(a5);
    	d3.addAppointment(a6);
    	
    	d.add(d1);
    	d.add(d2);
    	d.add(d3);
    	return d;
    }

    @GetMapping({"/getAppointments"})
    public ArrayList<Appointment> getAppointments() {
    	if (dailyAppointments.size() == 0) {
    		return new ArrayList<Appointment>();
    	}
    	
    	
    	ArrayList<Appointment> retval = new ArrayList<Appointment>();
    	for (DailyAppointments dailyApts : dailyAppointments) {
    		for (Appointment apt : dailyApts.getApts()) {
    			retval.add(apt);
    		}
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
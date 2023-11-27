package com.CSC436Group12.backend;

import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.SortedSet;
import java.util.TreeSet;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class APIHandler {

    private SortedSet<DailyAppointments> dailyAppointments;

    public APIHandler(){
        dailyAppointments = Collections.synchronizedSortedSet(
            new TreeSet<>((dailyAppointments1, dailyAppointments2) -> 
            dailyAppointments1.getDate().compareTo(dailyAppointments2.getDate())));
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
        boolean added = false;
        for(DailyAppointments dailyAppointment : dailyAppointments){
            if(dailyAppointment.getDate().compareTo(appointmentBody.getDate()) == 0){
                added = dailyAppointment.createAppointment(appointmentBody.getTime(), appointmentBody.getDuration(), appointmentBody.getContactInfo());
                if (added) {
                    return dailyAppointment.getAppointment(appointmentBody.getTime());
                } else {
                    return null;
                }
            }
        }
        Appointment a = new Appointment(appointmentBody.getDate(), appointmentBody.getTime(), appointmentBody.getDuration(), appointmentBody.getContactInfo(), appointmentBody.getAddOns());
        dailyAppointments.add(new DailyAppointments(appointmentBody.getDate(), a));
        System.out.println(a.toJSON());
        return a;
    }

    @PostMapping({"/deleteAppointment"})
    public String deleteAppointment(@RequestBody deleteAppointmentBody appointmentBody) {
        Iterator<DailyAppointments> iterator = dailyAppointments.iterator();
        String retval = "This appointment does not exist";

        while (iterator.hasNext()) {
            DailyAppointments dailyAppointment = iterator.next();
            if (dailyAppointment.getDate().compareTo(appointmentBody.getDate()) == 0) {
                dailyAppointment.deleteAppointment(appointmentBody.getTime());
                retval = "deleted";
                iterator.remove();
            }
        }

        System.out.println(retval);

        for (DailyAppointments dailyApts : dailyAppointments) {
            for (Appointment apt : dailyApts.getApts()) {
                System.out.println(apt.toJSON());
            }
        }

        return retval;
    }


    @PostMapping("/reserveSlot")
    public String reserveSlot(@RequestBody ReserveBody body) {
        Appointment tempApt = new Appointment(body.getDate(), body.getTime(), body.getDuration());
        tempApt.setStatus(AptStatus.HELD);

        boolean addStatus = false;
        for (DailyAppointments day : dailyAppointments) {
            if (day.getDate().compareTo(body.getDate()) == 0) {
                addStatus = day.addAppointment(tempApt);
                if (!addStatus) {
                    return "Unable to reserve, time booked/held.";
                }
            }
        }
        if (!addStatus) {
            DailyAppointments newDay = new DailyAppointments(body.getDate(), tempApt);
            addStatus = dailyAppointments.add(newDay);
        }

        if (!addStatus) { return "Unable to reserve"; }
        new java.util.Timer().schedule(
            new java.util.TimerTask() {
                @Override
                public void run() {
                    for (DailyAppointments day : dailyAppointments) {
                        if (day.getDate().compareTo(body.getDate()) == 0) {
                            Appointment temp = day.getAppointment(body.getTime());
                            if (temp != null) {
                                if (temp.getStatus().equals(AptStatus.HELD)) {
                                    day.deleteAppointment(body.getTime());
                                }
                            }
                        }
                    }
                }
            }, 60000);
        
        return "Held for 1 minute.";
    }

    @PostMapping("/addAvailability")
    public String addAvailability(@RequestBody AvailabilityReq body) {
        for (DailyAppointments day : dailyAppointments) {
            if (day.getDate().compareTo(body.getDate()) == 0) {
                boolean returnVal = day.addAvailability(body.getAvailability());
                if (returnVal) { return "Added"; }
            }
        }
        return "Failed";
    }

    @PostMapping("/removeAvailability")
    public String removeAvailability(@RequestBody AvailabilityReq body) {
        for (DailyAppointments day : dailyAppointments) {
            if (day.getDate().compareTo(body.getDate()) == 0) {
                boolean returnVal = day.removeAvailability(body.getAvailability());
                if (returnVal) { return "Removed"; }
            }
        }
        return "Failed";
    }

    @PostMapping("/getAvailability")
    public ArrayList<Availability> getAvailability(@RequestBody Date body) {
        for (DailyAppointments day : dailyAppointments) {
            if (day.getDate().compareTo(body) == 0) {
                return day.getAvailabilities();
            }
        }
        return null;
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
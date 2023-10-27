package com.CSC436Group12.backend;

import java.util.HashMap;

public class DailyAppointmentTracker {

    private Date date;

    public Date getDate(){ return date; }

    private final HashMap<Time, Integer> timeSlots;

    private final HashMap<Integer, AppointmentInfo> appointments;

    int appointmentId = 0;

    public DailyAppointmentTracker(Date date){
        this.date = date;
        this.appointments = new HashMap<>();
        this.timeSlots = new HashMap<>();
        for(int i = 10; i < 19; i++){
            timeSlots.put(new Time(i, 0), 0);
            timeSlots.put(new Time(i, 30), 0);
        }
    }

    public String createAppointment(Time time, String name, String phoneNumber){
        return "Appointment created.";
    }

    public String deleteAppointment(Time time){
        return "Appointment deleted.";
    }

    public String toJson(){
        String out = "";
        return out;
    }

}

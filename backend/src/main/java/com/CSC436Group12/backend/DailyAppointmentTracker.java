package com.CSC436Group12.backend;

import java.util.HashMap;

public class DailyAppointmentTracker {

    //MM-DD-YYYY
    private String date;

    public String getDate(){ return date; }

    private HashMap<String, String> appointments;

    public DailyAppointmentTracker(String date){
        this.date = date;
        this.appointments = new HashMap<>();
        int i = 9;
        while(i < 12){
            appointments.put(i + ":00 am", "");
            appointments.put(i + ":30 am", "");
            i++;
        }
        appointments.put("12:00 pm", "");
        appointments.put("12:30 pm", "");
        i = 1;
        while(i < 5){
            appointments.put(i + ":00 pm", "");
            appointments.put(i + ":30 pm", "");
            i++;
        }
    }

    public void createAppointment(String time, String name, String phoneNumber){
        if(appointments.get(time).isEmpty()){
            appointments.put(time, name + "," + phoneNumber);
        }
    }

    public void deleteAppointment(String time){
        appointments.put(time, "");
    }

    //change to toJSON eventually
    @Override
    public String toString(){
        String out = "";
        int i = 9;
        while(i < 12){
            out += i + ":00 am - " + appointments.get(i + ":00 am");
            out += i + ":30 am - " + appointments.get(i + ":30 am");
            i++;
        }
        out += "12:00 pm - " + appointments.get("12:00 pm");
        out += "12:30 pm - " + appointments.get("12:30 pm");
        i = 1;
        while(i < 5){
            out += i + ":00 pm - " + appointments.get(i + ":00 pm");
            out += i + ":30 pm - " + appointments.get(i + ":30 pm");
            i++;
        }
        return out;
    }

}

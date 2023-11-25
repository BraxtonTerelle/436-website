package com.CSC436Group12.backend;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.SortedSet;
import java.util.TreeSet;

public class DailyAppointments {

    private Date date;

    private SortedSet<Appointment> appointments;

    public DailyAppointments(Date date){
        this.date = date;
        this.appointments = new TreeSet<>((appointment1, appointment2) -> appointment1.getTime().compareTo(appointment2.getTime()));
    }

    public DailyAppointments(Date date, Appointment appointment){
        this.date = date;
        this.appointments = new TreeSet<>((appointment1, appointment2) -> appointment1.getTime().compareTo(appointment2.getTime()));
        this.appointments.add(appointment);
    }

    public Date getDate() {
        return date;
    }

    public Appointment getAppointment(Time time){
        for(Appointment appointment : appointments){
            if(appointment.getTime().compareTo(time) == 0){
                return appointment;
            }
        }
        return new Appointment(date, time, new Time(0, 0));
    }

    public void createAppointment(Time time, Time duration){
        appointments.add(new Appointment(date, time, duration));
    }

    public void createAppointment(Time time, Time duration, User user){
        appointments.add(new Appointment(date, time, duration, user));
    }

    public void createAppointment(Time time, Time duration, ContactInfo contactInfo){
        appointments.add(new Appointment(date, time, duration, contactInfo));
    }

    public void createAppointment(Time time, Time duration, User user, ContactInfo contactInfo){
        appointments.add(new Appointment(date, time, duration, user, contactInfo));
    }

    public void deleteAppointment(Time time){
        appointments.forEach(appointment -> {
            if(appointment.getTime().compareTo(time) == 0){
                appointments.remove(appointment);
            }
        });
    }
    
    public String toString() {
    	if (appointments.size() == 0) {
    		return "";
    	}
    	String s = appointments.first().toJSON();
    	return s;
    }

}

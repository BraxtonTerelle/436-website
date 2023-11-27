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
    
    public SortedSet<Appointment> getApts() {
    	return appointments;
    }
    
    public void addAppointment(Appointment a) {
    	this.appointments.add(a);
    }

    /**
     * Backup/Testing file writing function.
     * Usage: Create a new file saving the day's appointments.
     * Appends the date in YYYY-MM-DD format to the prefix, for
     * ease of usage within a loop writing all active dates.
     * End filename: "[prefix]2022-11-24.ser"
     * @param filePrefix string descriptor to filename
     * @return true on success, false otherwise.
     */
    public boolean writeAppointments(String filePrefix) {
        String fileName = filePrefix + this.date.getYear() + "-" + this.date.getMonth() + "-" + this.date.getDay() + ".ser";
        try {
            FileOutputStream saveDest = new FileOutputStream(fileName);
            ObjectOutputStream toWrite = new ObjectOutputStream(saveDest);
            toWrite.writeObject(this.date);
            toWrite.writeInt(appointments.size());
            for (Appointment a : appointments) {
                toWrite.writeObject(a);
            }
            toWrite.close();
            saveDest.close();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * Backup/Texting file loading function.
     * Usage: Create an empty appointments object with an arbitrary
     * Date value, then run readAppointments on a file.
     * 
     * @param fileName full location of .ser file, including extension
     * @return true on success, false otherwise
     * @postcondition this object new contains the list of appointments
     *      from that file and has changed its date to match.
     */
    public boolean readAppointments(String fileName) {
        try {
            FileInputStream fIn = new FileInputStream(fileName);
            ObjectInputStream oIn = new ObjectInputStream(fIn);
            Date newDate = (Date) oIn.readObject();
            this.date = newDate;
            int size = oIn.readInt();
            // does not clear the current list; make sure to use on fresh object
            for (int i = 0; i < size; i++) {
                Appointment toLoad = (Appointment) oIn.readObject();
                appointments.add(toLoad);
            }
            oIn.close();
            fIn.close();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

}

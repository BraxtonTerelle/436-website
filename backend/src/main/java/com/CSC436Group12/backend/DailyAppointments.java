package com.CSC436Group12.backend;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.SortedSet;
import java.util.TreeSet;

import com.CSC436Group12.backend.Availability.Location;

public class DailyAppointments {

    private Date date;

    private SortedSet<Appointment> appointments;
    private SortedSet<Availability> availabilities;

    public DailyAppointments(Date date){
        this.date = date;
        this.appointments = new TreeSet<>((appointment1, appointment2) -> appointment1.getTime().compareTo(appointment2.getTime()));
        this.availabilities = new TreeSet<>((av1, av2) -> av1.getStartTime().compareTo(av2.getStartTime()));
    }

    public DailyAppointments(Date date, Appointment appointment){
        this.date = date;
        this.appointments = new TreeSet<>((appointment1, appointment2) -> appointment1.getTime().compareTo(appointment2.getTime()));
        this.appointments.add(appointment);
        this.availabilities = new TreeSet<>((av1, av2) -> av1.getStartTime().compareTo(av2.getStartTime()));
        // temporary
        availabilities.add(new Availability(new Time(10, 0), new Time(16, 0), Location.Tucson, date));
    }

    public Date getDate() {
        return date;
    }

    /**
     * Returns the appointment beginning at the given time,
     * if it exists.
     * @param time
     * @return Appointment if exists, null otherwise.
     */
    public Appointment getAppointment(Time time){
        for(Appointment appointment : appointments){
            if(appointment.getTime().compareTo(time) == 0){
                return appointment;
            }
        }
        return null;
    }

    public boolean createAppointment(Time time, Time duration) {
        Appointment toAdd = new Appointment(date, time, duration);
        return addAppointment(toAdd);
    }

    public boolean createAppointment(Time time, Time duration, User user){
        Appointment toAdd = new Appointment(date, time, duration, user);
        return addAppointment(toAdd);
    }

    public boolean createAppointment(Time time, Time duration, ContactInfo contactInfo){
        Appointment toAdd = new Appointment(date, time, duration, contactInfo);
        return addAppointment(toAdd);
    }

    public boolean createAppointment(Time time, Time duration, User user, ContactInfo contactInfo){
        Appointment toAdd = new Appointment(date, time, duration, user, contactInfo);
        return addAppointment(toAdd);
    }

    /**
     * Attempts to add a given appointment to the day's list.
     * Checks various logic before confirming and adding it.
     * 
     * Ensures that the appointment is within an available time,
     * and that it does not overlap (beyond the minute)  with
     * adjacent appointments.
     * (ex: 11-11:30 blocks 11:15, but not 11:30-12.)
     * 
     * @param toAdd Appointment with AT LEAST time and duration.
     * @return true if added, false if conflict.
     */
    public boolean addAppointment(Appointment toAdd) {
        // Check for possible slot.
        boolean timeAvailable = false;
        for (Availability available : availabilities) {
            if (available.withinRange(toAdd)) {
                timeAvailable = true;
            }
        }

        Time endTime = new Time(toAdd.getTime().getHour(), toAdd.getTime().getMinute());
        endTime.increment(toAdd.getDuration());

        // Check for conflicts.
        Iterator<Appointment> current = appointments.iterator(); // guaranteed to go in increasing order.
        Time endCompare = new Time(0, 0);
        while (current.hasNext()) {
            Appointment toCompare = current.next();
            // if we pass this slot, end check
            if (toCompare.getTime().compareTo(endTime) >= 0) {
                break;
            }
            endCompare.setHour(toCompare.getTime().getHour());
            endCompare.setMinute(toCompare.getTime().getMinute());
            endCompare.increment(toCompare.getDuration());
            if (endCompare.compareTo(toAdd.getTime()) > 0) {
                timeAvailable = false;
                break;
            }
        }
        // if timeAvailable is still true there were no conflicts.
        if (!timeAvailable) {
            return false;
        }
        return appointments.add(toAdd);
    }

    public void deleteAppointment(Time time){
        appointments.forEach(appointment -> {
            if(appointment.getTime().compareTo(time) == 0){
                appointments.remove(appointment);
            }
        });
    }

    /**
     * Set a given availability for the day.
     * @param start
     * @param end
     * @param location
     */
    public boolean addAvailability(Time start, Time end, Location location) {
        Availability toAdd = new Availability(start, end, location, this.date);
        return availabilities.add(toAdd);
    }

    public boolean addAvailability(Availability toAdd) {
        return availabilities.add(toAdd);
    }
    
    public boolean removeAvailability(Availability toRemove) {
        return availabilities.removeIf((Availability toCompare) -> {
            return toCompare.getStartTime().compareTo(toRemove.getStartTime()) == 0;
        });
    }

    public ArrayList<Availability> getAvailabilities() {
        return new ArrayList<Availability>(availabilities);
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

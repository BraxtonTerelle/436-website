package com.CSC436Group12.backend;

import java.io.Serializable;

public class Availability implements Serializable {
    private static final long serialVersionUID = 2;

    public enum Location {
        Phoenix, Tucson
    }

    private Date date;
    private Time startTime;
    private Time endTime;
    private Location location;

    public Availability(Time startTime, Time endTime, Location location, Date date) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.date = date;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time toSet) {
        this.startTime = toSet;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time toSet) {
        this.endTime = toSet;
    }

    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location toSet) { 
        this.location = toSet;
    }
    
    public Date getDate() {
    	return this.date;
    }
    
    public void setDate(Date date) {
    	this.date = date;
    }

    /**
     * @return true if the provided time falls within (ignoring days)
     */
    public boolean withinRange(Time toCompare) {
        return (toCompare.compareTo(startTime) >= 0 && toCompare.compareTo(endTime) <= 0);
    }

    public boolean withinRange(Appointment toCompare) {
        Time apptEnd = new Time(toCompare.getTime().getHour(), toCompare.getTime().getMinute());
        apptEnd.increment(toCompare.getDuration());
        
        return withinRange(toCompare.getTime()) && withinRange(apptEnd);
    }

}

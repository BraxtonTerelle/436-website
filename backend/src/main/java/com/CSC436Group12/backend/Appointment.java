package com.CSC436Group12.backend;

import java.io.Serializable;

public class Appointment implements Serializable {
    private static final long serialVersionUID = 2;

    private Date date;
    private Time time;
    private Time duration;
    private User user;
    private ContactInfo contactInfo;

    private AptStatus status;

    public Appointment(Date date, Time time, Time duration){
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.user = null;
        this.contactInfo = null;
        this.status = AptStatus.BOOKED;
    }

    public Appointment(Date date, Time time, Time duration, User user){
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.user = user;
        this.contactInfo = null;
        this.status = AptStatus.BOOKED;
    }

    public Appointment(Date date, Time time, Time duration, ContactInfo contactInfo){
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.user = null;
        this.contactInfo = contactInfo;
        this.status = AptStatus.BOOKED;
    }

    public Appointment(Date date, Time time, Time duration, User user, ContactInfo contactInfo){
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.user = user;
        this.contactInfo = contactInfo;
        this.status = AptStatus.BOOKED;
    }

    public void setStatus(AptStatus toSet) {
        this.status = toSet;
    }

    public AptStatus getStatus() {
        return this.status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Time getDuration() { return duration; }

    public void setDuration(Time duration) { this.duration = duration; }

    public User getUser() {
        return user;
    }

    public void setUser(User toSet) { 
        this.user = toSet;
    }

    public ContactInfo getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String toJSON(){
        return date + " - " + getTime() + "   <<<   " + contactInfo;
    	//return "";
    }

}

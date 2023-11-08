package com.CSC436Group12.backend;

public class Appointment {

    private Date date;
    private Time time;
    private Time duration;
    private User user;
    private ContactInfo contactInfo;

    private Boolean completed;

    public Appointment(Date date, Time time, Time duration){
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.user = null;
        this.contactInfo = null;
        this.completed = false;
    }

    public Appointment(Date date, Time time, Time duration, User user){
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.user = user;
        this.contactInfo = null;
        this.completed = false;
    }

    public Appointment(Date date, Time time, Time duration, ContactInfo contactInfo){
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.user = null;
        this.contactInfo = contactInfo;
        this.completed = false;
    }

    public Appointment(Date date, Time time, Time duration, User user, ContactInfo contactInfo){
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.user = user;
        this.contactInfo = contactInfo;
        this.completed = false;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
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

    public ContactInfo getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String toJSON(){
        return "";
    }

}

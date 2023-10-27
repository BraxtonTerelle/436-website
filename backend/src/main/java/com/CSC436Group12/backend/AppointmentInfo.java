package com.CSC436Group12.backend;

public class AppointmentInfo {

    private Date date;
    private Time time;
    private String name;
    private String phoneNumber;

    private Boolean completed;

    public AppointmentInfo(Date date, Time time, String name, String phoneNumber){
        this.date = date;
        this.time = time;
        this.name = name;
        this.phoneNumber = phoneNumber;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String toJSON(){
        return "{ \"date\": \"" + date.toString() + "\", \"time\": \"" + time.toString() + "\", \"name\": \"" + name + "\", \"phoneNumber\": \"" + phoneNumber + "\" }";
    }

}

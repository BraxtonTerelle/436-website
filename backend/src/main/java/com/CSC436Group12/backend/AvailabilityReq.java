package com.CSC436Group12.backend;

public class AddAvailability {
    private Date date;
    private Availability availability;
    public AddAvailability(Date date, Availability availability) {
        this.date = date;
        this.availability = availability;
    }

    public Date getDate() {
        return date;
    }

    public Availability getAvailability() {
        return availability;
    }

}

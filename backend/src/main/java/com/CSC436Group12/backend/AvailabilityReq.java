package com.CSC436Group12.backend;

public class AvailabilityReq {
    private Date date;
    private Availability availability;
    public AvailabilityReq(Date date, Availability availability) {
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

package com.CSC436Group12.backend;

public class deleteAppointmentBody {

    private Date date;

    private Time time;

    public deleteAppointmentBody(Date date, Time time) {
        this.date = date;
        this.time = time;
    }

    public Date getDate() {
        return this.date;
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

}

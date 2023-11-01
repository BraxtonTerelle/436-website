package com.CSC436Group12.backend;

public class ReserveBody {
    public class Flags {
        String userID;
        String ip;
        Flags(String userID, String ip) {
            this.userID = userID;
            this.ip = ip;
        }
        Flags() {

        }
    }
    private Date date;
    private Time time;
    private Duration duration;
    private Flags flags;

    // ReserveBody(Date date, Time time, Duration duration, Flags flags) {
    //     this.date = date;
    //     this.time = time;
    //     this.duration = duration;
    //     this.flags = flags;
    // }

    public ReserveBody(Date date, Time time, Duration duration) {
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.flags = new Flags();
    }

    // ReserveBody() {
    //     this.date = new Date(11, 3, 2023);
    //     this.time = new Time(15, 15);
    //     this.duration = new Duration(0, 20);
    // }

    public String toString() {
        return "Appointment Reservation at " + time + ", " + date +  " held for " + duration + ".";
    }
}
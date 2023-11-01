package com.CSC436Group12.backend;

public class Duration {
    private int hours;
    private int minutes;

    public Duration(int hours, int minutes) {
        this.hours = hours;
        this.minutes = minutes;
    }

    public void setHours(int toSet) {
        hours = toSet;
    }

    public int getHours() {
        return hours;
    }

    public void setMinutes(int toSet) {
        minutes = toSet;
    }

    public int getMinutes() {
        return minutes;
    }

    public String toString() {
        return "" + hours + " hours and " + minutes + " minutes";
    }
}

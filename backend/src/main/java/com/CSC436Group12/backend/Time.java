package com.CSC436Group12.backend;

import java.io.Serializable;

public class Time implements Serializable{
    private static final long serialVersionUID = 1;

    private int hour;
    private int minute;

    public Time(int hour, int minute){
        this.hour = hour;
        this.minute = minute;
    }

    public String toString(){
        return hour + ":" + minute;
    }
    
    public int getHour() {
    	return hour;
    }
    
    public int getMinute() {
    	return minute;
    }
    
    public void setHour(int hour) {
    	this.hour = hour;
    }
    
    public void setMinute(int minute) {
    	this.minute = minute;
    }

    /**
     * Advances this time forward by the given amount.
     * Reduces minutes to hours and excess hours past
     * 24 back.
     * @param hourPlus hours to increase
     * @param minutePlus minutes to increase
     * @return the number of days advanced, if any.
     */
    public int increment(int hourPlus, int minutePlus) {
        this.hour += hourPlus;
        this.minute += minutePlus;

        this.hour += this.minute / 60;
        this.minute = this.minute % 60;

        int daysCarried = this.hour / 24;
        this.hour = this.hour % 24;

        return daysCarried;
    }
    /**
     * Advances forward the calling Time object by
     * an amount of hr/minutes as given within the
     * argument Time object.
     * @param otherTime
     * @return the number of days advanced, if any.
     */
    public int increment(Time otherTime) {
        return this.increment(otherTime.getHour(), otherTime.getMinute());
    }

    public int compareTo(Time otherTime){
        if(this.hour > otherTime.hour) return 1;
        else if(this.hour < otherTime.hour) return -1;
        else{
            if(this.minute > otherTime.minute) return 1;
            else if(this.minute < otherTime.minute) return -1;
            else return 0;
        }
    }
}

package com.CSC436Group12.backend;

public class Time {

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

}

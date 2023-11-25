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

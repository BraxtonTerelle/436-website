package com.CSC436Group12.backend;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZoneId;

public class Date implements Serializable {
    private static final long serialVersionUID = 1;

    private int month;
    private int day;
    private int year;

    public Date(int month, int day, int year){
        this.month = month;
        this.day = day;
        this.year = year;
    }

    public String toString(){
        return month + "-" + day + "-" + year;
    }
    
    public int getMonth() {
    	return month;
    }
    
    public int getDay() {
    	return day;
    }
    
    public int getYear() {
    	return year;
    }
    
    public void setMonth(int month) {
    	this.month = month;
    }
    
    public void setDay(int day) {
    	this.day = day;
    }
    
    public void setYear(int year) {
    	this.year = year;
    }

    public int compareTo(Date otherDate){
        if(this.year > otherDate.year) return 1;
        else if(this.year < otherDate.year) return -1;
        else{
            if(this.month > otherDate.month) return 1;
            else if(this.month < otherDate.month) return -1;
            else{
                if(this.day > otherDate.day) return 1;
                else if(this.day < otherDate.day) return -1;
                else return 0;
            }
        }
    }

    // Returns a date for today, to ease testing.
    // It may also be wise to just convert to using the proper date
    // from java.time completely.
    public static Date getToday() {
        // the modern java date implementation, apparently.
        // see: https://stackoverflow.com/questions/5046771/how-to-get-todays-date
        // for a longer explanation.
        ZoneId zoneId = ZoneId.of("US/Arizona");
        LocalDate today = LocalDate.now(zoneId);
        Date toReturn = new Date(today.getMonthValue(), today.getDayOfMonth(), today.getYear());
        return toReturn;
    }

}

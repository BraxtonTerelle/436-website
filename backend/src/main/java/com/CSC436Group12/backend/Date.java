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

}

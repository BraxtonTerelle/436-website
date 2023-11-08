package com.CSC436Group12.backend;

public class Date {

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
    	return month;
    }
    
    public int getYear() {
    	return month;
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

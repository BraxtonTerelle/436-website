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

}

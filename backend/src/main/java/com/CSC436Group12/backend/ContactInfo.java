package com.CSC436Group12.backend;

import java.io.Serializable;

public class ContactInfo implements Serializable {
    private static final long serialVersionUID = 1;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;

    public ContactInfo(String firstName, String lastName, String email, String phoneNumber){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    
    public String getFirstName() {
    	return firstName;
    }
    
    public String getLastName() {
    	return lastName;
    }
    
    public String getEmail() {
    	return email;
    }
    
    public String getPhoneNumber() {
    	return phoneNumber;
    }
    
    public void setFirstName(String firstName){
    	this.firstName = firstName;
    }
    
    public void setLastName(String lastName){
    	this.lastName = lastName;
    }
    
    public void setEmail(String email){
    	this.email = email;
    }
    
    public void setPhoneNumber(String phoneNumber){
    	this.phoneNumber = phoneNumber;
    }

    public String toString() {
    	
    	return getLastName() + ", " + getFirstName() + ": " + getPhoneNumber();
    }
}
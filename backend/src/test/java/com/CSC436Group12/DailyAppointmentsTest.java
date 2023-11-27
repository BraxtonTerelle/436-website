package com.CSC436Group12;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import com.CSC436Group12.backend.Appointment;
import com.CSC436Group12.backend.DailyAppointments;
import com.CSC436Group12.backend.Date;
import com.CSC436Group12.backend.Time;
import com.CSC436Group12.backend.Availability.Location;

public class DailyAppointmentsTest {
    @Test
    void testDates() {
        DailyAppointments defaultApts = new DailyAppointments(new Date(11, 24, 2023));
        assertEquals(0, defaultApts.getDate().compareTo(new Date(11, 24, 2023)));
        Appointment starter = new Appointment(new Date(11, 25, 2023), new Time(1, 30), new Time(1, 0));
        DailyAppointments otherAppointments = new DailyAppointments(starter.getDate(), starter);
        assertEquals(-1, defaultApts.getDate().compareTo(otherAppointments.getDate()));
    }

    @Test
    void testCreateAppointment() {
        DailyAppointments empty = new DailyAppointments(Date.getToday());
        empty.addAvailability(new Time(10, 0), new Time(15, 30), Location.Tucson);
        assertTrue(empty.createAppointment(new Time(11, 30), new Time(0, 45)));
        assertNotEquals("", empty.toString());
        assertNotNull(empty.getAppointment(new Time(11, 30)));

        assertAll("cannot insert at times outside available", 
            () -> assertFalse(empty.createAppointment(new Time(9, 0), new Time(0, 30))),
            () -> assertFalse(empty.createAppointment(new Time(9, 45), new Time(0, 45))),
            () -> assertFalse(empty.createAppointment(new Time(15, 0), new Time(1, 0))),
            () -> assertFalse(empty.createAppointment(new Time(23, 59), new Time(0, 0)))
        );

        assertAll("cannot insert overlapping times",
            () -> assertFalse(empty.createAppointment(new Time(11, 15), new Time(0, 30))),
            () -> assertFalse(empty.createAppointment(new Time(11, 30), new Time(0, 45))),
            () -> assertFalse(empty.createAppointment(new Time(11, 45), new Time(0, 30))),
            () -> assertFalse(empty.createAppointment(new Time(12, 0), new Time(0, 5))),
            () -> assertFalse(empty.createAppointment(new Time(12, 5), new Time(1, 0)))
        );
    }

    @Test
    void testSaveAndLoad() {
        DailyAppointments toSave = new DailyAppointments(new Date(11, 24, 2023));
        toSave.addAvailability(new Time(11, 0), new Time(20, 0), Location.Pheonix);
        toSave.createAppointment(new Time(11, 30), new Time(0, 30));
        toSave.createAppointment(new Time(15, 0), new Time(1, 0));
        assertTrue(toSave.writeAppointments("testA"));
        DailyAppointments toLoad = new DailyAppointments(new Date(12, 3, 2023));
        
        // I changed it to return null
        assertNull(toLoad.getAppointment(new Time(11, 30)));

        assertTrue(toLoad.readAppointments("testA2023-11-24.ser"));
        Appointment loadedAppointment = toLoad.getAppointment(new Time(11, 30));
        Appointment otherAppointment = toLoad.getAppointment(new Time(15, 0));
        assertEquals(30, loadedAppointment.getDuration().getMinute());
        assertEquals(1, otherAppointment.getDuration().getHour());
    }
}

package com.CSC436Group12;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.CSC436Group12.backend.Date;
import com.CSC436Group12.backend.Duration;
import com.CSC436Group12.backend.ReserveBody;
import com.CSC436Group12.backend.Time;


public class ReserveBodyTest {
    @Test
    void constructorWorks() {
        Date exampleDate = new Date(11, 1, 2023);
        Duration defaultDuration = new Duration(0, 20);
        Time exampleTime = new Time(11, 45);
        ReserveBody toTest = new ReserveBody(exampleDate, exampleTime, defaultDuration);

        assertEquals("Appointment Reservation at 11:45, 11-1-2023 held for 0 hours and 20 minutes.", toTest.toString());
    }
}

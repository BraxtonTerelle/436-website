import Footer from "../components/Footer";
import "../styles/Appointments.css";
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";



function AppointmentsPage() {
    const [selectedDate, setSelectedDate] = useState(null);

    function handleDateChange(date) {
      setSelectedDate(date);
    }

  function getAppointmentsRange() {
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    //var url = 'https://jsonplaceholder.typicode.com/posts';

    /*var url = "http://localhost:8080/getAppointments?date=%2210/20/2023";

    console.log(startDate);
    console.log(endDate);

    fetch(url)
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        document.getElementById("res1Div").innerText = JSON.stringify({
          date: { month: 10, day: 25, year: 2023 },
          time: { hour: 11, minute: 15 },
          duration: { hour: 2, minute: 0 },
          contactInfo: {
            firstName: "Kharizia",
            lastName: "Ramos",
            email: "kharizia@arizona.edu",
            phoneNumber: "111-222-3333",
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });*/
    document.getElementById("res1Div").innerText = JSON.stringify({
      date: { month: 10, day: 25, year: 2023 },
      time: { hour: 11, minute: 15 },
      duration: { hour: 2, minute: 0 },
      contactInfo: {
        firstName: "Kharizia",
        lastName: "Ramos",
        email: "kharizia@arizona.edu",
        phoneNumber: "111-222-3333",
      },
    });
  }

  function getAppointments() {

    var url = 'http://localhost:8080/getAppointments';

    fetch(url)
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        console.log(text);
        document.getElementById("res2Div").innerText = text;
      })
      .catch((err) => {
        console.error(err);
      });

    
      

      /*
    document.getElementById("res2Div").innerText = JSON.stringify({
      date: { month: 10, day: 22, year: 2023 },
      time: { hour: 10, minute: 45 },
      duration: { hour: 1, minute: 30 },
      contactInfo: {
        firstName: "Jake",
        lastName: "Gridley",
        email: "jake@arizona.edu",
        phoneNumber: "111-222-3333",
      },
    });
    */
  }



  /*
  function createAppointment() {
    var url = `http://localhost:8080/createAppointment`;
    var body = {
      date: {
        month: 10,
        day: 20,
        year: 2023,
      },
      time: {
        hour: 13,
        minute: 30,
      },
      duration: {
        hours: 2,
        minutes: 0,
      },
      contactInfo: {
        firstName: "Braxton",
        lastName: "Little",
        email: "braxton@arizona.edu",
        phoneNumber: "111-222-3333",
      },
    };

    fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((text) => {
        text.json().then((result) => {
          document.getElementById("res3Div").innerText = JSON.stringify(result);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }*/

  function deleteAppointment() {

    var dateObj = selectedDate.$d;

    const jsonObj = {
      date: {
        month: dateObj.getMonth() + 1,
        day: dateObj.getDate(),
        year: dateObj.getFullYear(),
      },
      time: {
        hour: dateObj.getHours(),
        minute: dateObj.getMinutes(),
      },
    }

    var url = "http://localhost:8080/deleteAppointment";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObj),
    })
      .then((res) => {
        if (res.status === 200) {
          document.getElementById("deleteResDiv").innerText = "Success";
        } else {
          document.getElementById("deleteResDiv").innerText = "Failed";
        }
      })
      .catch((err) => {
        console.log(err);
      });

    

  }
  return (
    <>
      <div className="titleContainer">
        <h1 className="titleHeader">Hair by Kharizia</h1>
      </div>
      <div id="aptsPage">
        

        <div class="aptsBox" id="viewDateDiv">
          <div id="input2Div">
            View Appointments:
            <br></br>
            
            <button id="searchDate" onClick={getAppointments}>
              Get Appointments
            </button>
          </div>

          <br></br>
          <div id="res2Div"></div>
          <br></br>
          <br></br>
          <br></br>
        </div>

        <div>Delete Appointment For The Following Date:</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDateTimePicker
                        ampm={false}
                        ampmInClock={false}
                        disablePast={true}
                        //maxTime={//maxTime}
                        value={selectedDate}
                        onChange={handleDateChange}
                        sx={{
                          marginTop: "40px",
                          marginBottom: "40px",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          "&.MuiDateCalendar-root": {
                            height: "500px",
                            width: "600px",
                          },
                        }}
                      />
        </LocalizationProvider>
        <button onClick={deleteAppointment}>Delete Appointment</button>
        
        <div id="deleteResDiv">

        </div>

        <br></br>
      </div>

      <Footer color="secondary" />
    </>
  );
}

export default AppointmentsPage;

import Footer from "../components/Footer";
import TextField from "@mui/material/TextField";
import "../styles/Admin.css";
import colorPalette from "../components/colorPalette";
import BookButton from "../components/BookButton";
import { useEffect, useState } from "react";
import WeeklyHour from "../components/WeeklyHour";
import UnavailableDate from "../components/UnavailableDate";
import AddIcon from "@mui/icons-material/Add";
import UniversalPopup from "../components/UniversalPopup";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppointmentButton from "../components/AppointmentButton";
import "../styles/AppointmentButton.css";

function Admin() {
  const [sunCheck, setSunCheck] = useState(false);
  const [monCheck, setMonCheck] = useState(true);
  const [tueCheck, setTueCheck] = useState(true);
  const [wedCheck, setWedCheck] = useState(true);
  const [thuCheck, setThuCheck] = useState(true);
  const [friCheck, setFriCheck] = useState(true);
  const [satCheck, setSatCheck] = useState(false);

  const [sunAvail, setSunAvail] = useState(["9:00am-5:00pm"]);
  const [monAvail, setMonAvail] = useState(["9:00am-5:00pm"]);
  const [tueAvail, setTueAvail] = useState(["9:00am-5:00pm"]);
  const [wedAvail, setWedAvail] = useState(["9:00am-5:00pm"]);
  const [thuAvail, setThuAvail] = useState(["9:00am-5:00pm"]);
  const [friAvail, setFriAvail] = useState(["9:00am-5:00pm"]);
  const [satAvail, setSatAvail] = useState(["9:00am-5:00pm"]);

  const [unavail, setUnavail] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const [appointments, setAppointments] = useState([]);

  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getAppointments();
  }, []);

  function getAppointments() {
    var url = "http://localhost:8080/getAppointments";

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((jsonObj) => {
        console.log(jsonObj);
        setAppointments(jsonObj);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteAppt(appointment) {
    var url = "http://localhost:8080/deleteAppointment";

    const obj = {
      date: {
        month: appointment.date.month,
        day: appointment.date.day,
        year: appointment.date.year,
      },
      time: {
        hour: appointment.time.hour,
        minute: appointment.time.minute,
      },
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        console.log(text);
        getAppointments();
        alert("You have successfully deleted this appointment");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function saveAvailability() {
    // If any days are marked as unavailable then clear that day's
    // availability time slots
    if (!sunCheck) {
      setSunAvail([]);
    }
    if (!monCheck) {
      setMonAvail([]);
    }
    if (!tueCheck) {
      setTueAvail([]);
    }
    if (!wedCheck) {
      setWedAvail([]);
    }
    if (!thuCheck) {
      setThuAvail([]);
    }
    if (!friCheck) {
      setFriAvail([]);
    }
    if (!satCheck) {
      setSatAvail([]);
    }

    console.log(
      "Sunday: ",
      sunAvail,
      "\n",
      "Monday: ",
      monAvail,
      "\n",
      "Tuesday: ",
      tueAvail,
      "\n",
      "Wednesday: ",
      wedAvail,
      "\n",
      "Thursday: ",
      thuAvail,
      "\n",
      "Friday: ",
      friAvail,
      "\n",
      "Saturday: ",
      satAvail,
      "\n"
    );

    var obj = [];
    Object.keys(unavail).forEach((date) => {
      const timeRanges = unavail[date];
      const dateArr = date.split("/");
      var arr = splitTimes(timeRanges.toString());
      obj.push({
        date: {
          month: parseInt(dateArr[0]),
          day: parseInt(dateArr[1]),
          year: parseInt(dateArr[2]),
        },
        availability: {
          startTime: arr[0],
          endTime: arr[1],
        },
      });
    });

    // Parse through all arrays and check formatting
    for (var i = 0; i < obj.length; i++) {
      addAvailability(obj[i]);
    }

    // Send availability to backend to be saved
  }

  function addAvailability(obj) {
    console.log("object to send", obj);
    var url = "http://localhost:8080/addAvailability";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function splitTimes(value) {
    var times = value.split("-");
    var startTimeArr = times[0].split(":");
    var endTimeArr = times[1].split(":");

    var isPmStartTime = startTimeArr[1].toLowerCase().includes("pm");
    var isPmEndTime = endTimeArr[1].toLowerCase().includes("pm");

    var startInt = parseInt(startTimeArr[0]);
    if (isPmStartTime) {
      startInt += 12;
    }
    if (isPmEndTime) {
      endInt += 12;
    }

    var endInt = parseInt(endTimeArr[0]);

    var startTimeObject = {
      hour: startInt,
      minute: parseInt(startTimeArr[1]),
    };

    var endTimeObject = {
      hour: endInt,
      minute: parseInt(endTimeArr[1]),
    };
    return [startTimeObject, endTimeObject];
  }

  function getFormattedDate(readDate) {
    var formattedDate = new Date(readDate);
    formattedDate =
      formattedDate.getMonth() +
      1 +
      "/" +
      formattedDate.getDate() +
      "/" +
      formattedDate.getFullYear();

    return formattedDate;
  }

  function unavailableDateSelected(newVal) {
    document.body.style.overflowY = "scroll";

    var formattedDate = getFormattedDate(newVal.$d);
    unavail[formattedDate] = ["9:00am-5:00pm"];
    var unavailCopy = Object.assign({}, unavail);
    setUnavail(unavailCopy);

    setShowCalendar(false);
  }

  // Disable day on calendar if we already have time slots for it
  // in unavail
  function shouldDisableDate(date) {
    var formattedDate = getFormattedDate(date.$d);
    return formattedDate in unavail;
  }

  return (
    <>
      <div className="titleContainer">
        <h1 className="titleHeader">Hair by Kharizia</h1>
      </div>

      <div className="section" id="contentDiv">
        <div id="paddedContainer">
          {signedIn ? (
            <div className="availabilityContainer">
              <div className="availabilityContent">
                <div className="weeklyHoursContainer">
                  <h3 style={{ marginLeft: "10px", marginBottom: "20px" }}>
                    Weekly Hours
                  </h3>
                  <WeeklyHour
                    name="SUN"
                    checked={sunCheck}
                    setChecked={setSunCheck}
                    availability={sunAvail}
                    setAvailability={setSunAvail}
                  />
                  <WeeklyHour
                    name="MON"
                    checked={monCheck}
                    setChecked={setMonCheck}
                    availability={monAvail}
                    setAvailability={setMonAvail}
                  />
                  <WeeklyHour
                    name="TUE"
                    checked={tueCheck}
                    setChecked={setTueCheck}
                    availability={tueAvail}
                    setAvailability={setTueAvail}
                  />
                  <WeeklyHour
                    name="WED"
                    checked={wedCheck}
                    setChecked={setWedCheck}
                    availability={wedAvail}
                    setAvailability={setWedAvail}
                  />
                  <WeeklyHour
                    name="THU"
                    checked={thuCheck}
                    setChecked={setThuCheck}
                    availability={thuAvail}
                    setAvailability={setThuAvail}
                  />
                  <WeeklyHour
                    name="FRI"
                    checked={friCheck}
                    setChecked={setFriCheck}
                    availability={friAvail}
                    setAvailability={setFriAvail}
                  />
                  <WeeklyHour
                    name="SAT"
                    checked={satCheck}
                    setChecked={setSatCheck}
                    availability={satAvail}
                    setAvailability={setSatAvail}
                  />
                </div>
                <div className="specificHoursContainer">
                  <h3 style={{ marginLeft: "10px", marginBottom: "20px" }}>
                    Date-specific hours
                  </h3>
                  <p
                    style={{
                      marginLeft: "10px",
                      marginBottom: "20px",
                      color: "gray",
                    }}
                  >
                    Override your availability for specific dates when your
                    hours differ from your regular weekly hours.
                  </p>
                  <button
                    onClick={() => {
                      setShowCalendar(true);
                      document.body.style.overflowY = "hidden";
                    }}
                    className="addSpecificDate"
                    style={{
                      borderRadius: "15px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 15px 10px 15px",
                      fontSize: "18px",
                      backgroundColor: "white",
                      margin: "0 0 20px 10px",
                    }}
                  >
                    <AddIcon
                      style={{ marginRight: "5px" }}
                      color="black"
                      fontSize="small"
                    >
                      +
                    </AddIcon>
                    Add date-specific hours
                  </button>
                  <div className="specificDatesContainer">
                    {Object.keys(unavail).map((dateKey, index) => (
                      <UnavailableDate
                        key={index}
                        name={dateKey}
                        availability={unavail[dateKey]}
                        setAvailability={(newAvail) => {
                          if (newAvail.length == 0) {
                            // If we're deleting the last time-slot for a day, just remove
                            // that day from unavail map
                            delete unavail[dateKey];
                          } else {
                            unavail[dateKey] = newAvail;
                            // Create copy of unavail and re-assign it
                            // to force a re-render
                          }
                          var unavailCopy = { ...unavail };
                          setUnavail(unavailCopy);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <BookButton
                label="Save Changes"
                type="primary"
                onClick={saveAvailability}
              />
              <br></br>
              <div>
                <div id="apptsDivContainer">
                  <div id="appointmentsDiv">
                    <button onClick={getAppointments}>
                      Update Appointments List
                    </button>
                    <div id="aptsResDiv">
                      {appointments.map((appointment, index) => (
                        <AppointmentButton
                          key={index}
                          appointment={appointment}
                          onClick={deleteAppt}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                id="loginUser"
                label="User Name"
                variant="outlined"
                value={username}
                onChange={(newVal) => {
                  setUsername(newVal.target.value);
                }}
                sx={{ marginBottom: "15px", backgroundColor: "white" }}
              />
              <TextField
                id="loginUser"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(newVal) => {
                  setPassword(newVal.target.value);
                }}
                sx={{ marginBottom: "15px", backgroundColor: "white" }}
              />
              <BookButton
                label="Sign In"
                type="primary"
                onClick={() => {
                  if (username === "admin1" && password === "pass1") {
                    setSignedIn(true);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      <UniversalPopup visible={showCalendar}>
        <div
          style={{
            backgroundColor: "white",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          {" "}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              shouldDisableDate={shouldDisableDate}
              disablePast={true}
              sx={{ width: "500px", height: "500px" }}
              onChange={unavailableDateSelected}
            />
          </LocalizationProvider>
          <BookButton
            label="Cancel"
            type="primary"
            onClick={() => {
              document.body.style.overflowY = "scroll";
              setShowCalendar(false);
            }}
          />
        </div>
      </UniversalPopup>

      <Footer color="secondary" />
    </>
  );
}

export default Admin;

import "../styles/PopupContainer.css";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from "@mui/material/IconButton";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Menu, MenuItem, StepLabel } from "@mui/material";
import StepContent from "@mui/material/StepContent";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import BookButton from "./BookButton.js";
import ServiceItem from "./ServiceItem";
import UniversalPopup from "./UniversalPopup";
import emailjs from "emailjs-com";
import dayjs from "dayjs";
import { DigitalClock, DateCalendar } from "@mui/x-date-pickers";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function PopupContainer({ active, setActive }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [availabilities, setAvailabilities] = useState([]);

  function getAvailability() {
    var url = "http://localhost:8080/getAvailabilities";

    const date = {
      month: 0,
      day: 0,
      year: 0,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonObj) => {
        console.log(jsonObj);
        setAvailabilities(jsonObj);
      });
  }

  const stepLabels = [
    "Choose Service",
    "Choose Date and Time",
    "Enter Contact Information",
  ];

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  function handleContinue() {
    setActiveStep(activeStep + 1);
  }

  function handleExit() {
    setActiveStep(0);
    document.body.style.overflowY = "scroll";
    setActive(false);
  }

  function handleDateChange(date) {
    setSelectedDate(date);
    getAvailability(date);
  }

  function handlePhoneChange(event) {
    setPhoneNumber(event.target.value);
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function submitForm(form) {
    emailjs
      .sendForm("service_5a6c5pr", "contact_form", form, "-lCn9pWg2EQK_ZcRl")
      .then(
        (result) => {
          //alert("Successfully sent email");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  function createForm(from_email, subject, from_name, givenMessage) {
    var form = document.createElement("form");
    var fromEmail = document.createElement("input");
    fromEmail.name = "from_email";
    fromEmail.setAttribute("value", from_email);
    var subjectInput = document.createElement("input");
    subjectInput.name = "subject";
    subjectInput.setAttribute("value", subject);
    var fromName = document.createElement("input");
    fromName.name = "from_name";
    fromName.setAttribute("value", from_name);
    var message = document.createElement("input");
    message.name = "message";
    message.setAttribute("value", givenMessage);
    form.appendChild(fromEmail);
    form.appendChild(subjectInput);
    form.appendChild(fromName);
    form.appendChild(message);
    submitForm(form);

    function handleServiceChange(event) {
      setService(event.target.value);
    }

    function callCreateApptAPI() {
      createForm(
        email,
        "Appointment Confirmed!",
        firstName,
        "Kharizia's Hair has received your appointment and confirmed it within our records. See you soon!"
      );

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
        duration: {
          hours: 0,
          minutes: 20,
        },
        contactInfo: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
        },
      };

      var url = "http://localhost:8080/createAppointment";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObj),
      })
        .then((res) => {
          if (res) {
            res.json();
          }
        })
        .then((jsonRes) => {
          console.log(jsonRes);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(jsonObj);

      alert("Your Booking is Confirmed");
      setActive(false);
    }

    function setTimeSlot(slotTime) {
      const availHoursStart = new Date(
        slotTime.getFullYear(),
        slotTime.getMonth(),
        slotTime.getDate(),
        9,
        0,
        0
      );

      const availHoursEnd = new Date(
        slotTime.getFullYear(),
        slotTime.getMonth(),
        slotTime.getDate(),
        20,
        0,
        0
      );

      const isValid =
        slotTime.getTime() > availHoursStart.getTime() &&
        slotTime.getTime() < availHoursEnd.getTime();
      return isValid;
    }

    const shouldDisableDateTime = (dateTime) => {
      return !availabilities.some((range) => {
        isDateTimeInRange(dateTime, range);
      });
    };

    function isDateTimeInRange(dateTime, range) {
      return (
        dateTime.getTime() >= range.start.getTime() &&
        dateTime.getTime() <= range.end.getTime()
      );
    }

    // if the "active" useState variable is true, display the popup. Otherwise display nothing
    return (
      <UniversalPopup visible={active}>
        <div className="contentContainer">
          <div className="cancelBox">
            <IconButton onClick={handleExit}>
              <CloseIcon fontSize="large" sx={{ color: "#000000" }} />
            </IconButton>
          </div>
          <div className="innerContentContainer">
            <Stepper
              style={{ paddingTop: "10px", paddingBottom: "15px" }}
              activeStep={activeStep}
              orientation="vertical"
            >
              <Step key={stepLabels[0]}>
                <StepLabel>{stepLabels[0]}</StepLabel>
                <StepContent className="servicesPopupContainer">
                  <div
                    style={{
                      display: "flex",
                      maxWidth: "1200px",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <ServiceItem
                      title="Box Braids"
                      price="$70"
                      timeEstimate="4 Hours"
                      type="checkbox"
                    />
                    <ServiceItem
                      title="Extensions"
                      price="$40"
                      timeEstimate="3 Hours"
                      type="checkbox"
                    />
                    <ServiceItem
                      title="Partial Highlights"
                      price="$40"
                      timeEstimate="2 Hours"
                      type="checkbox"
                    />
                    <ServiceItem
                      title="Full Highlights"
                      price="$60"
                      timeEstimate="3 Hours"
                      type="checkbox"
                    />
                    <ServiceItem
                      title="Micro Braids"
                      price="$40"
                      timeEstimate="2 Hours"
                      type="checkbox"
                    />
                    <ServiceItem
                      title="Twists"
                      price="$40"
                      timeEstimate="2 Hours"
                      type="checkbox"
                    />
                    <ServiceItem
                      title="French Braids"
                      price="$50"
                      timeEstimate="3 Hours"
                      type="checkbox"
                    />
                    <ServiceItem
                      title="Cornrows"
                      price="$40"
                      timeEstimate="2 Hours"
                      type="checkbox"
                    />
                  </div>
                </StepContent>
              </Step>
              <Step key={stepLabels[1]}>
                <StepLabel>{stepLabels[1]}</StepLabel>
                <StepContent className="servicesPopupContainer">
                  <div className="stepContentContainer">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDateTimePicker
                        ampm={false}
                        ampmInClock={false}
                        disablePast={true}
                        //maxTime={//maxTime}
                        value={selectedDate}
                        onChange={handleDateChange}
                        shouldDisableDateTime={shouldDisableDateTime}
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
                  </div>
                </StepContent>
              </Step>
              <Step key={stepLabels[2]}>
                <StepLabel>{stepLabels[2]}</StepLabel>
                <StepContent className="servicesPopupContainer">
                  <div className="stepContentContainer">
                    <div className="confirmBookingContainer">
                      <TextField
                        id="phoneInput"
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "15px" }}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                      />
                      <div className="detailRow">
                        <TextField
                          id="firstNameInput"
                          label="First Name"
                          variant="outlined"
                          sx={{ marginRight: "30px" }}
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                        <TextField
                          id="lastNameInput"
                          label="Last Name"
                          variant="outlined"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </div>

                      <TextField
                        id="emailInput"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "15px" }}
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <TextField
                        id="customerNotesInput"
                        label="Appointment Notes (Optional)"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ marginBottom: "15px" }}
                      />
                      <BookButton
                        label="Book Now"
                        type="primary"
                        onClick={callCreateApptAPI}
                      />
                    </div>
                  </div>
                </StepContent>
              </Step>
            </Stepper>
          </div>
          <div className="bottomButtonRow">
            {activeStep !== 0 ? (
              <div style={{ marginRight: "10px" }}>
                <BookButton
                  onClick={handleBack}
                  label="Back"
                  type="secondary"
                />
              </div>
            ) : (
              <></>
            )}

            {activeStep !== 2 ? (
              <BookButton
                onClick={handleContinue}
                label="Continue"
                type="primary"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </UniversalPopup>
    );
  }
}

import "../styles/PopupContainer.css";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import IconButton from "@mui/material/IconButton";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepLabel } from "@mui/material";
import StepContent from "@mui/material/StepContent";
import { useState } from "react";
import { TextField } from "@mui/material";
import BookButton from "../components/BookButton.js";
import ServiceItem from "../components/ServiceItem";

export default function PopupContainer({ active, setActive }) {
  const [activeStep, setActiveStep] = useState(0);
  const stepLabels = [
    "Choose Service",
    "Choose Date and Time",
    "Enter Contact Information",
  ];
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

  // if the "active" useState variable is true, display the popup. Otherwise display nothing
  if (active) {
    return (
      <div className="transparentBackground">
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
                      <DateCalendar
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
                      />
                      <div className="detailRow">
                        <TextField
                          id="firstNameInput"
                          label="First Name"
                          variant="outlined"
                          sx={{ marginRight: "30px" }}
                        />
                        <TextField
                          id="lastNameInput"
                          label="Last Name"
                          variant="outlined"
                        />
                      </div>

                      <TextField
                        id="emailInput"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "15px" }}
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
                      <BookButton label="Book Now" type="primary" />
                    </div>
                  </div>
                </StepContent>
              </Step>
            </Stepper>
          </div>
          <div className="bottomButtonRow">
            {activeStep != 0 ? (
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

            {activeStep != 2 ? (
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
      </div>
    );
  }
  return <></>;
}

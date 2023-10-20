import "../styles/Home.css";
import { useState } from "react";
//import hairOption from "../components/hairOption";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TextField from "@mui/material/TextField";
function HairOption({ title, price, timeEstimate }) {
  return (
    <div className="hairItem">
      <h2 style={{ margin: "0", padding: "0" }}>
        {title} - {price}
      </h2>
      <p style={{ margin: "0", padding: "0" }}>Estimated: {timeEstimate}</p>
    </div>
  );
}

function Home() {
  const [value, onChange] = useState(new Date());
  return (
    <div className="homeContainer">
      <div className="titleContainer">
        <h1>Hair by Kharizia</h1>
      </div>
      <div className="bookContainer">
        <div id="leftHairOptions">
          <HairOption title="Box Braids" price="$70" timeEstimate="4 Hours" />
          <HairOption title="Extensions" price="$40" timeEstimate="3 Hours" />
          <HairOption
            title="Partial Highlights"
            price="$40"
            timeEstimate="2 Hours"
          />
          <HairOption
            title="Full Highlights"
            price="$60"
            timeEstimate="3 Hours"
          />
        </div>
        <div id="rightHairOptions">
          <HairOption title="Micro Braids" price="$40" timeEstimate="2 Hours" />
          <HairOption title="Twists" price="$40" timeEstimate="2 Hours" />
          <HairOption
            title="French Braids"
            price="$50"
            timeEstimate="3 Hours"
          />
          <HairOption title="Cornrows" price="$40" timeEstimate="2 Hours" />
        </div>
      </div>
      <div className="calendarContainer">
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
      <div className="confirmBookingSection">
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
          <button className="bookButton">Book Kharizia</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

import "../styles/Services.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TextField from "@mui/material/TextField";
import BookButton from "../components/BookButton.js";
import ServiceItem from "../components/ServiceItem";
import Footer from "../components/Footer.js";

function Services() {
  return (
    <>
      <div className="servicesContainer">
        <div className="titleContainer">
          <h1 className="titleHeader">Hair by Kharizia</h1>
        </div>
        <div className="bookContainer">
          <div id="leftHairOptions">
            <ServiceItem
              title="Box Braids"
              price="$70"
              timeEstimate="4 Hours"
              addons={["Colored Beads"]}
            />
            <ServiceItem
              title="Extensions"
              price="$40"
              timeEstimate="3 Hours"
              addons={["Free Shampoo"]}
            />
            <ServiceItem
              title="Partial Highlights"
              price="$40"
              timeEstimate="2 Hours"
            />
            <ServiceItem
              title="Full Highlights"
              price="$60"
              timeEstimate="3 Hours"
            />
          </div>
          <div id="rightHairOptions">
            <ServiceItem
              title="Micro Braids"
              price="$40"
              timeEstimate="2 Hours"
              addons={["Colored Beads"]}
            />
            <ServiceItem title="Twists" price="$40" timeEstimate="2 Hours" />
            <ServiceItem
              title="French Braids"
              price="$50"
              timeEstimate="3 Hours"
              addons={["Colored Beads"]}
            />
            <ServiceItem title="Cornrows" price="$40" timeEstimate="2 Hours" />
          </div>
        </div>
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
      <Footer color="secondary" />
    </>
  );
}

export default Services;

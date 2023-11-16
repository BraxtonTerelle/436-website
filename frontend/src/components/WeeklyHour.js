import Checkbox from "@mui/material/Checkbox";
import { Grow, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

function TimeSlot({
  timeRange,
  availability,
  updateAvailability,
  index,
  updateChecked,
}) {
  const dashIndex = timeRange.indexOf("-");
  const startTime = timeRange.substring(0, dashIndex);
  const endTime = timeRange.substring(dashIndex + 1);

  const [startVal, setStartVal] = useState(startTime);
  const [endVal, setEndVal] = useState(endTime);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "15px",
      }}
    >
      <TextField
        variant="outlined"
        value={startVal}
        style={{ width: "120px" }}
        inputProps={{
          style: {
            fontSize: "20px",
          },
        }} // font size of input text
        onChange={(newVal) => {
          setStartVal(newVal.target.value);
          var updatedTime = newVal.target.value + "-" + endVal;
          var newAvail = availability.slice();
          newAvail[index] = updatedTime;
          updateAvailability(newAvail);
        }}
      />
      <p style={{ marginLeft: "7px", marginRight: "7px" }}>-</p>
      <TextField
        variant="outlined"
        value={endVal}
        style={{ width: "120px" }}
        inputProps={{ style: { fontSize: "20px" } }} // font size of input text
        onChange={(newVal) => {
          setEndVal(newVal.target.value);
          var updatedTime = startVal + "-" + newVal.target.value;
          var newAvail = availability.slice();
          newAvail[index] = updatedTime;
          updateAvailability(newAvail);
        }}
      />
      <IconButton
        onClick={() => {
          var newAvail;
          if (availability.length == 1) {
            // If we're trying to delete the last time-slot for a day,
            // instead make day unavailable and put dummy time-slot in
            newAvail = ["9:00am-5:00pm"];
            updateChecked();
          } else {
            newAvail = availability.slice();
            newAvail.splice(index, 1);
          }
          updateAvailability(newAvail);
        }}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
    </div>
  );
}

function WeeklyHour({
  name,
  checked,
  setChecked,
  availability,
  setAvailability,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: "20px",
        minHeight: "80px",
      }}
    >
      <Checkbox
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
        }}
        size="large"
        sx={{
          color: "#FB6F92",
          "&.Mui-checked": {
            color: "#FB6F92",
          },
        }}
      />
      <h5 style={{ margin: "15px 15px 0 0", width: "50px" }}>{name}</h5>
      {checked && availability ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {availability.map((time, index) => (
            <TimeSlot
              key={"slot" + index}
              index={index}
              timeRange={time}
              availability={availability}
              updateAvailability={setAvailability}
              updateChecked={() => {
                setChecked(false);
              }}
            />
          ))}
        </div>
      ) : (
        <p style={{ color: "gray", margin: "15px 0 0 0", fontSize: "18px" }}>
          Unavailable
        </p>
      )}
      <IconButton
        style={{ marginLeft: "auto" }}
        onClick={() => {
          if (!checked) {
            setChecked(true);
          } else {
            const updatedAvailability = availability.concat(["9:00am-5:00pm"]);
            setAvailability(updatedAvailability);
          }
        }}
      >
        <AddIcon color="black" fontSize="large">
          +
        </AddIcon>
      </IconButton>
    </div>
  );
}

export default WeeklyHour;

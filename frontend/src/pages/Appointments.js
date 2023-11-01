import Footer from "../components/Footer";
import "../styles/Appointments.css";

function getAppointmentsRange() {
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var available = document.getElementById("availableBox").value;

  //var url = 'https://jsonplaceholder.typicode.com/posts';

  var url = "http://localhost:8080/getAppointments?date=%2210/20/2023";

  console.log(startDate);
  console.log(endDate);
  console.log(available);

  fetch(url)
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      document.getElementById("res1Div").innerText = text;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getAppointmentsDate() {
  var date = document.getElementById("date").value;
  var available = document.getElementById("availableBox").value;

  console.log(date);
  console.log(available);

  var url = `http://localhost:8080/getAppointments?date=${date}`;

  fetch(url)
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      document.getElementById("res2Div").innerText = text;
    })
    .catch((err) => {
      console.error(err);
    });
}

function AppointmentsPage() {
  return (
    <>
      <div id="aptsPage">
        <div class="aptsBox" id="viewRangeDiv">
          <div id="input1Div">
            View Appointments Between:
            <br></br>
            <input type="date" id="startDate"></input>
            <input type="date" id="endDate"></input>
            <br></br>
            <button id="searchApts" onClick={getAppointmentsRange}>
              Search
            </button>
          </div>

          <div id="res1Div"></div>
        </div>

        <div id="checkBoxDiv">
          <input type="checkbox" id="availableBox"></input>
          <label>Check To See Available Appointments</label>
        </div>

        <div class="aptsBox" id="viewDateDiv">
          <div id="input2Div">
            View Appointments On:
            <br></br>
            <input type="date" id="date"></input>
            <br></br>
            <button id="searchDate" onClick={getAppointmentsDate}>
              Search
            </button>
          </div>

          <div id="res2Div"></div>
        </div>
      </div>

      <Footer color="primary" />
    </>
  );
}

export default AppointmentsPage;

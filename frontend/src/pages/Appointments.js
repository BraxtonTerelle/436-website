import Footer from "../components/Footer";
import "../styles/Appointments.css";

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

function getAppointmentsDate() {
  var date = document.getElementById("date").value;

  console.log(date);

  /*var url = `http://localhost:8080/getAppointments?date=${date}`;

  fetch(url)
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      document.getElementById("res2Div").innerText = text;
    })
    .catch((err) => {
      console.error(err);
    });*/
    
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
}

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
}

function AppointmentsPage() {
  return (
    <>
      <div className="titleContainer">
        <h1 className="titleHeader">Hair by Kharizia</h1>
      </div>
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

        <div class="aptsBox" id="viewRangeDiv">
          <div id="input3Div">
            Create Appointment:
            <br></br>
            <input type="date" id="startDate"></input>
            <input type="date" id="endDate"></input>
            <br></br>
            <button id="searchApts" onClick={createAppointment}>
              Create
            </button>
          </div>

          <div id="res3Div"></div>
        </div>
      </div>

      <Footer color="secondary" />
    </>
  );
}

export default AppointmentsPage;

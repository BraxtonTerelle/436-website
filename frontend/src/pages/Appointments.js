
import Footer from "../components/Footer";

function getAppointments() {

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    //var url = 'https://jsonplaceholder.typicode.com/posts';

    var url = 'http://localhost:8080/getAppointments?date=%2210/20/2023';

    console.log(startDate);
    console.log(endDate);

    fetch(url)
        .then(res => {
            return res.text();
        }).then(text => {
            document.getElementById("responseDiv").innerText = text;
        }).catch(err => {
            console.error(err);
        });


}


function AppointmentsPage() {
    return (
        <>
            <div>
                View Appointments between:
                <br></br>
                <input type="date" id="startDate"></input>
                <input type="date" id="endDate"></input>
                <br></br>
                <button id="searchApts" onClick={getAppointments}>Search</button>
            </div>

            <div id="responseDiv">
            
            </div>
        </>
    )
}

export default AppointmentsPage;

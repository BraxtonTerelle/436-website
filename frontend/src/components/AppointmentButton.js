import "../styles/AppointmentButton.css";

function AppointmentButton({appointment, onClick}) {
    const { date, time, duration, contactInfo } = appointment;

    if (time.minute === 0) {
        time.minute = "00";
    }
    /*<p>Duration: {duration.hour} hours {duration.minute} minutes</p>*/

    function handleOnClick() {
        onClick(appointment);
    }

    return (
        <div className="appointmentButton">
            <p>Date: {date.month}-{date.day}-{date.year}</p>
            <p>Time: {time.hour}:{time.minute}</p>
            <p>Contact Info: {contactInfo.firstName} {contactInfo.lastName}</p>
            <p>Email: {contactInfo.email}</p>
            <p>Phone Number: {contactInfo.phoneNumber}</p>
            <button onClick={handleOnClick}>Remove Appointment</button>
        </div>
    );
}

export default AppointmentButton;

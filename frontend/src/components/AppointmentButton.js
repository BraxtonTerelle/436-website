import "../styles/AppointmentButton.css";

function AppointmentButton(props) {
    const { date, time, duration, contactInfo, onClick } = props;

    if (time.minute === 0) {
        time.minute = "00";
    }
    /*<p>Duration: {duration.hour} hours {duration.minute} minutes</p>*/

    return (
        <div className="appointmentButton">
            <p>Date: {date.month}-{date.day}-{date.year}</p>
            <p>Time: {time.hour}:{time.minute}</p>
            
            <p>Contact Info: {contactInfo.firstName} {contactInfo.lastName}</p>
            <p>Email: {contactInfo.email}</p>
            <p>Phone Number: {contactInfo.phoneNumber}</p>
        </div>
    );
}

export default AppointmentButton;

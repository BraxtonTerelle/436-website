import Footer from "../components/Footer";
import TextField from "@mui/material/TextField";
import "../styles/About.css";
import colorPalette from "../components/colorPalette";
import BookButton from "../components/BookButton";
import emailjs from "emailjs-com";
import { useState } from "react";

function About() {
  const [firstName, setFirstName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  function submitForm(form) {
    emailjs
      .sendForm("service_5a6c5pr", "contact_form", form, "-lCn9pWg2EQK_ZcRl")
      .then(
        (result) => {
          alert("Successfully sent email");
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
  }

  return (
    <>
      <div className="titleContainer">
        <h1 className="titleHeader">Hair by Kharizia</h1>
      </div>

      <div class="section about" id="aboutContentDiv">
        <div id="aboutPaddedContainer">
          <h1>About</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id ex
            sit amet leo hendrerit molestie. Duis aliquet condimentum tellus.
            Mauris a purus tincidunt, blandit justo malesuada, placerat nibh.
          </p>
          <p>
            Sed in orci placerat, tincidunt nibh ut, fringilla neque. Praesent
            blandit velit eu iaculis efficitur. Nullam ut blandit leo. Quisque
            pellentesque elit tortor, id ornare arcu finibus id. Nulla at ex sed
            justo tempus venenatis ac eu massa. In malesuada felis sit amet
            magna tempor, in maximus leo ultricies. Morbi in volutpat urna.
            Maecenas sed orci sed lectus efficitur elementum. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Sed id ex sit amet leo
            hendrerit molestie. Duis aliquet condimentum tellus. Mauris a purus
            tincidunt, blandit justo malesuada, placerat nibh.
          </p>
        </div>
      </div>

      <div class="section about" id="contactDiv">
        <h1>Contact Us!</h1>
        <div id="contactFormContainer">
          <div className="detailRow">
            <TextField
              id="firstNameInput"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(newVal) => {
                setFirstName(newVal.target.value);
              }}
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
            value={email}
            onChange={(newVal) => {
              setEmail(newVal.target.value);
            }}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            id="subjectInput"
            label="Subject"
            value={subject}
            onChange={(newVal) => {
              setSubject(newVal.target.value);
            }}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            id="customerMessageInput"
            label="Type your message here..."
            variant="outlined"
            multiline
            value={message}
            onChange={(newVal) => {
              setMessage(newVal.target.value);
            }}
            rows={4}
            fullWidth
            sx={{ marginBottom: "15px" }}
          />
          <BookButton
            onClick={() => {
              createForm(email, subject, firstName, message);
            }}
            label="Submit"
            type="primary"
          />
        </div>
      </div>

      <Footer color="primary" />
    </>
  );
}

export default About;

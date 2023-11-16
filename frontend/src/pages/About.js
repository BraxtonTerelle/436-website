import Footer from "../components/Footer";
import TextField from "@mui/material/TextField";
import "../styles/About.css";
import colorPalette from "../components/colorPalette";
import BookButton from "../components/BookButton";

function About() {
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
            id="subjectInput"
            label="Subject"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            id="customerMessageInput"
            label="Type your message here..."
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{ marginBottom: "15px" }}
          />
          <BookButton label="Submit" type="primary" />
        </div>
      </div>

      <Footer color="primary" />
    </>
  );
}

export default About;

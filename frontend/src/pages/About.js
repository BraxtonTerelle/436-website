import Footer from "../components/Footer";
import "../styles/About.css";
import colorPalette from "../components/colorPalette";

function About() {
  return (
    <>
      
        <div class="section about" id="titleDiv">
          <h1 id="header">About</h1>
        </div>

        <div class="section about" id="contentDiv">
          <div id="innerContentDiv">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id ex
            sit amet leo hendrerit molestie. Duis aliquet condimentum tellus.
            Mauris a purus tincidunt, blandit justo malesuada, placerat nibh.
            Sed in orci placerat, tincidunt nibh ut, fringilla neque. Praesent
            blandit velit eu iaculis efficitur. Nullam ut blandit leo. Quisque
            pellentesque elit tortor, id ornare arcu finibus id. Nulla at ex sed
            justo tempus venenatis ac eu massa. In malesuada felis sit amet
            magna tempor, in maximus leo ultricies. Morbi in volutpat urna.
            Maecenas sed orci sed lectus efficitur elementum.
          </div>
        </div>

        <div class="section about" id="contactDiv">
          Contact Us!
        </div>

        <Footer />
      
    </>
  );
}

export default About;

import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import "../styles/Footer.css";

function Footer(props) {
  return (
    <div
      style={{
        height: "200px",
        backgroundColor: "#ffb3c6",
        display: "flex",
        justifyContent: "center",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "5vw",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>janedoe@gmail.com</h2>
        <h2>123-456-7890</h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <a
          color="black"
          style={{ textDecoration: "None", fill: "none", marginRight: "20px" }}
          href="https://www.instagram.com"
        >
          <InstagramIcon color="black" fontSize="large" />
        </a>
        <a
          color="black"
          style={{ textDecoration: "None", fill: "none" }}
          href="https://www.gmail.com"
        >
          <EmailIcon color="black" fontSize="large" />
        </a>
      </div>
    </div>
  );
}

export default Footer;

import "../styles/Services.css";
import ServiceItem from "../components/ServiceItem";
import Footer from "../components/Footer.js";
import PopupContainer from "../components/PopupContainer";
import { useState } from "react";

function Services() {
  const [showBookingPopup, setShowBookingPopup] = useState(false);

  function revealBookingPopup() {
    // Lock the screen from scrolling while the popup is visible
    document.body.style.overflowY = "hidden";
    setShowBookingPopup(true);
  }

  return (
    <>
      <PopupContainer
        active={showBookingPopup}
        setActive={setShowBookingPopup}
      />
      <div className="servicesContainer">
        <div className="titleContainer">
          <h1 className="titleHeader">Hair by Kharizia</h1>
        </div>
        <div className="bookContainer">
          <div id="leftHairOptions">
            <ServiceItem
              title="Box Braids"
              price="$70"
              timeEstimate="4 Hours"
              onClick={revealBookingPopup}
            />
            <ServiceItem
              title="Extensions"
              price="$40"
              timeEstimate="3 Hours"
              onClick={revealBookingPopup}
            />
            <ServiceItem
              title="Partial Highlights"
              price="$40"
              timeEstimate="2 Hours"
              onClick={revealBookingPopup}
            />
            <ServiceItem
              title="Full Highlights"
              price="$60"
              timeEstimate="3 Hours"
              onClick={revealBookingPopup}
            />
          </div>
          <div id="rightHairOptions">
            <ServiceItem
              title="Micro Braids"
              price="$40"
              timeEstimate="2 Hours"
              onClick={revealBookingPopup}
            />
            <ServiceItem
              title="Twists"
              price="$40"
              timeEstimate="2 Hours"
              onClick={revealBookingPopup}
            />
            <ServiceItem
              title="French Braids"
              price="$50"
              timeEstimate="3 Hours"
              onClick={revealBookingPopup}
            />
            <ServiceItem
              title="Cornrows"
              price="$40"
              timeEstimate="2 Hours"
              onClick={revealBookingPopup}
            />
          </div>
        </div>
      </div>
      <Footer color="secondary" />
    </>
  );
}

export default Services;

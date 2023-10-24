import "../styles/Home.css";
import { useState } from "react";
//import hairOption from "../components/hairOption";
import hairModel1 from "../images/hairModel1.jpg";
import hairModel2 from "../images/hairModel2.jpg";
import hairModel4 from "../images/hairModel4.jpg";
import hairModel5 from "../images/hairModel5.jpg";
import hairModel6 from "../images/hairModel6.jpg";
import hairModel7 from "../images/hairModel7.jpg";
import hairModel8 from "../images/hairModel8.jpg";
import hairModel9 from "../images/hairModel9.jpg";
import BookButton from "../components/BookButton.js";
import Footer from "../components/Footer.js";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

function Home() {
  const [value, onChange] = useState(new Date());
  return (
    <div className="homeContainer">
      <div className="titleContainer">
        <h1 className="titleHeader">Hair by Kharizia</h1>
      </div>
      <div className="parallaxImg"></div>
      <div className="lookingForBraidsContainer">
        <img
          src={hairModel1}
          alt="Left Braids Image"
          className="braidsImg"
          style={{ marginLeft: "20px" }}
        ></img>
        <div className="lookingForBraidsContent">
          <h1 className="titleHeader">Looking for better braids?</h1>
          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <BookButton type="primary" />
        </div>
        <img
          src={hairModel2}
          alt="Right Braids Image"
          className="braidsImg"
          style={{ marginRight: "20px" }}
        ></img>
      </div>
      <div className="weeklySpecialContainer">
        <h1 className="titleHeader">This Week's Special</h1>
        <img id="weeklySpecialImg" src={hairModel5}></img>
        <h2 className="subtitleHeader" style={{ marginBottom: "60px" }}>
          Knotless braids with a customized selection of beads chosen by you!
        </h2>
        <BookButton type="secondary" />
      </div>
      <div className="popularServicesContainer">
        <h1 className="titleHeader">Popular services</h1>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          loop={true}
          speed={750}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
        >
          <SwiperSlide>
            <div className="swiperCard">
              <img
                className="swiperImg"
                src={hairModel4}
                alt="Hair Model 4"
              ></img>
              <h2 className="subtitleHeader">Women's knotless braids</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperCard">
              <img
                className="swiperImg"
                src={hairModel6}
                alt="Hair Model 6"
              ></img>
              <h2 className="subtitleHeader">Women's knotless braids</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperCard">
              <img
                className="swiperImg"
                src={hairModel7}
                alt="Hair Model 7"
              ></img>
              <h2 className="subtitleHeader">Women's knotless braids</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperCard">
              <img
                className="swiperImg"
                src={hairModel8}
                alt="Hair Model 8"
              ></img>
              <h2 className="subtitleHeader">Women's knotless braids</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiperCard">
              <img
                className="swiperImg"
                src={hairModel9}
                alt="Hair Model 9"
              ></img>
              <h2 className="subtitleHeader">Women's knotless braids</h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

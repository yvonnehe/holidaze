import { useState } from "react";
import { Carousel } from "antd";
import HeroImg1 from "../images/mao-yuqing.jpg";
import HeroImg2 from "../images/sharon-christina-rorvik.jpg";
import HeroImg3 from "../images/solveig-smordal-botn.jpg";
import HeroText from "./HeroText";

// workaround to style hero section
const Hero = () => {
  const [heroStyle, setHeroStyle] = useState({
    color: "#fff",
    textAlign: "right",
    position: "absolute",
    bottom: "10%",
    right: "5%",
    width: "60%",
    lineHeight: "55px",
    maxWidth: "700px",
    minWidth: "360px",
  });

  function getHeroStyle() {
    if (window.innerWidth > 875) {
      setHeroStyle({
        color: "#fff",
        textAlign: "right",
        position: "absolute",
        bottom: "10%",
        right: "5%",
        width: "60%",
        lineHeight: "55px",
        maxWidth: "700px",
        minWidth: "360px",
      });
    } else {
      setHeroStyle({
        color: "#fff",
        textAlign: "right",
        position: "absolute",
        bottom: "10%",
        right: "5%",
        width: "60%",
        lineHeight: "55px",
        maxWidth: "700px",
        minWidth: "360px",
      });
    }
  }
  window.onresize = () => getHeroStyle();
  window.onload = () => getHeroStyle();

  // returns
  return (
    <>
      <Carousel
        autoplay
        effect="fade"
        dotPosition={"left"}
        style={{ marginTop: "-67px" }}
      >
        <div>
          <img
            src={HeroImg1}
            alt="Bergen aero view"
            width="100%"
            className="heroimg"
          />
          <div style={heroStyle}>
            <HeroText />
          </div>
        </div>
        <div>
          <img
            src={HeroImg2}
            alt="Bergen aero view"
            width="100%"
            className="heroimg"
          />
          <div style={heroStyle}>
            <HeroText />
          </div>
        </div>
        <div>
          <img
            src={HeroImg3}
            alt="Bergen aero view"
            width="100%"
            className="heroimg"
          />
          <div style={heroStyle}>
            <HeroText />
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Hero;

import { Carousel } from "antd";
import HeroImg1 from "../images/mao-yuqing.jpg";
import HeroImg2 from "../images/sharon-christina-rorvik.jpg";
import HeroImg3 from "../images/solveig-smordal-botn.jpg";
import HeroText from "./HeroText";

const contentStyle = {
  color: "#fff",
  textAlign: "right",
  position: "absolute",
  bottom: "10%",
  right: "50px",
  width: "60%",
  lineHeight: "55px",
  maxWidth: "700px",
};

const Hero = () => {
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
          <div style={contentStyle}>
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
          <div style={contentStyle}>
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
          <div style={contentStyle}>
            <HeroText />
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Hero;

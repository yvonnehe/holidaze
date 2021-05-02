import { Carousel } from "antd";
import HeroImg1 from "../images/mao-yuqing.jpg";
import HeroImg2 from "../images/sharon-christina-rorvik.jpg";
import HeroImg3 from "../images/solveig-smordal-botn.jpg";
import HeroText from "./HeroText";

const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  textAlign: "right",
  position: "relative",
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
          <img src={HeroImg1} alt="Bergen aero view" width="100%" />
          <h3 style={contentStyle}>
            <HeroText />
          </h3>
        </div>
        <div>
          <img src={HeroImg2} alt="Bergen aero view" width="100%" />
          <h3 style={contentStyle}>
            <HeroText />
          </h3>
        </div>
        <div>
          <img src={HeroImg3} alt="Bergen aero view" width="100%" />
          <h3 style={contentStyle}>
            <HeroText />
          </h3>
        </div>
      </Carousel>
    </>
  );
};

export default Hero;

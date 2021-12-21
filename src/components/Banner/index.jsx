import PropTypes from "prop-types";
import React from "react";
import { Input } from "reactstrap";
import Header from "../Header";
import "./styles.scss";

function Banner(props) {
  const { backgroundImage, children } = props;
  // useEffect(() => {
  //   const fetchApiProvince = async () => {
  //     try {
  //       const response = await addressApi.GetProvince();
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchApiProvince();
  // }, []);
  return (
    <>
      <Header
        color="#ffffff"
        position="absolute"
        background="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.02) 100%)"
      />
      <section className="banner">
        <div
          className="banner__slider"
          style={{
            width: "100%",
            height: "488px",
            background: `url("${backgroundImage}") 0% 0% / cover no-repeat white`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            transition: "background-image 1s ease-in-out",
          }}
        ></div>

        <div className="banner__search-info">
          <div className="container">
            <div className="form-search-tour-hotel">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}

Banner.propTypes = {
  backgroundImage: PropTypes.string,
};

Banner.defaultProps = {
  backgroundImage:
    "https://storage.googleapis.com/tripi-assets/mytour/banner/home-banner.jpg",
};

export default Banner;

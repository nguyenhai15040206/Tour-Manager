import React from "react";
import NotFoundIMG from "../../assets/logo/404-SVG.png";

function NotFound(props) {
  return (
    <div className="cr-notfound">
      <img className="cr-notfound__shadow" src={NotFoundIMG} alt="Not Found" />
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;

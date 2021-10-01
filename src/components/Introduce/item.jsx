import PropTypes from "prop-types";
import React from "react";

function IntroduceItem(props) {
  const { image, title, desc } = props;
  return (
    <div className="introduce__item">
      <span className="introduce__item__image">
        <img src={image} alt="" />
        <div className="hr"></div>
      </span>
      <span className="introduce__item__title">{title}</span>
      <span className="introduce__item__desc">{desc}</span>
    </div>
  );
}

IntroduceItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
};

IntroduceItem.defaultProps = {
  image: "",
  title: "",
  desc: "",
};

export default IntroduceItem;

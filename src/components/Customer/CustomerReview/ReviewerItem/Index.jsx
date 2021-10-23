import PropTypes from "prop-types";
import React from "react";

function ReViewItem(props) {
  const { title, name, image } = props;
  return (
    <div className="review__item">
      <div className="review__item--image">
        <img src={image} alt="" />
      </div>
      <div className="review__item--content">
        <div>
          <h6>{title}</h6>
          <div className="content-info">
            <h5>{name}</h5>
            <p>Khách hàng Vietravel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ReViewItem.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
};

ReViewItem.defaultProps = {
  title: "",
  name: "",
  image: "",
};

export default ReViewItem;

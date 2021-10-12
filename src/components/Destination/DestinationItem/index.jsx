import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

function DestinationItem(props) {
  const { itemIndex, address, image } = props;
  return (
    <div className={`destination__item destination-item${itemIndex}`}>
      <a href="index.html">
        <div className="image">
          <LazyLoadImage src={image} alt={address} threshold={1000} />
          <p>{address}</p>
        </div>
      </a>
    </div>
  );
}

DestinationItem.propTypes = {
  itemIndex: PropTypes.number,
  image: PropTypes.string,
  address: PropTypes.string,
};

DestinationItem.defaultProps = {
  itemIndex: 0,
  address: "",
  image: "",
};

export default DestinationItem;

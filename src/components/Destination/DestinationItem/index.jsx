import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function DestinationItem(props) {
  const { itemIndex, address, image, href } = props;
  return (
    <div className={`destination__item destination-item${itemIndex}`}>
      <Link to={`/my-tour/danh-sach-tim-kiem-tour/params=0/0/0/0/${href}`}>
        <div className="image">
          <LazyLoadImage src={image} alt={address} threshold={1000} />
          <p>{address}</p>
        </div>
      </Link>
    </div>
  );
}

DestinationItem.propTypes = {
  itemIndex: PropTypes.number,
  image: PropTypes.string,
  address: PropTypes.string,
  href: PropTypes.string,
};

DestinationItem.defaultProps = {
  itemIndex: 0,
  address: "",
  image: "",
  href: "#",
};

export default DestinationItem;

import React from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function HotelItem(props) {
  const { image, href, sale, desc, name, address, totalPrice, price } = props;
  return (
    <div className="hotel__item">
      <a href={href}>
        <div className="item__content">
          <div className="item__header">
            <div className="image">
              <LazyLoadImage src={image} alt="" effect="opacity" />
            </div>
            <div className="sale">
              <span className="sale__title">
                {sale} <span>%</span>
              </span>
            </div>
            <div className="desc">
              <span>{desc}</span>
            </div>
          </div>
          <div className="item__info">
            {/* Khách sạn A&Em Signature */}
            <h6 className="item__info--title">{name}</h6>
            <div className="item__info--rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <div className="item__info--address">
              <span>
                <i className="fas fa-map-pin"></i>
              </span>
              <span className="address">{address}</span>
            </div>
            <div className="item__info--hreview-aggregate">
              <p>7.8</p>
              <span className="span">Tuyệt vời</span>
              <span className="rating">
                (141 đánh giá)
                <div className="jss453"></div>
                <i className="fas fa-heart"></i>
              </span>
            </div>
            <div className="item__info--price">
              <div className="total-price">{totalPrice}</div>
              <div className="price">{price}</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

HotelItem.propTypes = {
  image: PropTypes.string,
  href: PropTypes.string,
  sale: PropTypes.number,
  desc: PropTypes.string,

  name: PropTypes.string,
  rating: PropTypes.number,
  address: PropTypes.string,
  totalPrice: PropTypes.string,
  price: PropTypes.string,
};

HotelItem.defaultProps = {
  image: "",
  href: "#",
  sale: "",
  desc: "",

  name: "",
  rating: 0,
  address: "",
  totalPrice: "",
  price: "",
};

export default HotelItem;

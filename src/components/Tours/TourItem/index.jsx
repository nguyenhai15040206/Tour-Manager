import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function TourItem(props) {
  const {
    href,
    image,
    title,
    provinceName,
    dateStart,
    rating,
    unitPrice,
    tourHot,
  } = props;

  const ratingNumber = (rating) => {
    var indents = [];
    for (let index = 0; index < rating; index++) {
      indents.push(<FaStar key={index} />);
    }
    return indents;
  };
  return (
    <div className="promotion-tour__item">
      <Link to={href} title={title}>
        <img src={image} alt="" />
      </Link>
      <div className="caption">
        {tourHot && (
          <div className="lable-hot">
            <img src="https://benthanhtourist.com/img/Home/hot.png" alt="" />
          </div>
        )}
        <Link className="title-tour" to={href}>
          {title}
        </Link>
        <div className="rating">{ratingNumber(rating)}</div>
        <div className="localtion">
          <i className="fas fa-flag"></i>
          {provinceName}
        </div>
        <div className="time">
          <i className="far fa-clock"></i>
          {dateStart}
          <a className="fright" href={href}>
            Ngày khác
          </a>
        </div>
      </div>
      <div className="bottom">
        <i className="far fa-money-bill-alt"></i>
        <span>{unitPrice} vnđ</span>
        <a href={href} className="text-center btn-datngay">
          ĐẶT NGAY
        </a>
      </div>
    </div>
  );
}

TourItem.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  provinceName: PropTypes.string,
  dateStart: PropTypes.string,
  rating: PropTypes.number,
  unitPrice: PropTypes.string,
  tourHot: PropTypes.bool,
};

TourItem.defaultProps = {
  href: "#",
  title: "",
  image: "",
  provinceName: "",
  dateStart: "",
  rating: 3,
  unitPrice: "",
  tourHot: false,
};

export default TourItem;

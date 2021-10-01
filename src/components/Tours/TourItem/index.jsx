import React from "react";
import PropTypes from "prop-types";

function TourItem(props) {
  const { href, image, title } = props;
  return (
    <div className="promotion-tour__item">
      <a href={href} title={title}>
        <img src={image} alt="" />
      </a>
      <div className="caption">
        <div className="lable-hot">
          <img src="https://benthanhtourist.com/img/Home/hot.png" alt="" />
        </div>
        <a className="title-tour" href={href}>
          {title}
        </a>
        <div className="localtion">
          <i className="fas fa-flag"></i>Hà nội
        </div>
        <div className="time">
          <i className="far fa-clock"></i>19/09/2021
          <a className="fright" href={href}>
            Ngày khác
          </a>
        </div>
      </div>
      <div className="bottom">
        <i className="far fa-money-bill-alt"></i>
        <span>2.969.000 vnđ</span>
        <a href={href} className="text-center btn btn-second">
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
};

TourItem.defaultProps = {
  href: "#",
  title: "",
  image: "",
};

export default TourItem;

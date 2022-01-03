import React from "react";
import { Col } from "reactstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Newsitem(props) {
  const { KindOfNew, DateUpdate, NewsName, NewsImg, NewsID } = props;
  return (
    <div className="News__item">
      <Link to={`/my-tour/news-details/newsID=${NewsID}`}>
        <LazyLoadImage
          threshold={1000}
          alt={`${KindOfNew}`}
          src={`${NewsImg}`}
        />
      </Link>
      <div className="new-overlay">
        <p className="KindOfNew">{`${KindOfNew}`}</p>
        <p className="news-name">
          <Link
            to={`/my-tour/news-details/newsID=${NewsID}`}
          >{`${NewsName}`}</Link>
        </p>
        <p className="date-update">Ngày {`${DateUpdate}`}</p>
      </div>
    </div>
  );
}

Newsitem.propTypes = {
  NewsImg: PropTypes.string,
  DateUpdate: PropTypes.string,
  NewsName: PropTypes.string,
  KindOfNew: PropTypes.string,
  NewsID: PropTypes.string,
};
Newsitem.defaultProps = {
  NewsID: "",
  DateUpdate: "",
  NewsName: "",
  KindOfNew: "",
  NewsImg: "",
};

export default Newsitem;

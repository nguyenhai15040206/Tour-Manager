import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

function NewItemByType(props) {
  const { _html, src, href, dateUpdate, kindOfNews, title } = props;
  return (
    <>
      <Card
        style={{
          borderRadius: "5px",
          backgroundColor: "rgb(237, 246, 249)",
          border: "none",
          borderTop: ".5px solid #7d8fab",
        }}
      >
        <CardBody>
          <Row>
            <Col xl={4} lg={6}>
              <img
                className="news-type__image"
                src={`${src}`}
                alt="image news"
              />
            </Col>
            <Col xl={8} lg={6}>
              <div className="news-type__content">
                <h2 className="content-title">
                  <Link to={`${href}`}>{`${title}`}</Link>
                </h2>
                <div>
                  <p className="content-type">
                    {`${kindOfNews}`} <span> {`${dateUpdate}`}</span>
                  </p>
                  <div className="content">
                    <p>{`${_html}`}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

NewItemByType.propTypes = {
  _html: PropTypes.string,
  kindOfNews: PropTypes.string,
  dateUpdate: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string,
};
NewItemByType.defaultProps = {
  title: "",
  _html: "",
  kindOfNews: "",
  dateUpdate: "",
  href: "",
};

export default NewItemByType;

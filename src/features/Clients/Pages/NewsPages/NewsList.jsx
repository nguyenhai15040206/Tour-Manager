import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Col, Row, Spinner } from "reactstrap";
import Newsitem from "./Newsitem";
import { useDispatch, useSelector } from "react-redux";
import { Cli_GetDataNews } from "../../../Admins/Slices/SliceNews";

function NewsList(props) {
  const dispatch = useDispatch();
  const { dataClient } = useSelector((state) => state.news);
  useEffect(() => {
    const fetchApiNews = async () => {
      try {
        const values = {
          Page: 1,
          Limit: 3,
          KindOfNewsID: "D02E5F52-9755-4BE5-B902-017848571E1E",
        };
        await dispatch(Cli_GetDataNews(values));
      } catch (err) {
        console.log(err.error);
      }
    };
    fetchApiNews();
  }, [dispatch]);
  return (
    <div className="News mt-4">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="News__title">Cẩm nang du lịch</h1>
          <a href="#" className="News__ShowAll">
            Xem tất cả
          </a>
        </div>
        <Row>
          {dataClient.map((item, key) => (
            <Col xl={4} lg={12} className="mt-3" key={key}>
              <Newsitem
                NewsID={`${item.newsId}`}
                NewsName={`${item?.newsName}`}
                DateUpdate={`${item?.dateUpdate}`}
                KindOfNew={`${item?.kindOfNew}`}
                NewsImg={`${item?.newsImg}`}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

NewsList.propTypes = {};

export default NewsList;

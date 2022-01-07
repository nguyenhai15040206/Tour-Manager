import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Col, Row, Spinner } from "reactstrap";
import Newsitem from "./Newsitem";
import { useDispatch, useSelector } from "react-redux";
import { Cli_GetDataNewsMainPage } from "../../../Admins/Slices/SliceNews";
import { Link } from "react-router-dom";

function NewsList(props) {
  const dispatch = useDispatch();
  const { dataClient, dataClientByTypePagination } = useSelector(
    (state) => state.news
  );
  useEffect(() => {
    const fetchApiNews = async () => {
      try {
        const values = {
          Page: 1,
          Limit: 3,
          MainPage: true,
        };
        await dispatch(Cli_GetDataNewsMainPage(values));
      } catch (err) {
        console.log(err.error);
      }
    };
    fetchApiNews();
  }, [dispatch]);
  return (
    <div className="News mt-4">
      <div className="container">
        {dataClient.map((item, key) => (
          <div key={key}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1 className="News__title">{`${item?.kindOfNew}`}</h1>
              <Link
                to={`/my-tour/News/new-by-kind-of-new/pType=${item?.enumerationId}`}
                className="News__ShowAll"
              >
                Xem tất cả
              </Link>
            </div>
            <Row>
              {item?.data.map((item, key) => (
                <Col xl={4} lg={12} className="mt-3 mb-5" key={key}>
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
        ))}
      </div>
    </div>
  );
}

NewsList.propTypes = {};

export default NewsList;

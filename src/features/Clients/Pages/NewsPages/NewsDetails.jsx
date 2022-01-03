import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../../../../components/Header";
import { Col, Row, Spinner } from "reactstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Cli_GetDataNews,
  Cli_GetDataNewsDetails,
} from "../../../Admins/Slices/SliceNews";
import "./styles.scss";
import { unwrapResult } from "@reduxjs/toolkit";
import Newsitem from "./Newsitem";

function NewsDetails(props) {
  document.title = "Tin chi tiết";
  let { newsID } = useParams();
  const dispatch = useDispatch();
  const { dataCliDetails, loading, dataClient } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    const fetchApiNewDetails = () => {
      dispatch(Cli_GetDataNewsDetails({ newsID: newsID }))
        .then(unwrapResult)
        .then()
        .catch((err) => {
          console.log(err);
        });
    };
    fetchApiNewDetails();
  }, [newsID]);

  useEffect(() => {
    const fetchApi = async () => {
      const values = {
        Page: 1,
        Limit: 4,
        KindOfNewsID: dataCliDetails?.enumerationId,
      };
      try {
        await dispatch(Cli_GetDataNews(values));
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [newsID, dispatch]);
  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      {loading === "loading" && (
        <div className="cr-page-spinner">
          <Spinner color="primary" />
        </div>
      )}
      <div className="container news-details">
        <Row className="mt-5">
          <Col xl={8} lg={12}>
            <h1 className="news-details__title">{dataCliDetails?.newsName}</h1>
            <h1 className="news-details__kind-of-new">
              {dataCliDetails?.enumerationTranslate}
              <span className="news-details__date-update">
                {dataCliDetails?.dateUpdate}
              </span>
            </h1>

            <div
              className="news-details__content"
              dangerouslySetInnerHTML={{
                __html: dataCliDetails?.content,
              }}
            />
          </Col>
          <Col xl={4} lg={12}>
            <h1 className="news-details__title">Các tin tức liên quan</h1>
            <Row>
              {dataClient.map((item, key) => (
                <Col xl={12} className="mt-4" key={key}>
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
          </Col>
        </Row>
      </div>
    </>
  );
}

NewsDetails.propTypes = {};

export default NewsDetails;

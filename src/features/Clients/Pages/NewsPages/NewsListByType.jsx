import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Card, CardBody, Col, Row } from "reactstrap";
import NewItemByType from "./NewItemByType";
import { Cli_GetDataNewsByType } from "../../../Admins/Slices/SliceNews";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

function NewsListByType(props) {
  const { pType } = useParams();
  const dispatch = useDispatch();
  const { dataClientByType, dataClientByTypePagination } = useSelector(
    (state) => state.news
  );

  //=======
  useEffect(() => {
    const fetchApi = async () => {
      const values = {
        Page: 1,
        Limit: 6,
        KindOfNewsID: pType,
      };
      try {
        await dispatch(Cli_GetDataNewsByType(values));
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [pType, dispatch]);
  //====

  const handleClickGetDataPagination = async (page, limit) => {
    try {
      if (page === 0 || page > dataClientByTypePagination?.totalPage) {
        return;
      }
      const values = {
        Page: page,
        Limit: limit,
        KindOfNewsID: pType,
      };
      await dispatch(Cli_GetDataNewsByType(values));
      window.scrollTo({
        top: 280,
        behavior: "smooth",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const pangination = (totalRecord) => {
    var indents = [];
    for (let index = 0; index < totalRecord; index++) {
      indents.push(
        <li
          className={`page-item ${
            dataClientByTypePagination.currentPage === index + 1 ? "active" : ""
          }`}
          key={index}
        >
          <button
            onClick={() => {
              handleClickGetDataPagination(index + 1, 6);
            }}
            className="page-link"
          >
            {index + 1}
          </button>
        </li>
      );
    }
    return indents;
  };
  return (
    <>
      <div className="news-type  mt-4">
        <div className="container">
          <h2 className="news-type__title">CẨM NANG DU LỊCH</h2>
        </div>
        <div className="mt-5">
          {dataClientByType.map((item, key) => (
            <NewItemByType
              key={key}
              href={`/my-tour/news-details/newsID=${item?.newsId}`}
              title={`${item.newsName}`}
              src={`${item.newsImg}`}
              kindOfNews={`${item.kindOfNew}`}
              dateUpdate={`${item.dateUpdate}`}
              _html={`${item.content}`}
            />
          ))}
        </div>
        <div className="news-type__pagination mb-5 mt-5">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  handleClickGetDataPagination(
                    dataClientByTypePagination?.currentPage - 1,
                    6
                  );
                }}
              >
                <AiOutlineDoubleLeft />
              </button>
            </li>
            {pangination(dataClientByTypePagination?.totalPage)}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  handleClickGetDataPagination(
                    dataClientByTypePagination?.currentPage + 1,
                    6
                  );
                }}
              >
                <AiOutlineDoubleRight />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

NewsListByType.propTypes = {};

export default NewsListByType;

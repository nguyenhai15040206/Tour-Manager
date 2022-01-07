import React from "react";
import PropTypes from "prop-types";
import Banner from "../../../../components/Banner";
import NewsPng from "../../../../assets/logo/5c0e91abbecd0 .jpg";
import Loading from "../../../../components/Loading/Index";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Spinner } from "reactstrap";

const NewsList = React.lazy(() => import("./NewsList"));
const NewListByType = React.lazy(() => import("./NewsListByType"));
function NewsPage(props) {
  document.title = "Tin tức";
  const { loading } = useSelector((state) => state.news);
  const match = useRouteMatch();
  return (
    <>
      <Banner disPlayNoneSearch="d-none" backgroundImage={`${NewsPng}`}>
        <div className="animate__animated animate__bounceInDown animate__delay-2s">
          <h1 className="news-title">Tin tức về du lịch</h1>
        </div>
        <div className="animate__animated animate__bounceInDown animate__delay-3s">
          <h1 className="new-title1">
            cùng điểm qua các cẩm nang du lịch tại mytour
          </h1>
        </div>
        <div className="mt-4 animate__animated animate__bounceInDown animate__delay-4s">
          <a className="news-button">Xem thêm</a>
        </div>
      </Banner>
      {loading === "loading" && <Loading loading={true} />}
      <Switch>
        <Route exact path={`${match.url}`} component={NewsList} />
        <Route
          path={`${match.url}/new-by-kind-of-new/pType=:pType`}
          component={NewListByType}
        />
      </Switch>
    </>
  );
}

NewsPage.propTypes = {};

export default NewsPage;

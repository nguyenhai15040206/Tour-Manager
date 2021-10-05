import React from "react";
import PropTypes from "prop-types";
import { ClimbingBoxLoader } from "react-spinners";
import "./styles.scss";

function Loading(props) {
  const { loading } = props;
  return (
    <div className="loading">
      <div className="container">
        <ClimbingBoxLoader size={25} loading={loading} color={"#BBA72B"} />
      </div>
    </div>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: false,
};

export default Loading;

import React from "react";
import PropTypes from "prop-types";
import { FadeLoader } from "react-spinners";
import "./styles.scss";

function Loading(props) {
  const { loading } = props;
  return (
    <div className="loading">
      <div className="container1">
        <FadeLoader
          height={15}
          width={5}
          radius={2}
          margin={2}
          loading={loading}
          color={"white"}
        />
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

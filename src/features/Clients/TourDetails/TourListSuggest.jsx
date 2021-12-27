import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import TourItem from "../Pages/TourPages/TourItem";
import { formatCash } from "../../../utils/format";

const changeDate = (number) => {
  if (Number.isInteger(number)) {
    if (number === 1) {
      return `${number}N`;
    }
    if (number > 1) {
      return `${number}N${number - 1}Đ`;
    }
  }
  return `${number}N`;
};
function TourListSuggest(props) {
  const { TourListSuggets } = props;
  return (
    <>
      <main className="tour-search">
        <div className="mb-3 mt-5">
          <h3
            className="kd-title"
            style={{
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "600",
            }}
          >
            Có thể bạn sẽ thích
          </h3>
        </div>
        <Row className="mb-5">
          {Array.from(TourListSuggets).map((item, index) => (
            <Col xl={3} lg={6} key={index}>
              <TourItem
                href={`/my-tour/tour-details/tourID=${item.tourId}`}
                image={`${item.tourImg}`}
                rating={item.rating}
                promotion={item.promotion}
                groupNumber={item.groupNumber}
                traveltypeID={`${item.travelTypeId}`}
                date={`${item.dateStartFormat}`}
                numberDate={changeDate(Number(item.totalDays))}
                time=""
                TravelTypeName={`${item.enumerationTranslate}`}
                nameTour={`${item.tourName}`}
                quanityCurrent={`${item.totalCurrentQuanity}`}
                locationStart={`${item.provinceName}`}
                moneyTour={formatCash(`${item.adultUnitPrice}`)}
              ></TourItem>
            </Col>
          ))}
        </Row>
      </main>
    </>
  );
}

TourListSuggest.propTypes = {
  TourListSuggets: PropTypes.array,
};

TourListSuggest.defaulProps = {
  TourListSuggets: [],
};

export default TourListSuggest;

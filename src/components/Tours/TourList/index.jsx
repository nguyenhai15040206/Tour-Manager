import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { GetTourTourIsSuggest } from "../../../features/Admins/Slices/SliceTour";
import { formatCash } from "../../../utils/format";
import Loading from "../../Loading/Index";
import TourItem from "../TourItem";
import "./styles.scss";

function TourList(props) {
  const { tourSuggest, loading } = useSelector((state) => state.tour);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(GetTourTourIsSuggest());
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {loading === "loading" && <Loading loading={true} />}
      <section className="promotion-tour">
        <div className="container">
          <div className="promotion-tour__title">
            <span>Chúng tôi giới thiệu đến bạn</span>
            <h2>TOUR ĐANG HOT</h2>
          </div>
          <Row>
            {tourSuggest.map((item, index) => (
              <Col xl={4} lg={6} className="mb-5" key={index}>
                <TourItem
                  key={index}
                  tourHot={true}
                  title={item.tourName}
                  image={item.tourImg}
                  travelTypeFamily={false}
                  travelTypeName={item.enumerationTranslate}
                  href={`/my-tour/tour-details/tourID=${item.tourId}`}
                  hrefOrder={`/my-tour/booking-tour/tourID=${item.tourId}`}
                  dateStart={item.dateStart.slice(0, 10)}
                  provinceName={item.provinceName}
                  promotion={item.promotion === null ? 0 : item.promotion}
                  rating={item.rating}
                  unitPrice={formatCash(`${item.adultUnitPrice}`)}
                />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </>
  );
}

TourList.propTypes = {};

export default TourList;

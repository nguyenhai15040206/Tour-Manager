import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { GetTourTourIsSuggestFamily } from "../../../features/Admins/Slices/SliceTour";
import { formatCash } from "../../../utils/format";
import Loading from "../../Loading/Index";
import TourItem from "../TourItem";
import "./styles.scss";

function TourFamily(props) {
  const { tourSuggestFamily, loading } = useSelector((state) => state.tour);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const params = {
          tourFamily: "8F64FB01-91FE-4850-A004-35CF26A1C1EF",
        };
        await dispatch(GetTourTourIsSuggestFamily(params));
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
            {/* <span>Chúng tôi giới thiệu đến bạn</span> */}
            <h2>TOUR GIA ĐÌNH</h2>
          </div>
          <Row>
            {tourSuggestFamily.map((item, index) => (
              <Col xl={4} lg={6} className="mb-5" key={index}>
                <TourItem
                  key={index}
                  tourHot={true}
                  title={item.tourName}
                  image={item.tourImg}
                  travelTypeFamily={true}
                  travelTypeName={item.enumerationTranslate}
                  href={`/my-tour/tour-details/tourID=${item.tourId}`}
                  dateStart={item.dateStart.slice(0, 10)}
                  provinceName={item.provinceName}
                  groupNumber={item.groupNumber}
                  rating={item.rating}
                  unitPrice={formatCash(
                    `${item.adultUnitPrice * item.groupNumber}`
                  )}
                />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </>
  );
}

TourFamily.propTypes = {};

export default TourFamily;

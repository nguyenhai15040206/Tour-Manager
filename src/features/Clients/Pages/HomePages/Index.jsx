import { FastField, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Col, Input, Row } from "reactstrap";
import Banner from "../../../../components/Banner";
import Destination from "../../../../components/Destination/DestinationList/Index";
import HotelsList from "../../../../components/Hotels/HotelsList/Index";
import Introdce from "../../../../components/Introduce";
import TourList from "../../../../components/Tours/TourList";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Adm_GetProvince } from "../../../Admins/Slices/SliceAddress";

const optionDays = [
  { value: 1, label: "Từ 1-3 ngày" },
  { value: 2, label: "Từ 4-7 ngày" },
  { value: 3, label: "Từ 8-14 ngày" },
  { value: 3, label: "Trên 14 ngày" },
];

const initialValues = {
  DeparturePlaceFrom: "",
  DeparturePlaceTo: "",
  TotalDays: "",
  DateStart: "",
};
function HomePages(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const stateAddress = useSelector((state) => state.address);

  useEffect(() => {
    const fetchApiProvince = async () => {
      try {
        await dispatch(Adm_GetProvince({}));
      } catch (err) {
        console.log(err);
      }
    };
    fetchApiProvince();
  }, []);

  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };
  const handleClickSubmitForm = (values) => {
    var checkDateIsNull = document.getElementById("DateStart").value;
    if (values.DeparturePlaceFrom !== "" && values.DeparturePlaceTo !== "") {
      if (values.DeparturePlaceFrom === values.DeparturePlaceTo) {
        return NotificationManager.warning(
          "[Điểm đến] trùng [Điểm x/phát]",
          "Warning!",
          1500
        );
      }
    }
    if (checkDateIsNull !== "") {
      const dateStart = new Date(document.getElementById("DateStart").value);
      const currentDate = new Date();
      if (!isValidDate(dateStart) || dateStart < currentDate) {
        return NotificationManager.warning(
          "Ngày đi không hợp lệ!",
          "warning!!!",
          2500
        );
      }
    }

    history.push(
      `/my-tour/danh-sach-tim-kiem-tour/params=${
        values.DeparturePlaceFrom === "" ? 0 : values.DeparturePlaceFrom
      }/${values.DeparturePlaceTo === "" ? 0 : values.DeparturePlaceTo}/${
        values.DateStart === "" ? 0 : values.DateStart
      }/${values.TotalDays === "" ? 0 : values.TotalDays}`
    );
  };
  return (
    <>
      <Banner>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleClickSubmitForm}
          >
            {(formikProps) => {
              return (
                <Form>
                  <Row>
                    <Col xl={3}>
                      <span>Điểm đi</span>
                      <Field
                        className="h-textbox"
                        name="DeparturePlaceFrom"
                        placeholder="Chọn Nơi khởi hành"
                        isLoading={
                          stateAddress?.loading === "loaded" ? false : true
                        }
                        options={stateAddress.data}
                        component={SelectField}
                      />
                    </Col>
                    <Col xl={3}>
                      <span>Điểm đến</span>
                      <Field
                        className="h-textbox"
                        placeholder="Chọn địa điểm đến"
                        name="DeparturePlaceTo"
                        isLoading={
                          stateAddress?.loading === "loaded" ? false : true
                        }
                        options={stateAddress.data}
                        component={SelectField}
                      />
                    </Col>
                    <Col xl={3}>
                      <span>Ngày đi</span>
                      <FastField
                        className="h-textbox h-tour-search"
                        name="DateStart"
                        type="date"
                        component={InputField}
                      />
                    </Col>
                    <Col xl={3}>
                      <Row>
                        <Col xl={7}>
                          <span>Số ngày</span>
                          <Field
                            className="h-textbox"
                            placeholder=""
                            name="TotalDays"
                            options={optionDays}
                            component={SelectField}
                          />
                        </Col>
                        <Col xl={5}>
                          <span style={{ display: "none" }}>tìm tour</span>
                          <button>TÌM TOUR</button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Banner>
      <Introdce />
      <TourList />
      <HotelsList />
      <Destination />
    </>
  );
}

HomePages.propTypes = {};

export default HomePages;

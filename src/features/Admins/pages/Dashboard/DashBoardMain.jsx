import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";
import statisticalApi from "../../../../apis/StatisticalApi";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
let data = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  datasets: [
    {
      label: "# of Votes",
      data: [0, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

//=========
const dataTotalSumnoney = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Dataset 2",
      data: [1, 2, 4, 8, 20],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const options = {
  responsive: true,
};

function DashBoardMain(props) {
  //
  const [dataCountBookingTour, setDataCountBookingTour] = useState(data);
  const [dataSumoney, setDataSumoney] = useState(dataTotalSumnoney);
  useEffect(() => {
    const fetchApi = () => {
      statisticalApi
        .Adm_StatisticalBookingTour()
        .then((res) => {
          setDataCountBookingTour({
            labels: res.map((item) => "Tháng" + item.month),
            datasets: [
              {
                data: res.map((item) => item.totalCountBooking),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });

          setDataSumoney({
            labels: res.map((item) => "Tháng" + item.month),
            datasets: [
              {
                label: "Tổng tiền qua các tháng",
                data: res.map((item) => item.totalMoneyBooking),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchApi();
  }, []);
  return (
    <>
      <Row className="py-3 px-3">
        <Col xl={6}>
          <Card>
            <CardBody style={{ width: "80%", margin: "0 auto" }}>
              <h1
                style={{
                  textAlign: "center",
                  marginBottom: "7px",
                  color: "#333",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                TỔNG CÁC TOUR ĐƯỢC ĐẶT TRONG CÁC THÁNG
              </h1>
              <Pie data={dataCountBookingTour} />
            </CardBody>
          </Card>
        </Col>
        <Col xl={6}>
          <Card style={{ width: "100%", height: "524px" }}>
            <CardBody>
              <div>
                <div className="">
                  <h1
                    style={{
                      textAlign: "center",
                      marginBottom: "7px",
                      color: "#333",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    TỔNG TIỀN CÁC THÁNG TRONG NĂM
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    //alignItems: "center",
                  }}
                >
                  <Formik initialValues={{ month: new Date().getDate() }}>
                    {(formikProps) => {
                      return (
                        <Form>
                          <div className="col-lg-7">
                            <FastField
                              className="h-textbox"
                              type="month"
                              name="month"
                              component={InputField}
                            />
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
              <Bar
                options={options}
                style={{ height: "100%" }}
                data={dataSumoney}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

DashBoardMain.propTypes = {};

export default DashBoardMain;

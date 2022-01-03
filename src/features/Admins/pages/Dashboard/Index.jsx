import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { useEffect } from "react";
import { BsCloudSunFill } from "react-icons/bs";

const formatDate = (date) => {
  if (!date) return "";
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  return `${hours} : ${minutes} : ${seconds}`;
};
function Dashboard(props) {
  const [timeString, setTimeString] = useState("");
  useEffect(() => {
    setInterval(() => {
    const now = new Date();
      // HH:mm:ss
      const newTimeString = formatDate(now);
      setTimeString(newTimeString);
    }, 1000);
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <>
      <Container
        fluid
        className="animate__animated animate__slideInUp animate__delay-0.5s"
      >
        <Row>
          <Col>
            <div className="admin-widget">
              <Row>
                <Col lg={12}>
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="/admin">Trang chủ</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Thống kê - báo cáo</BreadcrumbItem>
                  </Breadcrumb>
                </Col>
                <Col lg={12}>
                  <div id="showSearch" className="collapse show">
                    <Row className="py-3 px-3">
                      <Col xl={3} lg={5} sm={6}>
                        <Card
                          style={{
                            border: "1px solid #e4e9f0",
                            borderRadius: "10px",
                            background: "rgba(82,196,26,.04)",
                            height: "90px",
                          }}
                        >
                          <CardBody>
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "rgba(0,0,0,.85)",
                              }}
                            >
                              {`Chào buổi ${
                                new Date().getHours() <= 10
                                  ? "sáng"
                                  : new Date().getHours() <= 13
                                  ? "Trưa"
                                  : new Date().getHours() <= 18
                                  ? "Chiều"
                                  : "Tối"
                              }`}
                            </p>
                            <p>{`Thứ ${
                              new Date().getDay() === 0
                                ? "Chủ nhật"
                                : new Date().getDay() + 1
                            }, ${new Date().getDate()} tháng ${
                              new Date().getMonth() + 1
                            }`}</p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "baseline",
                              }}
                            >
                              <BsCloudSunFill
                                size={23}
                                color="rgb(214 189 8)"
                              />
                              <span
                                style={{
                                  marginLeft: "10px",
                                  fontWeight: "600",
                                  fontSize: "26px",
                                  lineHeight: "1.6",
                                  color: "#595c97",
                                }}
                              >
                                {timeString}
                              </span>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl={9} lg={7} xm={6}>
                        <Card
                          style={{
                            border: "1px solid #e4e9f0",
                            borderRadius: "10px",
                            background: "rgba(82,196,26,.04)",
                            height: "90px",
                          }}
                        >
                          <CardBody>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Incidunt suscipit impedit rem, voluptatibus
                            aliquid at autem laudantium eos qui, sequi dolores
                            obcaecati debitis, repellendus ratione dignissimos
                            culpa fugiat porro excepturi!
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="py-3 px-3">
                      <Col xl={4} lg={12}>
                        <Card
                          style={{
                            border: "1px solid #e4e9f0",
                            borderRadius: "10px",
                            background: "#FBF3F7",
                          }}
                        >
                          <CardBody>
                            <h1
                              style={{
                                fontSize: "30px",
                                fontWeight: "600",
                                color: "#003d71",
                                //lineHeight: "26px",
                              }}
                            >
                              55
                            </h1>
                            <h1
                              style={{
                                fontSize: "15px",
                                fontWeight: "normal",
                                color: "#003d71",
                              }}
                            >
                              Nhân viên nghỉ việc
                            </h1>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl={4} lg={12}>
                        <Card
                          style={{
                            border: "1px solid #e4e9f0",
                            borderRadius: "10px",
                            background: "#FBF3F7",
                          }}
                        >
                          <CardBody>
                            <h1
                              style={{
                                fontSize: "30px",
                                fontWeight: "600",
                                color: "#003d71",
                                //lineHeight: "26px",
                              }}
                            >
                              55
                            </h1>
                            <h1
                              style={{
                                fontSize: "15px",
                                fontWeight: "normal",
                                color: "#003d71",
                              }}
                            >
                              Nhân viên nghỉ việc
                            </h1>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl={4} lg={12}>
                        <Card
                          style={{
                            border: "1px solid #e4e9f0",
                            borderRadius: "10px",
                            background: "#FBF3F7",
                          }}
                        >
                          <CardBody>
                            <h1
                              style={{
                                fontSize: "30px",
                                fontWeight: "600",
                                color: "#003d71",
                                //lineHeight: "26px",
                              }}
                            >
                              55
                            </h1>
                            <h1
                              style={{
                                fontSize: "15px",
                                fontWeight: "normal",
                                color: "#003d71",
                              }}
                            >
                              Nhân viên nghỉ việc
                            </h1>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Dashboard.propTypes = {};

export default Dashboard;

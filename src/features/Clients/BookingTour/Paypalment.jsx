import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GiBank } from "react-icons/gi";
import { Col, Input, Row } from "reactstrap";
function Paypalment(props) {
  return (
    <div className="payment">
      <Row>
        <Col xl={6} lg={12}>
          <div
            style={{
              padding: "15px 14px",
              borderRadius: "6px",
              border: "1px solid #d8d8d8",
              height: "150px",
            }}
          >
            <div
              className="p-head"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
                height: "45px",
              }}
            >
              <div>
                <FaMoneyBillAlt size={35} color="#2d4271" />{" "}
                <span
                  style={{
                    color: "#2d4271",
                    marginLeft: "5px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Tiền mặt
                </span>
              </div>
              <Input
                defaultChecked={true}
                style={{
                  width: "20px",
                  height: "20px",
                  border: "1px solid #4d4aef",
                }}
                value={1}
                className="radioPayment"
                name="radioPayment"
                type="radio"
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "13px",
                  color: "#2d4271",
                }}
              >
                Quý khách vui lòng thanh toán tại bất kỳ văn phòng Vietravel
                trên toàn quốc và các chi nhánh ngoài nước. Chi tiết
              </p>
            </div>
          </div>
        </Col>
        <Col xl={6} lg={12}>
          <div
            style={{
              padding: "15px 14px",
              borderRadius: "6px",
              border: "1px solid #d8d8d8",
              height: "150px",
            }}
          >
            <div
              className="p-head"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
                height: "45px",
              }}
            >
              <div>
                <GiBank size={27} color="#2d4271" />{" "}
                <span
                  style={{
                    color: "#2d4271",
                    marginLeft: "5px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Chuyển khoản
                </span>
              </div>
              <Input
                style={{
                  width: "20px",
                  height: "20px",
                  border: "1px solid #4d4aef",
                }}
                value={2}
                className="radioPayment"
                name="radioPayment"
                type="radio"
              />
            </div>
            <div>
              <p style={{ color: "rgb(192, 0, 0)", fontSize: "13px" }}>
                Tên tài khoản:{" "}
                <strong style={{ fontWeight: "600", fontSize: "13px" }}>
                  NGUYEN TAN HAI
                </strong>
              </p>
              <p style={{ color: "rgb(192, 0, 0)", fontSize: "13px" }}>
                Số tài khoản:{" "}
                <strong style={{ fontWeight: "600", fontSize: "13px" }}>
                  225 308 897
                </strong>
              </p>
              <p style={{ color: "rgb(192, 0, 0)", fontSize: "13px" }}>
                Ngân hàng:{" "}
                <strong style={{ fontWeight: "600", fontSize: "13px" }}>
                  ACB - CN TP.HCM
                </strong>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

Paypalment.propTypes = {};

export default Paypalment;

import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  CardImg,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Loading from "../../../../components/Loading/Index";
import { formatCash } from "../../../../utils/format";

function BookingDetails(props) {
  const { loading, dataDetails } = useSelector((state) => state.bookingTour);
  const { onClickAcceptBooking } = props;

  const handleClickAcceptBooking = (e) => {
    if (onClickAcceptBooking) {
      onClickAcceptBooking(e);
    }
  };
  return (
    <>
      {loading === "loading" && <Loading loading={true} />}
      <Modal
        backdropTransition={{
          timeout: 300,
        }}
        modalTransition={{
          timeout: 400,
        }}
        centered={true}
        isOpen={props.isOpen}
        className="modal-xl"
        backdrop={"static"}
        toggle={props.toggle}
      >
        <ModalHeader
          style={{
            color: "#43A1FC",
            fontSize: "16px",
            fontWeight: "600",
            padding: "5px 10px",
            backgroundColor: "#F8F8F8",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
          toggle={props.toggle}
        >
          Chi tiết booking
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xl={3} lg={6}>
              <button
                type="button"
                style={{ marginLeft: "3px", width: "100%" }}
                onClick={handleClickAcceptBooking}
                className="h-button"
              >
                <GiConfirmed color="#2b6e44" size={15} /> Xác nhận thanh toán
              </button>
              <Card style={{ height: "230px", marginTop: "5px" }} inverse>
                <CardImg
                  style={{ objectFit: "fill" }}
                  src={`${dataDetails?.data?.qrCode}`}
                />
              </Card>
            </Col>
            <Col xl={9} lg={12}>
              <table className="table table-striped table-success">
                <thead>
                  <tr>
                    <th style={{ width: "350px" }}>Mã Booking</th>
                    <th>Ngày Booking</th>
                    <th>Hạn thanh toán</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{`${dataDetails?.data?.bookingTourId}`}</td>
                    <td>{`${dataDetails?.data?.bookingDate}`}</td>
                    <td
                      style={{ color: "red" }}
                    >{`${dataDetails?.data?.duration}`}</td>
                  </tr>
                </tbody>
              </table>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "350px" }}>Mã tour</th>
                    {/* <th>Ngày Booking</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{`${dataDetails?.data?.tourId}`}</td>
                    {/* <td>29/12/2021</td> */}
                  </tr>
                </tbody>
              </table>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "350px" }}>Mã khách hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Số điện thoại</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{`${dataDetails?.data?.customerId}`}</td>
                    <td>{`${dataDetails?.data?.customerName}`}</td>
                    <td>{`${dataDetails?.data?.phoneNumber}`}</td>
                  </tr>
                </tbody>
              </table>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "350px" }}>Email</th>
                    <th>Địa chỉ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{`${dataDetails?.data?.email}`}</td>
                    <td>{`${dataDetails?.address}`}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col xl={12}>
              <table className="table table-success table-striped">
                <thead>
                  <tr>
                    <th style={{ width: "270px" }}>Số lượng người lớn</th>
                    <th style={{ width: "270px" }}>Số lượng trẻ em</th>
                    <th style={{ width: "270px" }}>Số lượng trẻ nhỏ</th>
                    <th>Số lượng trẻ sơ sinh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{`${dataDetails?.data?.quanityAdult}`}</td>
                    <td>{`${dataDetails?.data?.quanityChildren}`}</td>
                    <td>{`${dataDetails?.data?.quanityBaby}`}</td>
                    <td>{`${dataDetails?.data?.quanityInfant}`}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col xl={12}>
              <table className="table table-success table-striped">
                <thead>
                  <tr>
                    <th style={{ width: "270px" }}>Đơn giá người lớn</th>
                    <th style={{ width: "270px" }}>Đơn giá trẻ em</th>
                    <th style={{ width: "270px" }}>Đơn giá trẻ nhỏ</th>
                    <th>Phụ thu phòng đơn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "red" }}>
                      {formatCash(`${dataDetails?.data?.adultUnitPrice}`)}đ
                    </td>
                    <td style={{ color: "red" }}>
                      {dataDetails?.data?.childrenUnitPrice === 0
                        ? "Không có số lượng đặt"
                        : formatCash(`${dataDetails.data?.childrenUnitPrice}`) +
                          "đ"}
                    </td>
                    <td style={{ color: "red" }}>
                      {dataDetails?.data?.babyUnitPrice === 0
                        ? "Không có số lượng đặt"
                        : formatCash(`${dataDetails?.data?.babyUnitPrice}`) +
                          "đ"}
                    </td>
                    <td style={{ color: "red" }}>
                      {dataDetails?.data?.surcharge === 0
                        ? "Không có đặt phòng đơn"
                        : formatCash(`${dataDetails?.data?.surcharge}`) + "đ"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col xl={12}>
              <table className="table table-success table-striped">
                <thead>
                  <tr>
                    <th style={{ width: "270px" }}>Giảm giá</th>
                    <th style={{ width: "270px" }}>Tổng tiền Booking</th>
                    <th>Tổng tiền tất cả</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "red" }}>
                      {dataDetails?.data?.discount === 0
                        ? 0
                        : formatCash(`${dataDetails?.data?.discount}`)}
                      đ đ
                    </td>
                    <td style={{ color: "red" }}>
                      {formatCash(`${dataDetails?.data?.totalMoneyBooking}`)}đ
                    </td>
                    <td style={{ color: "red" }}>
                      {formatCash(`${dataDetails?.data?.totalMoney}`)}đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col xl={12}>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "270px" }}>Các options ghi chú</th>
                    <th style={{ width: "270px" }}>Ghi chú khác</th>
                    <th style={{ width: "270px" }}>Hình thức thanh toán</th>
                    <th>Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{dataDetails?.optionsNote}</td>
                    <td>{dataDetails?.data?.note}</td>
                    <td style={{ color: "red" }}>
                      {dataDetails?.data?.typePayment === 1
                        ? "Thanh toán tiền mặt"
                        : "Chuyển khoản"}
                    </td>
                    <td style={{ color: "red" }}>
                      {dataDetails?.data?.status === false
                        ? "Chưa thanh toán"
                        : "Đã thanh toán"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

BookingDetails.propTypes = {
  onClickAcceptBooking: PropTypes.func,
};
BookingDetails.defaultProps = {
  onClickAcceptBooking: null,
};

export default BookingDetails;

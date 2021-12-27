import React from "react";
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
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Index";

function BookingDetails(props) {
  const { loading } = useSelector((state) => state.bookingTour);
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
        className="modal-lg"
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
            <Col xl={8} lg={6}></Col>
            <Col xl={4} lg={6}>
              <Card
                style={{ height: "200px", marginTop: "2px" }}
                inverse
              ></Card>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

BookingDetails.propTypes = {};

export default BookingDetails;

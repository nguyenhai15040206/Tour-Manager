import React from "react";
import PropTypes from "prop-types";
import { FastField, Form, Formik, yupToFormErrors } from "formik";
import InputField from "../../../CustomFields/InputField/Index";
import { Col, Row } from "reactstrap";

const initialValues = {
  FullNameCustomer: "",
  EmailCustomer: "",
  PhoneNumberCustomer: "",
  AddressCustomer: "",
};

function BookingForm(props) {
  return (
    <>
      <Formik initialValues={initialValues}>
        {(formikProps) => {
          return (
            <Form>
              <Row>
                <Col xl={6} lg={12}>
                  <FastField
                    styles={{ height: "40px" }}
                    className="h-textbox"
                    labelName="h-lable-Obligatory"
                    name="FullNameCustomer"
                    label="Họ và tên"
                    component={InputField}
                  />
                </Col>
                <Col xl={6} lg={12}>
                  <FastField
                    styles={{ height: "40px" }}
                    className="h-textbox"
                    labelName="h-lable-Obligatory"
                    name="EmailCustomer"
                    label="Email"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xl={6} lg={12}>
                  <FastField
                    styles={{ height: "40px" }}
                    className="h-textbox"
                    labelName="h-lable-Obligatory"
                    name="PhoneNumberCustomer"
                    label="Số điện thoại"
                    component={InputField}
                  />
                </Col>
                <Col xl={6} lg={12}>
                  <FastField
                    styles={{ height: "40px" }}
                    className="h-textbox"
                    name="AddressCustomer"
                    label="Địa chỉ"
                    component={InputField}
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

BookingForm.propTypes = {
  onSubmitForm: PropTypes.func,
};

BookingForm.defaulProps = {
  onSubmitForm: null,
};

export default BookingForm;

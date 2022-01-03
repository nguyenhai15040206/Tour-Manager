import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "reactstrap";
import logo from "../../../../assets/logo/icon_logo_mytour.svg";
import Header from "../../../../components/Header";
import { MdPhone } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { IoMail } from "react-icons/io5";
import "./styles.scss";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
import { Formik, Form, FastField } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import TextAreaField from "../../../../CustomFields/TextareaField/Index";
import * as yup from "yup";
import emailjs from "emailjs-com";
import { NotificationManager } from "react-notifications";

const initialvalues = {
  Name: "",
  Email: "",
  Subject: "",
  Message: "",
};

const validationShema = yup.object().shape({
  Name: yup.string().required(" "),
  Email: yup.string().required(" "),
  Subject: yup.string().required(" "),
  Message: yup.string().required(" "),
});
function Contact(props) {
  const handleClickSubmit = (values) => {
    emailjs
      .send(
        "service_r1u1jpm",
        "template_ctr742r",
        {
          name: values.Name,
          email: values.Email,
          message: values.Message,
          subject: values.Subject,
        },
        "user_ZsWBUNoFRUr0MhwI1FCDG"
      )
      .then(
        () => {
          return NotificationManager.success(
            `Gửi mail thành công!`,
            "Success!",
            2500
          );
        },
        (error) => {
          return NotificationManager.success(`${error}`, "Error!", 2500);
        }
      );
  };
  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo={`${logo}`}
      />
      <div
        className="h-contact container animate__animated animate__slideInUp animate__delay-0.5s"
        style={{ marginTop: "50px" }}
      >
        <div className="d-flex" style={{ alignItems: "stretch" }}>
          <div style={{ width: "40%" }}>
            <div className="h-contact__background">
              <div className="bg-info-contact">
                <ul className="content">
                  <li className="ml-2">
                    <SiGooglemaps />
                    <span>
                      35 Nguyễn Hữu Tiến, Phường Tây Thạnh
                      <br />
                      Quận Tân Phú, TP. Hồ Chí Minh
                    </span>
                  </li>
                  <li className="mt-2 ml-2">
                    <a href="mailto: nguyenhai15040206@gmail.com">
                      <IoMail />
                      <span>nguyenhai15040206@gmail.com</span>
                    </a>
                  </li>
                  <li className="mt-2 ml-2">
                    <a href="tel:0357866848">
                      <MdPhone />
                      <span>035-786-6848</span>
                    </a>
                  </li>
                </ul>
                <ul className="d-flex contact-info">
                  <li>
                    <a href="https://www.facebook.com/Mytoursurgesh-107547915136175/?ref=pages_you_manage">
                      <BsFacebook size={15} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/tanhai.nguyen.921/"
                      className="ml-3"
                    >
                      <BsTwitter size={15} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/tanhai.nguyen.921/"
                      className="ml-3"
                    >
                      <BsInstagram size={15} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/nguyenhai15040206"
                      className="ml-3"
                    >
                      <BsGithub size={15} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/tanhai.nguyen.921/"
                      className="ml-3"
                    >
                      <BsLinkedin size={15} />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="form-contact">
                <Formik
                  initialValues={initialvalues}
                  validationSchema={validationShema}
                  onSubmit={(values, { resetForm }) => {
                    handleClickSubmit(values);
                    resetForm();
                  }}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <Row className="px-2 py-2">
                          <Col xl={6} lg={12}>
                            <FastField
                              className="h-textbox-contact"
                              name="Name"
                              component={InputField}
                              placeholder="Name"
                            />
                          </Col>
                          <Col xl={6} lg={12}>
                            <FastField
                              className="h-textbox-contact"
                              name="Email"
                              placeholder="Email"
                              component={InputField}
                            />
                          </Col>
                          <Col xl={12}>
                            <FastField
                              className="h-textbox-contact"
                              name="Subject"
                              placeholder="Subject"
                              component={InputField}
                            />
                          </Col>
                          <Col xl={12}>
                            <FastField
                              name="Message"
                              className="h-textbox-contact h-textarea"
                              placeholder="Message"
                              component={TextAreaField}
                            />
                          </Col>
                        </Row>
                        <Row className="px-2 ">
                          <Col>
                            {" "}
                            <Button
                              type="submit"
                              className="h-button "
                              style={{ float: "right" }}
                            >
                              <BiMailSend /> Gửi thông tin
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
          <div style={{ width: "60%" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0229605873014!2d106.62324251458925!3d10.809553192299024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be3d81c599d%3A0x41e3d7bca10cae74!2zMzUgTmd1eeG7hW4gSOG7r3UgVGnhur9uLCBUw6J5IFRo4bqhbmgsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1641066756844!5m2!1svi!2s"
              width="100%"
              height={"550px"}
              frameBorder={0}
              style={{
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    </>
  );
}

Contact.propTypes = {};

export default Contact;

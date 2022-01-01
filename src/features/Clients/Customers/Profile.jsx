import { unwrapResult } from "@reduxjs/toolkit";
import { FastField, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import InputField from "../../../CustomFields/InputField/Index";
import SelectField from "../../../CustomFields/SelectField/Index";
import { Adm_GetProvince } from "../../Admins/Slices/SliceAddress";
import {
  Cli_GetCustomerInfo,
  Cli_UpdateCustomer,
} from "../../Admins/Slices/SliceCustomer";
import { Adm_GetDistrictByProvinceCBB } from "../../Admins/Slices/SliceDistrict";
import { Adm_GetWardsByIdDistrictCbb } from "../../Admins/Slices/SliceWards";
const styles = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};

const initialValuesFirst = {
  CustomerName: "",
  PhoneNumber: "",
  Email: "",
  Gender: "",
  Address: "",
  DistrictID: "",
  ProvinceID: "",
  WardsID: "",
};

const Options = [
  { value: true, label: "Nam" },
  { value: false, label: "Nữ" },
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function Profile(props) {
  //#region  state in component
  const [initialvalues, setInitialvalues] = useState(initialValuesFirst);
  const [editGender, setEditGener] = useState(false);
  const [editAddress, setEditAdress] = useState(false);
  const [edtiDateOfBirth, setDateOfBirth] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [editCustomerName, setEditCustomerName] = useState(false);

  //#endregion

  //
  const dispatch = useDispatch();
  const history = useHistory();
  const { dataCustomerInfo } = useSelector((state) => state.customer);
  const { data, loading } = useSelector((state) => state.address);
  const stateDistrict = useSelector((state) => state.district);
  const stateWards = useSelector((state) => state.wards);

  //
  let submitAction = undefined;
  //
  useEffect(() => {
    const fetchApiCustomer = () => {
      onLoadProfile();
    };

    fetchApiCustomer();
  }, [dispatch]);

  useEffect(() => {
    const fetchApiProvice = async () => {
      try {
        await dispatch(Adm_GetProvince({}));
      } catch (err) {
        console.log(err);
      }
    };
    fetchApiProvice();
  }, [dispatch]);

  const onLoadProfile = () => {
    const userID = JSON.parse(localStorage.getItem("accessTokenCustomer"))?.data
      ?.customerId;
    if (userID === undefined) {
      return;
    }
    const params = {
      CustomerId: userID,
    };
    dispatch(Cli_GetCustomerInfo(params))
      .then(unwrapResult)
      .then(async (payload) => {
        const addressArr =
          payload.address === null ? "" : payload.address.split("||");
        try {
          await dispatch(
            Adm_GetDistrictByProvinceCBB({
              provinceID: addressArr[3] === undefined ? 0 : addressArr[3],
            })
          );
          await dispatch(
            Adm_GetWardsByIdDistrictCbb({
              districtID: addressArr[2] === undefined ? 0 : addressArr[2],
            })
          );
        } catch (err) {
          console.log(err);
        }
        // dispatch(Adm_GetWardsByIdDistrictCbb({ districtID:  }));
        setInitialvalues({
          CustomerName: payload.customerName,
          PhoneNumber: payload.phoneNumber,
          Email: payload.email,
          Gender: payload.gender,
          Address: addressArr[0] === undefined ? "" : addressArr[0],
          WardsID: addressArr[1] === undefined ? "" : Number(addressArr[1]),
          DistrictID: addressArr[2] === undefined ? "" : Number(addressArr[2]),
          ProvinceID: addressArr[3] === undefined ? "" : Number(addressArr[3]),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // ==========
  //#region  Bắt check nếu click edti vào một trong các chwucs năng cho edit
  const handleClickEditGender = () => {
    setEditGener(!editGender);
    setEditAdress(false);
    setEditPhoneNumber(false);
    setDateOfBirth(false);
    setEditCustomerName(false);
  };

  const handleClickEditAddress = () => {
    setEditAdress(!editAddress);
    setEditGener(false);
    setEditPhoneNumber(false);
    setDateOfBirth(false);
    setEditCustomerName(false);
  };

  const handleClickEditPhoneNumber = () => {
    setEditPhoneNumber(!editPhoneNumber);
    setEditAdress(false);
    setEditGener(false);
    setEditCustomerName(false);
    setDateOfBirth(false);
  };


  const handleClickEditCustomerName = () => {
    setEditCustomerName(!editCustomerName);
    setEditAdress(false);
    setEditGener(false);
    setDateOfBirth(false);
    setEditPhoneNumber(false);
  };
  //#endregion
  //

  //#region  call dữ liệu provice => district => wards
  const handleChangeProvince = async (event) => {
    try {
      const params = {
        provinceID: event.value,
      };
      await dispatch(Adm_GetDistrictByProvinceCBB(params));
      await dispatch(Adm_GetWardsByIdDistrictCbb({ districtID: 0 }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeDistrict = async (event) => {
    try {
      const params = {
        districtID: event.value,
      };
      await dispatch(Adm_GetWardsByIdDistrictCbb(params));
    } catch (err) {
      console.log(err);
    }
  };
  //#endregion

  //#region submit from
  // onSubmitfrom
  const handleClickOnSubmit = (values) => {
    const userID = JSON.parse(localStorage.getItem("accessTokenCustomer"))?.data
      ?.customerId;
    if (userID === undefined) {
      return;
    }
    if (submitAction === "CustomerName") {
      onEditCustomerName(userID, values);
    }
    if (submitAction === "CustomerPhoneNumber") {
      onEditPhoneNumber(userID, values);
    }
    if (submitAction === "CustomerGender") {
      onEditGender(userID, values);
    }
    if (submitAction === "CustomerAddress") {
      onEditAddress(userID, values);
    }
  };
  //
  const onEditCustomerName = (userID, values) => {
    var valuesName = document.getElementById("CustomerName");
    if (valuesName.value.trim() === "") {
      // input[""]
      valuesName.focus();
      return NotificationManager.warning(
        `Họ và tên không được để trống`,
        "Warning!!!",
        2500
      );
    }
    dispatch(
      Cli_UpdateCustomer({
        customerId: userID,
        customerName: values.CustomerName,
      })
    )
      .unwrap()
      .then(() => {
        onLoadProfile();
        return NotificationManager.success(
          `Cập nhật thành công`,
          "Success!!!",
          2500
        );
      })
      .catch((err) => {
        if (err.status === 401) {
          NotificationManager.warning(
            `Vui lòng đăng nhập lại`,
            "Warning!",
            1500
          );
          localStorage.removeItem("accessTokenCustomer");
          return history.push("/my-tour");
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };
  const onEditPhoneNumber = (userID, values) => {
    var phoneNumber = document.getElementById("PhoneNumber");
    if (
      phoneNumber.value.trim() === "" ||
      !phoneRegExp.test(phoneNumber.value.trim()) ||
      phoneNumber.value.trim().length !== 10
    ) {
      // input[""]
      phoneNumber.focus();
      return NotificationManager.warning(
        `Vui lòng nhập số điện thoại hợp lệ`,
        "Warning!!!",
        2500
      );
    }
    dispatch(
      Cli_UpdateCustomer({
        customerId: userID,
        phoneNumber: values.PhoneNumber,
      })
    )
      .unwrap()
      .then(() => {
        onLoadProfile();
        return NotificationManager.success(
          `Cập nhật thành công`,
          "Success!!!",
          2500
        );
      })
      .catch((err) => {
        if (err.status === 401) {
          NotificationManager.warning(
            `Vui lòng đăng nhập lại`,
            "Warning!",
            1500
          );
          localStorage.removeItem("accessTokenCustomer");
          return history.push("/my-tour");
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };
  const onEditGender = (userID, values) => {
    if (values.Gender === "" || values.Gender === null) {
      return NotificationManager.warning(
        `Vui lòng chọn giới tính`,
        "Warning!!!",
        2500
      );
    }
    dispatch(
      Cli_UpdateCustomer({
        customerId: userID,
        gender: values.Gender,
      })
    )
      .then(unwrapResult)
      .then(() => {
        onLoadProfile();
        return NotificationManager.success(
          `Cập nhật thành công`,
          "Success!!!",
          2500
        );
      })
      .catch((err) => {
        if (err.status === 401) {
          NotificationManager.warning(
            `Vui lòng đăng nhập lại`,
            "Warning!",
            1500
          );
          localStorage.removeItem("accessTokenCustomer");
          return history.push("/my-tour");
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };

  const onEditAddress = (userID, values) => {
    console.log(values);
    if (values.ProvinceID === "" || values.ProvinceID === null) {
      return NotificationManager.warning(
        `Vui lòng chọn tỉnh/thành phố`,
        "Warning!!!",
        2500
      );
    }
    if (values.DistrictID === "" || values.DistrictID === null) {
      return NotificationManager.warning(
        `Vui lòng chọn quận/huyện`,
        "Warning!!!",
        2500
      );
    }
    if (values.WardsID === "" || values.WardsID === null) {
      return NotificationManager.warning(
        `Vui lòng chọn phường xã`,
        "Warning!!!",
        2500
      );
    }
    if (values.CustomerName === "") {
      return NotificationManager.warning(
        `Vui lòng điền địa chỉ`,
        "Warning!!!",
        2500
      );
    }
    dispatch(
      Cli_UpdateCustomer({
        customerId: userID,
        address:
          values.Address +
          "||" +
          values.WardsID +
          "||" +
          values.DistrictID +
          "||" +
          values.ProvinceID,
      })
    )
      .unwrap()
      .then(() => {
        onLoadProfile();
        return NotificationManager.success(
          `Cập nhật thành công`,
          "Success!!!",
          2500
        );
      })
      .catch((err) => {
        if (err.status === 401) {
          NotificationManager.warning(
            `Vui lòng đăng nhập lại`,
            "Warning!",
            1500
          );
          localStorage.removeItem("accessTokenCustomer");
          return history.push("/my-tour");
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };
  //
  //#endregion
  return (
    <>
      <h1 className="title">Thông tin tài khoản</h1>
      <p>Cập nhật thông tin các nhân</p>
      <Formik
        enableReinitialize={true}
        initialValues={initialvalues}
        onSubmit={(values) => {
          handleClickOnSubmit(values);
        }}
      >
        {(formikProps) => {
          return (
            <Form className="mt-4">
              <FormGroup style={styles}>
                <div style={{ width: "150px" }}>
                  <label className="h-label-profile h-lable-Obligatory">
                    Họ tên
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <div className="d-flex justify-content-between">
                    <p>
                      {dataCustomerInfo.customerName === null
                        ? "Chưa cập nhật"
                        : `${dataCustomerInfo.customerName}`}
                    </p>
                    <div
                      className="h-profile-edit"
                      onClick={() => {
                        handleClickEditCustomerName();
                      }}
                    >
                      {editCustomerName === false ? "Chỉnh sửa" : "Hủy"}
                    </div>
                  </div>
                  <div
                    className={
                      editCustomerName === false ? "d-none" : "d-block"
                    }
                  >
                    <FastField
                      className="h-textbox"
                      name="CustomerName"
                      component={InputField}
                    />
                    <button
                      style={{ float: "right" }}
                      className="h-button mt-1"
                      type="button"
                      onClick={() => {
                        submitAction = "CustomerName";
                        formikProps.submitForm();
                      }}
                    >
                      <IoMdSave size={20} color="#3664a4" />
                      Lưu
                    </button>
                  </div>
                </div>
              </FormGroup>
              <hr />
              <FormGroup style={styles} className="mt-1">
                <div style={{ width: "150px" }}>
                  <label className="h-label-profile h-lable-Obligatory">
                    Email
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <div className="d-flex justify-content-between">
                    <p>
                      {dataCustomerInfo.email === null
                        ? "Chưa cập nhật"
                        : `${dataCustomerInfo.email}`}
                    </p>
                    {/* <div className="h-profile-edit">Chỉnh sữa</div> */}
                  </div>
                </div>
              </FormGroup>
              <hr />
              <FormGroup style={styles} className="mt-2">
                <div style={{ width: "150px" }}>
                  <label className="h-label-profile">Số điện thoại</label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <div className="d-flex justify-content-between">
                    <p>
                      {dataCustomerInfo.phoneNumber === null
                        ? "Chưa cập nhật"
                        : `${dataCustomerInfo.phoneNumber}`}
                    </p>
                    <div
                      className="h-profile-edit"
                      onClick={() => {
                        handleClickEditPhoneNumber();
                      }}
                    >
                      {editPhoneNumber === false ? "Chỉnh sửa" : "Hủy"}
                    </div>
                  </div>
                  <div
                    className={editPhoneNumber === false ? "d-none" : "d-block"}
                  >
                    <FastField
                      className="h-textbox"
                      name="PhoneNumber"
                      component={InputField}
                    />
                    <button
                      style={{ float: "right" }}
                      className="h-button mt-1"
                      type="button"
                      onClick={() => {
                        submitAction = "CustomerPhoneNumber";
                        formikProps.submitForm();
                      }}
                    >
                      <IoMdSave size={20} color="#3664a4" />
                      Lưu
                    </button>
                  </div>
                </div>
              </FormGroup>
              <hr />
              <FormGroup style={styles} className="">
                <div style={{ width: "150px" }}>
                  <label
                    className="h-label-profile"
                    style={{ marginTop: "0px !important" }}
                  >
                    Giới tính
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <div className="d-flex justify-content-between">
                    <p>
                      {dataCustomerInfo.gender === null
                        ? "Chưa cập nhật"
                        : dataCustomerInfo.gender === true
                        ? "Nam"
                        : "Nữ"}
                    </p>
                    <div
                      className="h-profile-edit"
                      onClick={() => {
                        handleClickEditGender();
                      }}
                    >
                      {editGender === false ? "Chỉnh sửa" : "Hủy"}
                    </div>
                  </div>
                  <div className={editGender === false ? "d-none" : "d-block"}>
                    <FastField
                      isClearable={false}
                      className="h-textbox"
                      name="Gender"
                      options={Options}
                      component={SelectField}
                    />
                    <button
                      style={{ float: "right" }}
                      className="h-button mt-1"
                      type="button"
                      onClick={() => {
                        submitAction = "CustomerGender";
                        formikProps.submitForm();
                      }}
                    >
                      <IoMdSave size={20} color="#3664a4" />
                      Lưu
                    </button>
                  </div>
                </div>
              </FormGroup>
              <hr />
              <FormGroup style={styles} className="">
                <div style={{ width: "150px" }}>
                  <label
                    className="h-label-profile"
                    style={{ marginTop: "0px !important" }}
                  >
                    Địa chỉ
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <div className="d-flex justify-content-between">
                    <p>
                      {dataCustomerInfo.address === null
                        ? "Chưa cập nhật"
                        : String(dataCustomerInfo?.address).split("||")[0]}
                    </p>
                    <div
                      className="h-profile-edit"
                      onClick={() => {
                        handleClickEditAddress();
                      }}
                    >
                      {editAddress === false ? "Chỉnh sửa" : "Hủy"}
                    </div>
                  </div>
                  <div className={editAddress === false ? "d-none" : "d-block"}>
                    <FastField
                      label="Địa chỉ"
                      className="h-textbox"
                      name="Address"
                      component={InputField}
                    />
                    <Row>
                      <Col xl={4} lg={12} className="mt-1">
                        <label>Tỉnh/Thành phố</label>
                        <Field
                          handleChange={(e) => {
                            handleChangeProvince(e);
                            formikProps.setFieldValue("DistrictID", "");
                            formikProps.setFieldValue("WardsID", "");
                          }}
                          isClearable={false}
                          isLoading={loading === "loading" ? true : false}
                          className="h-textbox"
                          name="ProvinceID"
                          options={data}
                          component={SelectField}
                        />
                      </Col>
                      <Col xl={4} lg={12} className="mt-1">
                        <label>Quận/huyện</label>
                        <Field
                          isClearable={false}
                          className="h-textbox"
                          handleChange={(e) => {
                            handleChangeDistrict(e);
                            formikProps.setFieldValue("WardsID", "");
                          }}
                          isLoading={
                            stateDistrict.loading === "loading" ? true : false
                          }
                          name="DistrictID"
                          options={stateDistrict.dataDistrictCbb}
                          component={SelectField}
                        />
                      </Col>
                      <Col xl={4} lg={12} className="mt-1">
                        <label>Phường/xã</label>
                        <Field
                          isClearable={false}
                          className="h-textbox"
                          name="WardsID"
                          isLoading={
                            stateWards.loading === "loading" ? true : false
                          }
                          options={stateWards.dataWardsCbb}
                          component={SelectField}
                        />
                      </Col>
                    </Row>
                    <button
                      style={{ float: "right" }}
                      className="h-button mt-1"
                      type="button"
                      onClick={() => {
                        submitAction = "CustomerAddress";
                        formikProps.submitForm();
                      }}
                    >
                      <IoMdSave size={20} color="#3664a4" />
                      Lưu
                    </button>
                  </div>
                </div>
              </FormGroup>
              <hr />
              <FormGroup style={styles} className="mt-1 mb-2">
                <div style={{ width: "150px" }}>
                  <label
                    className="h-label-profile"
                    style={{ marginTop: "0px !important" }}
                  >
                    Tổng số tour đã đi
                  </label>
                </div>
                <div style={{ width: "calc(100% - 150px" }}>
                  <div className="d-flex justify-content-between">
                    <p>0</p>
                  </div>
                </div>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

Profile.propTypes = {};

export default Profile;

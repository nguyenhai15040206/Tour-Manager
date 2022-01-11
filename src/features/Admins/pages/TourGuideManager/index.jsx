import React, { useRef, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Container, FormGroup } from "reactstrap";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { FastField, Form, Formik } from "formik";
import InputField from "./../../../../CustomFields/InputField/Index";
import TableGridControl from "./../../components/Customs/TableGridControl";
import { tableColumnTourGuide } from "../../../../utils/Columns";
import { useDispatch } from "react-redux";
import {
  Adm_CreateTourGuide,
  Adm_DeleteTourGuide,
  Adm_GetDataTourGuide,
  Adm_GetTourGuideByID,
  Adm_UpdateTourGuide,
} from "./../../Slices/SliceTourGuide";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import TourGuideAddEdit from "./TourGuideAddEdit";
import { Adm_GetProvince } from "./../../Slices/SliceAddress";
import { Adm_GetDistrictByProvinceCBB } from "../../Slices/SliceDistrict";
import { NotificationManager } from "react-notifications";
import { Adm_GetWardsByIdDistrictCbb } from "../../Slices/SliceWards";
import ImageDefault from "../../../../assets/logo/imageDefault.png";
import { unwrapResult } from "@reduxjs/toolkit";
import { Adm_UploadImageTourGuide } from "../../Slices/SliceImagesUpload";
import { useHistory } from "react-router-dom";
import ConfirmControl from "../../components/Customs/ConfirmControl";
import ExportDataToExcel from "../../components/Customs/ExportDataToExcel";

const initialValuesTourGuide = {
  tourGuideId: "",
  tourGuideName: "",
  phoneNumber: "",
  email: "",
  avatar: "",
  gender: "",
  provinceId: "",
  districtId: "",
  wardId: "",
  dateOfBirth: "",
  address: "",
};

const initialValuesSearch = {
  tourGuideName: "",
  phoneNumber: "",
  email: "",
};
function TourGuideManager(props) {
  document.title = "Quản lý hướng dẫn viên";
  const stateTourGuide = useSelector((state) => state?.tourGuide);

  ///
  const [initialValues, setInitialValues] = useState(initialValuesTourGuide);
  const [valueSearch, setValuesSearch] = useState(initialValuesSearch);
  const [imageDefault, setImageDefault] = useState(`${ImageDefault}`);
  const [imageUpload, setImageUpload] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // export data excel
  const [dataExport, setDataExport] = useState([]);
  const [showConfirmExport, setShowConfirmExport] = useState(false);
  //
  ///
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  ///
  const handleClickShowModal = async () => {
    dispatch(Adm_GetProvince())
      .then(unwrapResult)
      .then(() => {
        setInitialValues(initialValuesTourGuide);
        setImageDefault(`${ImageDefault}`);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ///
  const handleChoseImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };
  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
    setShowConfirmExport(false);
  };
  const onGridReady = async () => {
    try {
      await dispatch(Adm_GetDataTourGuide(valueSearch));
    } catch (error) {
      console.log(error);
    }
  };
  ///search
  const handelSubmitSearch = async (values) => {
    try {
      setValuesSearch(values);
      await dispatch(Adm_GetDataTourGuide(values));
    } catch (error) {
      console.log(error);
    }
  };

  //thực hiện thêm
  const onInsertData = async (tourGuid, values) => {
    let imageAvata = "";
    try {
      if (values.avatar !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        imageAvata = unwrapResult(
          await dispatch(Adm_UploadImageTourGuide(formData))
        ).fileName;
      }
      await dispatch(
        Adm_CreateTourGuide({
          ...tourGuid,
          avatar: imageAvata,
        })
      )
        .then(unwrapResult)
        .then(() => {
          onGridReady();
          return NotificationManager.success(
            "Thêm mới thành công!",
            "Success!",
            1500
          );
        })
        .catch((err) => {
          if (err.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            return history.push("/admin/login");
          }
          return NotificationManager.error(`${err.error}`, "Error!", 1500);
        });
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem("accessTokenEmp");
        return history.push("/admin/login");
      }
      return NotificationManager.error(`${err.error}`, "Error!", 1500);
    }
  };

  const onUpdateData = async (tourGuid, values) => {
    let imageAvata = "";
    try {
      if (values.avatar !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        imageAvata = unwrapResult(
          await dispatch(Adm_UploadImageTourGuide(formData))
        ).fileName;
      }
      await dispatch(
        Adm_UpdateTourGuide({
          ...tourGuid,
          avatar: imageAvata,
          tourGuideId: values.tourGuideId,
        })
      )
        .then(unwrapResult)
        .then(() => {
          onGridReady();
          return NotificationManager.success(
            "Cập nhật thành công!",
            "Success!",
            1500
          );
        })
        .catch((err) => {
          if (err.status === 401) {
            localStorage.removeItem("accessTokenEmp");
            return history.push("/admin/login");
          }
          return NotificationManager.error(`${err.error}`, "Error!", 1500);
        });
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem("accessTokenEmp");
        return history.push("/admin/login");
      }
      return NotificationManager.error(`${err.error}`, "Error!", 1500);
    }
  };
  const handleClickSubmitForm = (values) => {
    const TourGiudObj = {
      //tourGuidID: values.tourGuidID
      tourGuideName: values.tourGuideName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      gender: values.gender,
      address: `${values.address} || ${values.wardId} || ${values.districtId} || ${values.provinceId}`,
      dateOfBirth: values.dateOfBirth,
      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };
    if (values.tourGuideId !== "") {
      onUpdateData(TourGiudObj, values);
    } else {
      onInsertData(TourGiudObj, values);
    }
  };

  //
  const handelChangeProvice = async (e) => {
    try {
      const params = {
        provinceID: e.value,
      };
      await dispatch(Adm_GetDistrictByProvinceCBB(params));
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeDistrict = async (e) => {
    try {
      const params = {
        districtID: e.value,
      };
      await dispatch(Adm_GetWardsByIdDistrictCbb(params));
    } catch (err) {
      console.log(err);
    }
  };

  //
  const handleClickEditCompanyFromGrid = async (tourGuideId) => {
    console.log(tourGuideId);
    dispatch(Adm_GetTourGuideByID({ TourGuideId: tourGuideId }))
      .then(unwrapResult)
      .then(async (payload) => {
        try {
          const arrAddress = payload.address.split("||");
          setImageDefault(`${payload.avatar}`);
          await dispatch(Adm_GetProvince());
          if (arrAddress[3] !== undefined) {
            await dispatch(
              Adm_GetDistrictByProvinceCBB({
                provinceID: Number(arrAddress[3].trim()),
              })
            );
          }
          if (arrAddress[2] !== undefined) {
            await dispatch(
              Adm_GetWardsByIdDistrictCbb({
                districtID: Number(arrAddress[2].trim()),
              })
            );
          }

          setInitialValues({
            tourGuideId: payload.tourGuideId,
            tourGuideName: payload.tourGuideName,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            avatar: "",
            gender: `${payload.gender}`,
            provinceId:
              arrAddress[3] === undefined ? "" : Number(arrAddress[3].trim()),
            districtId:
              arrAddress[2] === undefined ? "" : Number(arrAddress[2].trim()),
            wardId:
              arrAddress[1] === undefined ? "" : Number(arrAddress[1].trim()),
            dateOfBirth: String(payload?.dateOfBirth).slice(0, 10),
            address: arrAddress[0],
          });
          setShowModal(true);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //
  const handelClickDelete = (event) => {
    try {
      event.preventDefault();
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.tourGuideId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(String);
      // nếu là chưa chọn => vui lòng chọn dòng cần xóa
      if (Ids[0] === "") {
        return NotificationManager.warning(
          "Chọn một dòng để xóa!!!",
          "Warning!",
          1500
        );
      }
      setSelectedIds(Ids);
      setShowConfirm(true);
    } catch (err) {
      console.log(err);
    }
  };

  //
  const handleClickDeleteMultiRow = () => {
    let DeleteModels = {
      SelectByIds: selectedIds,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_DeleteTourGuide(DeleteModels))
      .then(unwrapResult)
      .then(() => {
        onGridReady();
        setShowConfirm(false);
        return NotificationManager.success(`Xóa thành công!`, "Success!", 1500);
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(
          `${err.message}!`,
          "Xóa thất bại!",
          1500
        );
      });
  };

  //============
  //==== export
  const onBtnExportData = (event) => {
    event.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);

    if (selectedData.length === 0) {
      const arrObjExport = [];
      stateTourGuide.dataTourGuide.forEach((element) => {
        const Obj = {
          "Mã nhân viên": element.tourGuideId,
          "Tên nhân viên": element.tourGuideName,
          "Giới tính": element.gender,
          "Ngày sinh": element.dateOfBirth,
          "Số điện thoại": element.phoneNumber,
          "Email ": element.email,
          "Địa chỉ": element.address,
          "Ngày cập nhật": element.dateUpdate,
          "Nhân viên cập nhật": element.empName,
          //
        };
        arrObjExport.push(Obj);
      });
      setDataExport(arrObjExport);
    } else {
      const arrObjExport = [];
      selectedData.forEach((element) => {
        const Obj = {
          "Mã nhân viên": element.tourGuideId,
          "Tên nhân viên": element.tourGuideName,
          "Giới tính": element.gender,
          "Ngày sinh": element.dateOfBirth,
          "Số điện thoại": element.phoneNumber,
          "Email ": element.email,
          "Địa chỉ": element.address,
          "Ngày cập nhật": element.dateUpdate,
          "Nhân viên cập nhật": element.empName,
          //
        };
        arrObjExport.push(Obj);
      });
      setDataExport(arrObjExport);
    }
    setShowConfirmExport(true);
  };

  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        count={selectedIds.length}
        ConfirmDelete={handleClickDeleteMultiRow}
      />
      <TourGuideAddEdit
        toggle={toggle}
        showModal={showModal}
        className="modal-lg"
        initialValues={initialValues}
        onSubmitForm={(values) => {
          handleClickSubmitForm(values);
        }}
        onChangeProvince={handelChangeProvice}
        onChangeDistrict={handleChangeDistrict}
        //
        imageDefault={imageDefault}
        onChangeImage={handleChoseImage}
      />
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
                      <a href="admin/tourguide">Home</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="admin/tourguide">Library</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Data</BreadcrumbItem>
                    <li className="breadcrumb-item">
                      <FormGroup
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          style={{ cursor: "pointer" }}
                          className="pt-2"
                          data-bs-toggle="collapse"
                          data-bs-target="#showSearch"
                        ></input>
                        <label>Thu gọn vùng tìm kiếm</label>
                      </FormGroup>
                    </li>
                  </Breadcrumb>
                </Col>
                <Col lg={12}>
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={valueSearch}
                      onSubmit={handelSubmitSearch}
                    >
                      {(formilk) => {
                        return (
                          <>
                            <Form className="mt-2">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Tên HDV
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="tourGuideName"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Số điện thoại
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="phoneNumber"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Email
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="email"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="commandToolBarWidge">
                                    <button
                                      type="button"
                                      onClick={handleClickShowModal}
                                      className="h-button"
                                    >
                                      <IoMdAddCircle
                                        color="#2b6e44"
                                        size={15}
                                      />{" "}
                                      Tạo mới
                                    </button>
                                    <button
                                      type="submit"
                                      className="h-button"
                                      style={{ marginLeft: "3px" }}
                                    >
                                      <FaSearch
                                        color="rgb(180 173 30)"
                                        size={15}
                                      />
                                      {""} Tìm kiếm
                                    </button>
                                    <div
                                      style={{
                                        float: "right",
                                        display: "flex",
                                      }}
                                    >
                                      <ExportDataToExcel
                                        toggle={toggle}
                                        showModal={showConfirmExport}
                                        onExportData={onBtnExportData}
                                        apiData={dataExport}
                                        fileName="DSHuongDanVien"
                                      />
                                      <button
                                        onClick={handelClickDelete}
                                        type="button"
                                        className="h-button"
                                        style={{ marginLeft: "3px" }}
                                      >
                                        <RiDeleteBin6Line size={15} /> Xóa
                                      </button>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </>
                        );
                      }}
                    </Formik>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TableGridControl
              rowData={stateTourGuide.dataTourGuide}
              onGridReady={onGridReady}
              gridRef={gridRef}
              //
              tableHeight="360px"
              fieldValues="tourGuideId"
              tableColoumn={tableColumnTourGuide}
              onEditForm={handleClickEditCompanyFromGrid}
            ></TableGridControl>
          </Col>
        </Row>
      </Container>
    </>
  );
}

TourGuideManager.propTypes = {};

export default TourGuideManager;

import { FastField, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import InputField from "./../../../../CustomFields/InputField/Index";
import { useDispatch, useSelector } from "react-redux";
import { Adm_GetProvince } from "./../../Slices/SliceAddress";
import SelectField from "./../../../../CustomFields/SelectField/Index";
import {
  Adm_CreateTourAttr,
  Adm_DeleteTouristAttr,
  Adm_EditTouristAttr,
  Adm_GetTouristAttr,
  Adm_GetTouristAttrById,
} from "./../../Slices/SliceTouristAttraction";
import TableGridControl from "../../components/Customs/TableGridControl";
import { tableColumnTouristAttr } from "./../../../../utils/Columns";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import TouristAttrAddEdit from "./TouristAttrAddEdit";
import { NotificationManager } from "react-notifications";
import { unwrapResult } from "@reduxjs/toolkit";
import ConfirmControl from "../../components/Customs/ConfirmControl";
import { Adm_UploadImageTouristAttr } from "../../Slices/SliceImagesUpload";
import { useHistory } from "react-router-dom";
import validationSchema from "../../../../utils/ValidateShema";
import ExportDataToExcel from "../../components/Customs/ExportDataToExcel";

const initialValuesTourAttr = {
  touristAttrName: "",
  provinceId: [],
};

const initialValuesInsert = {
  TouristAttrID: "",
  TouristAttrName: "",
  ProvinceID: "",
  TouristAttrImages: [],
  Description: "",
};
const baseURL =
  process.env.REACT_APP_TOUR_MANAGER_API_KEY + "ImagesTouristAttractions/";

function TourAttrManager() {
  document.title = "Quản lý địa điểm du lịch";
  //state in component
  const [showModal, setShowModal] = useState(false);
  const [stateOptionChange, setStateOptionChange] = useState([]);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [showConfirm, setShowConfirm] = useState(false);
  const [values, setValues] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [validation, setValidation] = useState(
    validationSchema.TouristAttractionAdd
  );

  //state in store
  const stateProvince = useSelector((state) => state?.address);
  const stateTouristAtt = useSelector((state) => state?.touristAttraction);

  const dispatch = useDispatch();
  const gridRef = useRef(null);
  const history = useHistory();

  const handleClickShowModal = async () => {
    try {
      await dispatch(Adm_GetProvince({}));
      setSelectedImages([]);
      setInitialValues(initialValuesInsert);
      setValidation(validationSchema.TouristAttractionAdd);
      setShowModal(true);
    } catch (err) {
      return NotificationManager.error(`${err.message}`, "Error!", 1500);
    }
  };

  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };

  ///lấy danh sách tỉnh thành
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const values = {};
        await dispatch(Adm_GetProvince(values));
      } catch {
        throw console.error();
      }
    };
    fetchApi();
  }, [dispatch]);

  const onGridReady = async () => {
    try {
      const params = {
        touristAttrName: document.getElementById("touristAttrName").value,
        provinceId: stateOptionChange,
      };
      await dispatch(Adm_GetTouristAttr(params));
    } catch (err) {
      return NotificationManager.error(`${err.error}`, "Error!", 1500);
    }
  };

  //tìm kiếm
  const handelClickSearch = async (values) => {
    try {
      setStateOptionChange(values.provinceId);
      await dispatch(Adm_GetTouristAttr(values));
    } catch (err) {
      console.log(err);
    }
  };
  //xóa
  const handleClickDelete = async (e) => {
    e.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.touristAttrId}`)
      .join(",");
    const Ids = selectedDataStringPresentation.split(",").map(String);
    if (Ids[0] === "") {
      return NotificationManager.warning(
        "Chọn một dòng để xóa!!!",
        "Warning!",
        1500
      );
    }
    setValues(Ids);
    setShowConfirm(true);
  };
  const ConfirmDelete = async () => {
    let DeleteModels = {
      SelectByIds: values,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_DeleteTouristAttr(DeleteModels))
      .then(unwrapResult)
      .then((payload) => {
        onGridReady();
        setShowConfirm(false);
        return NotificationManager.success("Success!", "Xóa thành công!", 1500);
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(`${err.error}`, "Xóa thất bại!", 1500);
      });
  };

  //===================
  //
  const onInsertTouristAttr = async (touristAttr, type) => {
    let formData = new FormData();
    imagesUpload.forEach((file) => {
      formData.append("files", file);
    });
    dispatch(Adm_UploadImageTouristAttr(formData))
      .then(unwrapResult)
      .then((payload) => {
        const imagesList = payload.map((item) => item.fileName).join("||");
        dispatch(Adm_CreateTourAttr({ ...touristAttr, imagesList: imagesList }))
          .then(unwrapResult)
          .then(async () => {
            if (Number(type) === 2) {
              setInitialValues(initialValuesInsert);
              setSelectedImages([]);
            }
            if (Number(type) === 3) {
              setShowModal(false);
            }
            await onGridReady();
            return NotificationManager.success(
              "Thêm thành công!",
              " Success!",
              1500
            );
          })
          .catch((err) => {
            if (err.status === 401) {
              localStorage.removeItem("accessTokenEmp");
              return history.push("/admin/login");
            }
            return NotificationManager.error(`${err.message}`, "Error!", 1500);
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      });
  };

  const onUpdateTouristAttr = async (tourist, values, type) => {
    let imagesListTourist = "";
    try {
      if (values.TouristAttrImages !== "") {
        let formData = new FormData();
        imagesUpload.forEach((file) => {
          formData.append("files", file);
        });
        await dispatch(Adm_UploadImageTouristAttr(formData))
          .then(unwrapResult)
          .then((payload) => {
            imagesListTourist = payload.map((item) => item.fileName).join("||");
          })
          .catch((err) => {
            if (err.status === 401) {
              localStorage.removeItem("accessTokenEmp");
              return history.push("/admin/login");
            }
            return NotificationManager.error(`${err.message}`, "Error!", 1500);
          });
      }
      dispatch(
        Adm_EditTouristAttr({
          ...tourist,
          imagesList: imagesListTourist,
          touristAttrId: values.TouristAttrID,
        })
      )
        .then(unwrapResult)
        .then(async () => {
          if (Number(type) === 2) {
            setInitialValues(initialValuesInsert);
            setSelectedImages([]);
          }
          if (Number(type) === 3) {
            setShowModal(false);
          }
          await onGridReady();
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
          return NotificationManager.error(`${err.message}`, "Error!", 1500);
        });
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem("accessTokenEmp");
        return history.push("/admin/login");
      }
      return NotificationManager.error(`${err.message}`, "Error!", 1500);
    }
  };
  const handleClickSubmitForm = async (values, type) => {
    const data = {
      touristAttrName: values.TouristAttrName,
      description: values.Description,
      provinceId: values.ProvinceID,
      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };
    if (values.TouristAttrID !== "") {
      onUpdateTouristAttr(data, values, type);
    } else {
      onInsertTouristAttr(data, type);
    }
  };

  const handleClickEdit = async (touristAttrId) => {
    try {
      setValidation(validationSchema.TouristAttractionEdit);
      await dispatch(Adm_GetProvince({}));
      const params = {
        touristAttrId: touristAttrId,
      };
      dispatch(Adm_GetTouristAttrById(params))
        .then(unwrapResult)
        .then((payload) => {
          console.log(payload);
          setSelectedImages([]);
          if (payload.imagesList === null) {
            setSelectedImages([]);
          } else {
            const arrObj = payload.imagesList.map((item) => baseURL + item);
            setSelectedImages(arrObj);
          }

          setInitialValues({
            TouristAttrID: payload.touristAttrId,
            TouristAttrName: payload.touristAttrName,
            TouristAttrImages: "",
            Description:
              payload.description === null ? "" : payload.description,
            ProvinceID: payload.provinceId,
          });
          setShowModal(true);
        })
        .catch((err) => {
          return NotificationManager.error(`${err.message}`, "Error!", 1500);
        });
    } catch (err) {
      return NotificationManager.error(`${err.message}`, "Error!", 1500);
    }
  };

  // handle click chose multi images
  const handleClickChangeImages = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages(fileArray);
      Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImagesUpload([]);
      Array.from(event.target.files).map((item) =>
        setImagesUpload((prev) => [...prev, item])
      );
    }
  };

  //=======================
  return (
    <>
      <ConfirmControl
        toggle={toggle}
        showModal={showConfirm}
        count={values.length}
        ConfirmDelete={ConfirmDelete}
      />
      <TouristAttrAddEdit
        className="modal-lg"
        toggle={toggle}
        showModal={showModal}
        initialValues={initialValues}
        validationSchema={validation}
        onChangeImages={handleClickChangeImages}
        imagesList={selectedImages}
        onSubmitForm={(values) => {
          handleClickSubmitForm(values, 1);
        }}
        onSubmitFormAndCreate={(values) => {
          handleClickSubmitForm(values, 2);
        }}
        onSubmitFormAndClose={(values) => {
          handleClickSubmitForm(values, 3);
        }}
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
                  {/**Begin start */}
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="/admin/TourAtrr">Trang chủ</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="admin/TourAttr">Danh mục Travel</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      Danh sách địa điểm du lịch
                    </BreadcrumbItem>
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
                  {/**end */}
                </Col>
                <Col lg={12}>
                  {/**begin search */}
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValuesTourAttr}
                      onSubmit={(values) => {
                        handelClickSearch(values);
                      }}
                    >
                      {(formilk) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Tên địa điểm
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="touristAttrName"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Tỉnh thành
                                    </label>
                                    <div className="col-lg-8">
                                      <Field
                                        isMulti={true}
                                        className="h-textbox"
                                        isLoading={
                                          stateProvince.loading === "loaded"
                                            ? false
                                            : true
                                        }
                                        placeholder="Vui lòng chọn"
                                        name="provinceId"
                                        options={stateProvince?.data}
                                        component={SelectField}
                                      />
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="commandToolBarWidge">
                                    <button
                                      type="button"
                                      className="h-button"
                                      onClick={handleClickShowModal}
                                    >
                                      <IoMdAddCircle
                                        color="#2b6e44"
                                        size={15}
                                      />{" "}
                                      Tạo mới
                                    </button>

                                    <button
                                      className=" h-button"
                                      type="submit"
                                      style={{ marginLeft: "3px" }}
                                    >
                                      <FaSearch
                                        color="rgb(180 173 30)"
                                        size={15}
                                      />
                                      Tìm kiếm
                                    </button>
                                    <div style={{ float: "right" }}>
                                      <ExportDataToExcel
                                        apiData={stateTouristAtt?.data}
                                        fileName="DanhSachDiaDiemDuLich"
                                      />
                                      <button
                                        className="h-button"
                                        onClick={(e) => {
                                          handleClickDelete(e);
                                        }}
                                        style={{ marginLeft: "3px" }}
                                      >
                                        <RiDeleteBin6Line size={15} />
                                        Xóa
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
                  {/**end search */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TableGridControl
              rowData={stateTouristAtt?.data}
              tableHeight="450px"
              tableColoumn={tableColumnTouristAttr}
              gridRef={gridRef}
              onGridReady={onGridReady}
              onEditForm={handleClickEdit}
              fieldValues="touristAttrId"
            ></TableGridControl>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TourAttrManager;

import React from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { FastField, Field, Form, Formik } from "formik";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import InputField from "../../../../CustomFields/InputField/Index";
import TableGridControl from "../../components/Customs/TableGridControl";
import { tableColumnBanner } from "../../../../utils/Columns";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import {
  Adm_BannerDetails,
  Adm_DeleteBanner,
  Adm_GetDataBanner,
  Adm_InsertBanner,
  Adm_UpdateBanner,
} from "../../Slices/SliceBanner";
import BannerAddEdit from "./BannerAddEdit";
import { useEffect } from "react";
import { Adm_GetEnumConstantCbo } from "../../Slices/SliceEnumConstant";
import imageDefaultPNG from "../../../../assets/logo/imageDefault.png";
import { Adm_UploadImageBanner } from "../../Slices/SliceImagesUpload";
import ConfirmControl from "../../components/Customs/ConfirmControl";

const initialValuesSearch = {
  bannerType: "",
  active: false,
};

const initialValuesInsert = {
  bannerID: "",
  bannerImg: "",
  enumerationID: "",
  active: false,
};
function BannerManager(props) {
  document.title = "Quản lý banner";
  //
  const [valuesSearch, setValuesSearch] = useState(initialValuesSearch);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);
  //==
  const { data } = useSelector((state) => state.banner);
  const stateEnumConstant = useSelector((state) => state.enumConstant);
  //
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  //======
  useEffect(() => {
    const fectApi = async () => {
      try {
        const params = {
          enumTypeName: "BannerType",
        };
        await dispatch(Adm_GetEnumConstantCbo(params));
      } catch (err) {
        console.log(err);
      }
    };
    fectApi();
  }, [dispatch]);

  //====
  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };
  const handleClickShowModal = async () => {
    try {
      const params = {
        enumTypeName: "BannerType",
      };
      await dispatch(Adm_GetEnumConstantCbo(params));
      setInitialValues(initialValuesInsert);
      setImageDefault(`${imageDefaultPNG}`);
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };
  // load grid
  const onGridReady = async () => {
    try {
      await dispatch(Adm_GetDataBanner(valuesSearch));
    } catch (err) {
      if (err.status === 500) {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      }
    }
  };

  const handleClickSearch = async (values) => {
    try {
      setValuesSearch(values);
      await dispatch(Adm_GetDataBanner(values));
    } catch (err) {
      if (err.status === 500) {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      }
    }
  };

  // click change image
  const handleChoseImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };

  //==========
  //=
  const onInsertBanner = (banner, type) => {
    let formData = new FormData();
    formData.append("file", imageUpload);
    dispatch(Adm_UploadImageBanner(formData))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(Adm_InsertBanner({ ...banner, bannerImg: payload.fileName }))
          .then(unwrapResult)
          .then(() => {
            if (Number(type) === 2) {
              setInitialValues({
                bannerID: " ",
                bannerImg: "",
                enumerationID: "",
                active: false,
              });
              setImageDefault(`${imageDefaultPNG}`);
            }
            if (Number(type) === 3) {
              setShowModal(false);
            }
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
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };

  //===
  const onUpdateBanner = async (banner, values, type) => {
    console.log(values.bannerID);
    let bannerImgEdit = "";
    try {
      if (values.bannerImg !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        bannerImgEdit = unwrapResult(
          await dispatch(Adm_UploadImageBanner(formData))
        ).fileName;
      }
      await dispatch(
        Adm_UpdateBanner({
          ...banner,
          bannerImg: bannerImgEdit,
          bannerId: values.bannerID,
        })
      );
      if (Number(type) === 2) {
        setInitialValues(initialValuesInsert);
        setImageDefault(`${imageDefaultPNG}`);
      }
      if (Number(type) === 3) {
        setShowModal(false);
      }
      onGridReady();
      return NotificationManager.success(
        "Cập nhật thành công!",
        "Success!",
        1500
      );
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem("accessTokenEmp");
        return history.push("/admin/login");
      }
      return NotificationManager.error(
        `${err.message}`,
        "Cập nhật thất bại!",
        1500
      );
    }
  };
  const handleClickOnSubmitForm = (values, type) => {
    const banner = {
      enumerationID: values.enumerationID,
      active: values.active,
      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };

    //
    if (values.bannerID !== "") {
      onUpdateBanner(banner, values, type);
    } else {
      onInsertBanner(banner, type);
    }
  };
  //==
  //==========
  const handleClickEditPromotionFromGrid = async (bannerID) => {
    try {
      const params = {
        pID: bannerID,
      };
      dispatch(Adm_BannerDetails(params))
        .then(unwrapResult)
        .then((payload) => {
          setImageDefault(`${payload.bannerImg}`);
          setInitialValues({
            bannerID: payload.bannerId,
            bannerImg: "",
            enumerationID: payload.enumerationId,
            active: payload.active,
          });
          setShowModal(true);
        })
        .catch((err) => {
          return NotificationManager.error(
            `${err.error}`,
            "Vui lòng kiểm tra lại"
          );
        });
    } catch (err) {
      console.log(err);
    }
  };

  //==
  const handelClickDelete = (event) => {
    try {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.bannerId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(String);
      // nếu là chưa chọn => vui lòng chọn dòng cần xóa
      if (Ids[0] === "") {
        return NotificationManager.warning(
          "Chọn một dòng để xóa",
          "Warning!",
          1500
        );
      }
      setSelectedIds(Ids);
      setShowConfirm(true);
    } catch (err) {}
  };

  const handleClickDeleteMultiRow = () => {
    //#region  Xóa khuyến mãi
    let DeleteModels = {
      SelectByIds: selectedIds,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_DeleteBanner(DeleteModels))
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
          `${err.error}!`,
          "Xóa thất bại!",
          1500
        );
      });
    //#endregion
  };
  //=======
  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        count={selectedIds.length}
        ConfirmDelete={handleClickDeleteMultiRow}
      />
      <BannerAddEdit
        className="modal-lg"
        showModal={showModal}
        toggle={toggle}
        initialValues={initialValues}
        imageDefault={imageDefault}
        onChangeImage={handleChoseImage}
        onSubmitForm={(values) => {
          handleClickOnSubmitForm(values, 1);
        }}
        onSubmitFormAndCreate={(values) => {
          handleClickOnSubmitForm(values, 2);
        }}
        onSubmitFormAndClose={(values) => {
          handleClickOnSubmitForm(values, 3);
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
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="/admin">Trang chủ</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Quản lý Banner</BreadcrumbItem>
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
                        />
                        <label>Thu gọn vùng tìm kiếm</label>
                      </FormGroup>
                    </li>
                  </Breadcrumb>
                </Col>
                <Col ls={12}>
                  {/* Begin search */}
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValuesSearch}
                      onSubmit={handleClickSearch}
                      //validationSchema={validationShema}
                    >
                      {(formikProps) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={5} lg={6}>
                                  <FormGroup className="mt-1 row">
                                    <label className="col-lg-3 h-label">
                                      Loại danh mục
                                    </label>
                                    <div
                                      className="col-lg-7"
                                      style={{ marginRight: "4px" }}
                                    >
                                      <Field
                                        isClearable={false}
                                        name="bannerType"
                                        isLoading={
                                          stateEnumConstant?.loading ===
                                          "loading"
                                            ? true
                                            : false
                                        }
                                        placeholder="Vui lòng chọn"
                                        options={stateEnumConstant.dataCbo}
                                        component={SelectField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup row>
                                    <label className="h-label col-lg-3"></label>
                                    <div
                                      className="col-lg-7"
                                      style={{
                                        display: "flex",
                                        WebkitJustifyContent: "flex-start",
                                      }}
                                    >
                                      <FastField
                                        name="active"
                                        type="checkbox"
                                        className="h-checkbox"
                                        component={InputField}
                                      />
                                      <label className="h-label-checkbox">
                                        Tour được kích hoạt?
                                      </label>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              {/* Start toolbar widget */}
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
                                      />{" "}
                                      Tìm kiếm
                                    </button>
                                    <div style={{ float: "right" }}>
                                      <button
                                        type="button"
                                        onClick={handelClickDelete}
                                        className="h-button"
                                        style={{ marginLeft: "3px" }}
                                      >
                                        <RiDeleteBin6Line size={15} /> Xóa
                                      </button>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              {/* End tool bar widget */}
                            </Form>
                          </>
                        );
                      }}
                    </Formik>
                  </div>
                  {/* End search */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TableGridControl
              tableHeight="450px"
              rowData={data}
              onGridReady={onGridReady}
              gridRef={gridRef}
              //
              tableColoumn={tableColumnBanner}
              onEditForm={handleClickEditPromotionFromGrid}
              fieldValues="bannerId"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

BannerManager.propTypes = {};

export default BannerManager;

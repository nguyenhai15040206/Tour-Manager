import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line, RiFileExcel2Fill } from "react-icons/ri";
import SelectField from "../../../../CustomFields/SelectField/Index";
import TableGridControl from "../../components/Customs/TableGridControl";
import { tableColoumnCompanyTransport } from "../../../../utils/Columns";
import { useDispatch, useSelector } from "react-redux";
import { Adm_GetEnumConstantCbo } from "../../Slices/SliceEnumConstant";
import {
  Adm_DeleteCompanyByIds,
  Adm_GetCompanyById,
  Adm_GetCompanyList,
  Adm_InsertCompany,
  Adm_UpdateCompany,
} from "../../Slices/SliceTravelConpanyTransport";
import { unwrapResult } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import TravelCompanyAddEdit from "./TravelCompanyAddEdit";
import imageDefaultPNG from "../../../../assets/logo/imageDefault.png";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import { Adm_GetDistrictByProvinceCBB } from "../../Slices/SliceDistrict";
import { Adm_GetWardsByIdDistrictCbb } from "../../Slices/SliceWards";
import { UploadImageCompany } from "../../Slices/SliceImagesUpload";
import validationSchema from "../../../../utils/ValidateShema";
import ConfirmControl from "../../components/Customs/ConfirmControl";

const initialValuesSearch = {
  TransportTypeID: "",
  CompanyName: "",
};

const initialValuesInsert = {
  CompanyID: "",
  CompanyName: "",
  PhoneNumber: "",
  TravelTypeID: "",
  CompanyImage: "",
  ProvinceID: "",
  DistrictID: "",
  WardsID: "",
  Address: "",
};
function Transport(props) {
  document.title = "Phương tiện di chuyển";
  //==========================
  // state in component
  const [showModal, setShowModal] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationShema, setValidationShema] = useState(
    validationSchema.CompanyManagerAdd
  );
  const [initialValues, setInitialValues] = useState(initialValuesInsert);

  //end state

  /// state in store
  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateTravelCompany = useSelector(
    (state) => state.travelConpanyTransport
  );
  //end state
  //================
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  //=================
  useEffect(() => {
    const fetchApi = async () => {
      const params = {
        enumTypeName: "TransportType",
      };
      try {
        await dispatch(Adm_GetEnumConstantCbo(params));
      } catch (err) {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      }
    };
    fetchApi();
  }, [dispatch]);

  // load grid
  const onGridReady = () => {
    try {
      dispatch(Adm_GetCompanyList(initialValuesSearch));
    } catch (err) {
      if (err.status === 500) {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      }
      console.log(err.message);
    }
  };

  //======
  const handleClickSearch = async (values) => {
    console.log(values);
    try {
      await dispatch(Adm_GetCompanyList(values));
    } catch (err) {
      return NotificationManager.error(`${err.message}!`, "Error!", 1500);
    }
  };

  const handleClickShowModal = () => {
    const params = {
      enumTypeName: "TransportType",
    };
    dispatch(Adm_GetEnumConstantCbo(params))
      .then(unwrapResult)
      .then(async () => {
        await dispatch(Adm_GetProvince({}));
        setInitialValues(initialValuesInsert);
        setValidationShema(validationSchema.CompanyManagerAdd);
        setShowModal(true);
      })
      .catch((err) => {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      });
  };

  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };

  // click change image
  const handleChoseImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };

  // chọn tỉnh thành load quạn quyện
  const handleChangeProvince = async (event) => {
    try {
      if (event === null || event === "") {
        const params = {
          provinceIDs: ":(",
        };
        await dispatch(Adm_GetDistrictByProvinceCBB(params));
        return;
      }
      const params = {
        provinceID: event.value,
      };
      await dispatch(Adm_GetDistrictByProvinceCBB(params));
    } catch (err) {
      return NotificationManager.error(`${err.message}`, "Error!", 1500);
    }
  };

  const handleChangeDistrict = async (event) => {
    try {
      if (event === null || event === "") {
        const params = {
          districtIDs: ":(",
        };
        await dispatch(Adm_GetWardsByIdDistrictCbb(params));
        return;
      }
      const params = {
        districtID: event.value,
      };
      await dispatch(Adm_GetWardsByIdDistrictCbb(params));
    } catch (err) {
      return NotificationManager.error(`${err.message}`, "Error!", 1500);
    }
  };

  //==================
  const handleClickEditCompanyFromGrid = async (companyId) => {
    try {
      await dispatch(Adm_GetProvince({}));
      const params = {
        companyID: companyId,
      };
      dispatch(Adm_GetCompanyById(params))
        .then(unwrapResult)
        .then((payload) => {
          const params = {
            provinceID: payload.provinceID,
          };
          dispatch(Adm_GetDistrictByProvinceCBB(params))
            .then(unwrapResult)
            .then(async () => {
              const params = {
                districtID: payload.districtID,
              };
              await dispatch(Adm_GetWardsByIdDistrictCbb(params));
              setInitialValues({
                CompanyID: payload.companyId,
                CompanyName: payload.companyName,
                CompanyImage: "",
                ProvinceID: payload.provinceID,
                DistrictID: payload.districtID,
                WardsID: payload.wardsID,
                TravelTypeID: payload.enumerationID,
                PhoneNumber: payload.phoneNumber,
                Address: payload.address,
              });
              setValidationShema(validationSchema.CompanyManagerEdit);
              setImageDefault(payload.companyImage);
              setShowModal(true);
            })
            .catch((err) => {
              return NotificationManager.error(
                `${err.error}`,
                "Vui lòng kiểm tra lại"
              );
            });
        })
        .catch((err) => {
          return NotificationManager.error(
            `${err.error}`,
            "Vui lòng kiểm tra lại"
          );
        });
    } catch (err) {
      return NotificationManager.error(`${err.error}`, "Vui lòng kiểm tra lại");
    }
  };

  //================
  const onInsertCompany = (company) => {
    let formData = new FormData();
    formData.append("file", imageUpload);
    dispatch(UploadImageCompany(formData))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(
          Adm_InsertCompany({ ...company, companyImage: payload.fileName })
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
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };

  const onUpdateCompany = async (company, values) => {
    let companyImageEdit = "";
    try {
      if (values.CompanyImage !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        companyImageEdit = unwrapResult(
          await dispatch(UploadImageCompany(formData))
        ).fileName;
      }
      await dispatch(
        Adm_UpdateCompany({
          ...company,
          companyImage: companyImageEdit,
          companyId: values.CompanyID,
        })
      );

      onGridReady();
      return NotificationManager.success(
        "Cập nhật thành công!",
        "Success!",
        1500
      );
    } catch (err) {
      return NotificationManager.error(
        `${err.message}`,
        "Thêm thất bại!",
        1500
      );
    }
  };
  const handleClickOnSubmitForm = (values) => {
    const valuesInsert = {
      //companyID: values.CompanyID,
      companyName: values.CompanyName,
      phoneNumber: values.PhoneNumber,
      address:
        values.Address +
        "||" +
        values.WardsID +
        "||" +
        values.DistrictID +
        "||" +
        values.ProvinceID,
      provinceID: values.ProvinceID,
      enumerationID: values.TravelTypeID,

      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };
    console.log(valuesInsert);
    if (values.CompanyID !== "") {
      onUpdateCompany(valuesInsert, values);
    } else {
      onInsertCompany(valuesInsert);
    }
  };
  //

  //==================
  // Chọn dòng để xóa
  const handelClickDelete = (event) => {
    try {
      event.preventDefault();
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.companyId}`)
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

  const handleClickDeleteMultiRow = () => {
    let DeleteModels = {
      SelectByIds: selectedIds,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    console.log(DeleteModels);
    dispatch(Adm_DeleteCompanyByIds(DeleteModels))
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
  //
  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        count={selectedIds.length}
        ConfirmDelete={handleClickDeleteMultiRow}
      />
      <TravelCompanyAddEdit
        showModal={showModal}
        toggle={toggle}
        imageDefault={imageDefault}
        initialValues={initialValues}
        validationShema={validationShema}
        onSubmitForm={(values) => {
          handleClickOnSubmitForm(values);
        }}
        onChangeImage={handleChoseImage}
        onChangeProvince={handleChangeProvince}
        onChangeDistrict={handleChangeDistrict}
        className="modal-lg"
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
                    <BreadcrumbItem active>
                      Phương tiện di chuyển
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
                        />
                        <label>Thu gọn vùng tìm kiếm</label>
                      </FormGroup>
                    </li>
                  </Breadcrumb>
                </Col>
                <Col lg="12">
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
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-1 row">
                                    <label className="col-lg-4 h-label">
                                      Loại phương tiện
                                    </label>
                                    <div
                                      className="col-lg-7"
                                      style={{ marginRight: "4px" }}
                                    >
                                      <Field
                                        name="TransportTypeID"
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
                                    <label className="h-label col-lg-4">
                                      Tên hãng p/tiện
                                    </label>
                                    <div className="col-lg-7">
                                      <FastField
                                        className="h-textbox"
                                        name="CompanyName"
                                        component={InputField}
                                      />
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
                                        className="h-button"
                                      >
                                        <RiFileExcel2Fill
                                          color="#2b6e44"
                                          size={15}
                                        />{" "}
                                        Xuất Excel
                                      </button>
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
              tableHeight="360px"
              rowData={stateTravelCompany.data}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableColoumnCompanyTransport}
              fieldValues="companyId"
              onEditForm={handleClickEditCompanyFromGrid}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Transport.propTypes = {};

export default Transport;

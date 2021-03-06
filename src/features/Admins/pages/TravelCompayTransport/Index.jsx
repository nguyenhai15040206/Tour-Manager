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
import ExportDataToExcel from "../../components/Customs/ExportDataToExcel";

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
  document.title = "Ph????ng ti???n di chuy???n";
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
  // export data excel
  const [dataExport, setDataExport] = useState([]);
  const [showConfirmExport, setShowConfirmExport] = useState(false);
  //

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
        setImageDefault(`${imageDefaultPNG}`);
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
    setShowConfirmExport(false);
  };

  // click change image
  const handleChoseImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };

  // ch???n t???nh th??nh load qu???n quy???n
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
                "Vui l??ng ki???m tra l???i"
              );
            });
        })
        .catch((err) => {
          return NotificationManager.error(
            `${err.error}`,
            "Vui l??ng ki???m tra l???i"
          );
        });
    } catch (err) {
      return NotificationManager.error(`${err.error}`, "Vui l??ng ki???m tra l???i");
    }
  };

  //================
  const onInsertCompany = (company, type) => {
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
            if (Number(type) === 2) {
              setInitialValues(initialValuesInsert);
            }
            if (Number(type) === 3) {
              setShowModal(false);
            }
            onGridReady();
            return NotificationManager.success(
              "Th??m m???i th??nh c??ng!",
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

  const onUpdateCompany = async (company, values, type) => {
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
      if (Number(type) === 2) {
        setInitialValues(initialValuesInsert);
        setImageDefault(`${imageDefaultPNG}`);
      }
      if (Number(type) === 3) {
        setShowModal(false);
      }
      onGridReady();
      return NotificationManager.success(
        "C???p nh???t th??nh c??ng!",
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
        "C???p nh???t th???t b???i!",
        1500
      );
    }
  };
  const handleClickOnSubmitForm = (values, type) => {
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
      onUpdateCompany(valuesInsert, values, type);
    } else {
      onInsertCompany(valuesInsert, type);
    }
  };
  //

  //==================
  // Ch???n d??ng ????? x??a
  const handelClickDelete = (event) => {
    try {
      event.preventDefault();
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.companyId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(String);
      // n???u l?? ch??a ch???n => vui l??ng ch???n d??ng c???n x??a
      if (Ids[0] === "") {
        return NotificationManager.warning(
          "Ch???n m???t d??ng ????? x??a!!!",
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
    dispatch(Adm_DeleteCompanyByIds(DeleteModels))
      .then(unwrapResult)
      .then(() => {
        onGridReady();
        setShowConfirm(false);
        return NotificationManager.success(`X??a th??nh c??ng!`, "Success!", 1500);
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(
          `${err.message}!`,
          "X??a th???t b???i!",
          1500
        );
      });
  };
  //

  //==== export
  const onBtnExportData = (event) => {
    event.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);

    if (selectedData.length === 0) {
      const arrObjExport = [];
      stateTravelCompany.data.forEach((element) => {
        const Obj = {
          "M?? c??ng ty": element.companyId,
          "T??n c??ng ty": element.companyName,
          "Lo???i ph????ng ti???n": element.enumerationID,
          "S??? ??i???n tho???i": element.phoneNumber,
          "??ia ch???": element.address,
          "Nh??n vi??n c???p nh???t": element.empIDUpdate,
          "Ng??y c???p nh???t": element.dateUpdate,
          //
        };
        arrObjExport.push(Obj);
      });
      setDataExport(arrObjExport);
    } else {
      const arrObjExport = [];
      selectedData.forEach((element) => {
        const Obj = {
          "M?? c??ng ty": element.companyId,
          "T??n c??ng ty": element.companyName,
          "Lo???i ph????ng ti???n": element.enumerationID,
          "S??? ??i???n tho???i": element.phoneNumber,
          "??ia ch???": element.address,
          "Nh??n vi??n c???p nh???t": element.empIDUpdate,
          "Ng??y c???p nh???t": element.dateUpdate,
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
      <TravelCompanyAddEdit
        showModal={showModal}
        toggle={toggle}
        imageDefault={imageDefault}
        initialValues={initialValues}
        validationShema={validationShema}
        onSubmitForm={(values) => {
          handleClickOnSubmitForm(values, 1);
        }}
        onSubmitFormAndCreate={(values) => {
          handleClickOnSubmitForm(values, 2);
        }}
        onSubmitFormAndClose={(values) => {
          handleClickOnSubmitForm(values, 3);
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
                      <a href="/admin">Trang ch???</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      Ph????ng ti???n di chuy???n
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
                        <label>Thu g???n v??ng t??m ki???m</label>
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
                                      Lo???i ph????ng ti???n
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
                                        placeholder="Vui l??ng ch???n"
                                        options={stateEnumConstant.dataCbo}
                                        component={SelectField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup row>
                                    <label className="h-label col-lg-4">
                                      T??n h??ng p/ti???n
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
                                      T???o m???i
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
                                      T??m ki???m
                                    </button>
                                    <div style={{ float: "right" }}>
                                      <ExportDataToExcel
                                        toggle={toggle}
                                        showModal={showConfirmExport}
                                        onExportData={onBtnExportData}
                                        apiData={dataExport}
                                        fileName="DSCongTyPhuongTien"
                                      />
                                      <button
                                        type="button"
                                        onClick={handelClickDelete}
                                        className="h-button"
                                        style={{ marginLeft: "3px" }}
                                      >
                                        <RiDeleteBin6Line size={15} /> X??a
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

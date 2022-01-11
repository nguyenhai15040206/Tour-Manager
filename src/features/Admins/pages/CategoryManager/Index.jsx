import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import InputField from "../../../../CustomFields/InputField/Index";
import { FastField, Field, Form, Formik } from "formik";
import TableGridControl from "../../components/Customs/TableGridControl";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { tableColumnCategory } from "../../../../utils/Columns";
import {
  Adm_DeleteCatEnum,
  Adm_GetDataEnumListByType,
  Adm_GetEnumIDetails,
  Adm_InsertCatEnum,
  Adm_UpdateCatEnum,
} from "../../Slices/SliceEnumConstant";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import Options from "../../../../utils/Options";
import CategoryAddEdit from "./CategoryAddEdit";
import ConfirmControl from "../../components/Customs/ConfirmControl";

const initialValuesSearch = {
  enumTranslate: "",
  enumType: "",
};

const initialValuesInsert = {
  enumerationID: "",
  enumerationType: "",
  enumerationName: "",
  enumerationTranslate: "",
};
function CategoryManager(props) {
  document.title = "Quản lý danh mục";
  // state in componnet
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [valuesSearch, setValuesSearch] = useState(initialValuesSearch);
  //end state in compponent
  // state in store
  const { DataEnumByType } = useSelector((state) => state.enumConstant);
  //
  const gridRef = useRef(null);
  const dispatch = useDispatch();

  const history = useHistory();
  //
  // load grid
  const onGridReady = async () => {
    try {
      await dispatch(Adm_GetDataEnumListByType(valuesSearch));
    } catch (err) {
      if (err.status === 500) {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      }
      console.log(err.message);
    }
  };

  const handleClickSearch = async (values) => {
    try {
      if (values.enumType === "") {
        return NotificationManager.warning(
          `Vui lòng chọn danh mục loại`,
          "Warning!!!",
          2500
        );
      }
      setValuesSearch(values);
      await dispatch(Adm_GetDataEnumListByType(values));
    } catch (err) {
      if (err.status === 500) {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      }
    }
  };
  //
  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };
  const handleClickShowModal = () => {
    setInitialValues(initialValuesInsert);
    setShowModal(true);
  };

  //=====
  /// Submit form Update or Created
  const onInsertEnum = (enumtype, type) => {
    dispatch(Adm_InsertCatEnum(enumtype))
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
          "Tạo danh mục thành công!",
          "Success!",
          1500
        );
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        if (err.status === 409) {
          return NotificationManager.warning(
            `${err.message}`,
            "Vui lòng kiểm tra lại!",
            1500
          );
        }
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };

  //==
  const onUpdateEnum = (enumtype, values, type) => {
    dispatch(
      Adm_UpdateCatEnum({ ...enumtype, enumerationID: values.enumerationID })
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
          "Cập nhật danh mục thành công!",
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
  };

  const handleClickOnSubmitForm = (values, type) => {
    const promotion = {
      enumerationType: values.enumerationType,
      enumerationTranslate: values.enumerationTranslate,

      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };

    //
    if (values.enumerationID !== "") {
      onUpdateEnum(promotion, values, type);
    } else {
      onInsertEnum(promotion, type);
    }
  };

  //==========
  const handleClickEditPromotionFromGrid = async (enumID) => {
    try {
      const params = {
        pID: enumID,
      };
      dispatch(Adm_GetEnumIDetails(params))
        .then(unwrapResult)
        .then((payload) => {
          setInitialValues({
            enumerationID: payload.enumerationId,
            enumerationType: payload.enumerationType,
            enumerationName: payload.enumerationName,
            enumerationTranslate: payload.enumerationTranslate,
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
  // Chọn khuyến mãi để xóa
  const handelClickDelete = (event) => {
    try {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.enumerationId}`)
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
    dispatch(Adm_DeleteCatEnum(DeleteModels))
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

  //========
  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        count={selectedIds.length}
        ConfirmDelete={handleClickDeleteMultiRow}
      />
      <CategoryAddEdit
        showModal={showModal}
        className="modal-md"
        initialValues={initialValues}
        toggle={toggle}
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
                    <BreadcrumbItem active>
                      Quản lý danh mục loại
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
                                    <label className="col-lg-3 h-label h-lable-Obligatory">
                                      Loại danh mục
                                    </label>
                                    <div
                                      className="col-lg-7"
                                      style={{ marginRight: "4px" }}
                                    >
                                      <Field
                                        isClearable={false}
                                        name="enumType"
                                        placeholder="Vui lòng chọn"
                                        options={Options.OptionsCategory}
                                        component={SelectField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup row>
                                    <label className="h-label col-lg-3">
                                      Tên danh mục
                                    </label>
                                    <div className="col-lg-7">
                                      <FastField
                                        className="h-textbox"
                                        name="enumTranslate"
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
              rowData={DataEnumByType}
              gridRef={gridRef}
              //
              tableColoumn={tableColumnCategory}
              onEditForm={handleClickEditPromotionFromGrid}
              fieldValues="enumerationId"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

CategoryManager.propTypes = {};

export default CategoryManager;

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
import SelectField from "../../../../CustomFields/SelectField/Index";
import InputField from "../../../../CustomFields/InputField/Index";
import { FastField, Form, Formik } from "formik";
import { RiDeleteBin6Line, RiFileExcel2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import TableGridControl from "../../components/Customs/TableGridControl";
import { tableColumnPromotion } from "../../../../utils/Columns";
import PromotionAddEdit from "./PromotionAddEdit";
import { useDispatch } from "react-redux";
import {
  Adm_DeletePromotionByIds,
  Adm_GetPromotionById,
  Adm_GetPromotionList,
  Adm_InsertPromotion,
  Adm_UpdatePromotion,
} from "../../Slices/SlicePromotion";
import { unwrapResult } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmControl from "../../components/Customs/ConfirmControl";

const initialValuesSearh = {
  PromotionName: "",
  IsApplyAll: false,
};

const initialValuesInsert = {
  Discount: "",
  PromotionID: "",
  IsAppyAll: false,
  DateStart: "",
  DateEnd: "",
  PromotionName: "",
};
function Promotion(props) {
  document.title = "Khuyến mãi";
  //===================
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  /// state in store
  const { promotionList } = useSelector((state) => state.promotion);
  //end state

  // state in componnet
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  //end state in compponent
  //============== Sự kiện

  // Chọn khuyến mãi để xóa
  const handelClickDelete = (event) => {
    try {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.promotionId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(String);
      console.log("Ids", Ids);
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
  // load grid
  const onGridReady = () => {
    try {
      dispatch(Adm_GetPromotionList(initialValuesSearh));
    } catch (err) {
      if (err.status === 500) {
        return NotificationManager.error(`${err.message}`, "Error!", 1500);
      }
      console.log(err.message);
    }
  };
  const handleClickShowModal = () => {
    setInitialValues(initialValuesInsert);
    setShowModal(true);
  };

  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };

  const handleClickEditPromotionFromGrid = (promotionId) => {
    console.log(promotionId);
    const params = {
      pID: promotionId,
    };
    dispatch(Adm_GetPromotionById(params))
      .then(unwrapResult)
      .then((payload) => {
        setInitialValues({
          promotionId: payload.promotionId,
          Discount: payload.discount,
          PromotionID: payload.promotionId,
          IsAppyAll: payload.isApplyAll,
          DateEnd: payload.dateEnd.slice(0, 10),
          DateStart: payload.dateStart.slice(0, 10),
          PromotionName: payload.promotionName,
        });
        setShowModal(true);
      })
      .catch((err) => {
        return NotificationManager.error(
          `${err.error}`,
          "Vui lòng kiểm tra lại"
        );
      });
  };

  /// Submit form Update or Created
  const onInsertPromotion = (promotion) => {
    dispatch(Adm_InsertPromotion(promotion))
      .then(unwrapResult)
      .then(() => {
        onGridReady();
        return NotificationManager.success(
          "Tạo khuyến mãi thành công!",
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

  const onUpdatePromotion = (promotion, values) => {
    dispatch(
      Adm_UpdatePromotion({ ...promotion, promotionId: values.PromotionID })
    )
      .then(unwrapResult)
      .then(() => {
        onGridReady();
        return NotificationManager.success(
          "Cập nhật khuyến mãi thành công!",
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
  const handleClickOnSubmitForm = (values) => {
    const promotion = {
      promotionName: values.PromotionName,
      dateStart: values.DateStart,
      dateEnd: values.DateEnd,
      discount: values.Discount,
      isApplyAll: values.IsAppyAll,
      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };
    console.log(promotion);

    if (values.PromotionID !== "") {
      onUpdatePromotion(promotion, values);
    } else {
      onInsertPromotion(promotion);
    }
  };
  // // handel click Delete MultiRow
  const handleClickDeleteMultiRow = () => {
    let DeleteModels = {
      SelectByIds: selectedIds,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    console.log(DeleteModels);
    dispatch(Adm_DeletePromotionByIds(DeleteModels))
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

  const handleClickSearch = async (values) => {
    console.log(values);
    try {
      await dispatch(Adm_GetPromotionList(values));
    } catch (err) {
      return NotificationManager.error(`${err.message}!`, "Error!", 1500);
    }
  };
  //==============
  return (
    <>
      <ConfirmControl
        showModal={showConfirm}
        toggle={toggle}
        count={selectedIds.length}
        ConfirmDelete={handleClickDeleteMultiRow}
      />
      <PromotionAddEdit
        showModal={showModal}
        toggle={toggle}
        initialValues={initialValues}
        onSubmitForm={(values) => {
          handleClickOnSubmitForm(values);
        }}
        className="modal-md"
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
                      <a href="/admin">Danh mục travel</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Khuyến mãi</BreadcrumbItem>
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
                      initialValues={initialValuesSearh}
                      onSubmit={handleClickSearch}
                      //validationSchema={validationShema}
                    >
                      {(formikProps) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <label
                                      className="h-label"
                                      style={{ width: "110px" }}
                                    >
                                      Tên khuyến mãi
                                    </label>
                                    <div
                                      style={{ width: "calc(100% - 110px)" }}
                                    >
                                      <FastField
                                        className="h-textbox"
                                        name="PromotionName"
                                        component={InputField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup
                                    className="mt-1"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <label
                                      style={{ width: "110px" }}
                                      className="h-label"
                                    ></label>
                                    <div
                                      className=""
                                      style={{
                                        width: "calc(100% - 110px)",
                                        display: "flex",
                                        WebkitJustifyContent: "flex-start",
                                      }}
                                    >
                                      <FastField
                                        className="h-checkbox"
                                        name="IsApplyAll"
                                        component={InputField}
                                        type="checkbox"
                                      />
                                      <label className="h-label-checkbox">
                                        Áp dụng cho tất cả tour
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
              tableHeight="450px"
              rowData={promotionList}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableColumnPromotion}
              onEditForm={handleClickEditPromotionFromGrid}
              fieldValues="promotionId"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Promotion.propTypes = {};

export default Promotion;

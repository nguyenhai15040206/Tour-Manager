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

const initialValuesTourAttr = {
  touristAttrId: "",
  touristAttrName: "",
  imagesList: "",
  provinceId: "",
  description: "",
};
function TourAttrManager() {
  //state in component
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState(initialValuesTourAttr);
  const [showConfirm, setShowConfirm] = useState(false);
  const [values, setValues] = useState([]);

  //state in store
  const stateProvince = useSelector((state) => state?.address);
  const stateTouristAtt = useSelector((state) => state?.touristAttraction);

  const dispatch = useDispatch();
  const gridRef = useRef(null);

  const handleClickShowModal = async () => {
    await dispatch(Adm_GetProvince);
    setInitialValues(initialValuesTourAttr);
    setShowModal(true);
  };

  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };

  ///lấy danh sách tỉnh thành
  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(Adm_GetProvince());
        //await dispatch(Adm_GetTouristAttr(value));
      } catch {
        throw console.error();
      }
    };
    fetchApi();
  }, [dispatch]);

  const onGridReady = async (values) => {
    values = {};
    try {
      await dispatch(Adm_GetTouristAttr(values));
    } catch (err) {
      console.log(err);
    }
  };

  //tìm kiếm
  const handelClickSearch = async (values) => {
    try {
      await dispatch(Adm_GetTouristAttr(values));
      console.log(values);
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
    const Ids = selectedDataStringPresentation.split(",").map(Number);
    console.log(Ids[0]);
    if (Ids[0] === 0) {
      return NotificationManager.error(
        "Error!",
        "Chọn một dòng để xóa!!",
        1500
      );
    }
    setValues(Ids);
    setShowConfirm(true);
  };
  const ConfirmDelete = async () => {
    console.log(values);
    try {
      const value = {};
      await dispatch(Adm_DeleteTouristAttr(values));
      await dispatch(Adm_GetTouristAttr(value));
      setShowConfirm(false);
      return NotificationManager.success("Success!", "Xóa thành công!", 1500);
    } catch {
      return NotificationManager.error("Error!", "Xóa thất bại!", 1500);
    }
  };

  const handleClickSubmitForm = async (values) => {
    console.log(values);
    const touristAttr = {
      touristAttrId: values.touristAttrId,
      touristAttrName: values.touristAttrName,
      provinceId: values.provinceId,
      description: values.description,
      imagesList: values.imagesList,
    };
    const params = {};
    if (values.touristAttrId !== "") {
      console.log(values.touristAttrId);
      try {
        await dispatch(Adm_EditTouristAttr(values));
        await dispatch(Adm_GetTouristAttr(params));
        return NotificationManager.success("Success!", "Edit thành công");
      } catch (err) {
        console.log(err);
        return NotificationManager.error("Error!", "Edit thất bại");
      }
    } else {
      try {
        await dispatch(Adm_CreateTourAttr(touristAttr));
        await dispatch(Adm_GetTouristAttr(params));
        return NotificationManager.success(
          "Success!",
          "Thêm thành công!",
          1500
        );
      } catch (err) {
        console.log(err);
        return NotificationManager.error("Error!", "Thêm thất bại!", 1500);
      }
    }
  };

  const handleClickEdit = async (touristAttrId) => {
    try {
      const params = {
        touristAttrId: touristAttrId,
      };
      console.log(params);
      const rs = await dispatch(Adm_GetTouristAttrById(params));
      const unwrapRS = unwrapResult(rs);
      setInitialValues({
        touristAttrId: unwrapRS.touristAttrId,
        touristAttrName: unwrapRS.touristAttrName,
        imagesList: unwrapRS?.imagesList === null ? "" : unwrapRS.imagesList,
        description: unwrapRS.description,
        provinceId: unwrapRS.provinceId,
      });
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ConfirmControl
        toggle={toggle}
        showModal={showConfirm}
        ConfirmDelete={ConfirmDelete}
      />
      <TouristAttrAddEdit
        className="modal-lg"
        toggle={toggle}
        showModal={showModal}
        initialValues={initialValues}
        onSubmitForm={(values) => {
          handleClickSubmitForm(values);
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
                      <a href="/admin/TourAtrr">Home</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="admin/TourAttr">Library</a>
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
                  {/**end */}
                </Col>
                <Col lg={12}>
                  {/**begin search */}
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValues}
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
                                  <FormGroup className="mt-2 row">
                                    <label className="col-lg-3 h-label">
                                      Mã địa điểm
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="touristAttrId"
                                        type="number"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>

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
                                      Tên tỉnh thành
                                    </label>
                                    <div className="col-lg-8">
                                      <Field
                                        className="h-textbox"
                                        isLoading={
                                          stateProvince?.loading === "loaded"
                                            ? false
                                            : true
                                        }
                                        placeholder="Vui lòng chọn"
                                        name="provinceId"
                                        options={stateProvince.data.map(
                                          (item) => {
                                            return {
                                              value: item.value,
                                              label: item.label,
                                            };
                                          }
                                        )}
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
              rowData={stateTouristAtt.data}
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

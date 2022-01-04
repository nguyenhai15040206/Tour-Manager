import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { FastField, Field, Formik, Form } from "formik";
import InputField from "../../../../CustomFields/InputField/Index";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line, RiFileExcel2Fill } from "react-icons/ri";
import TableGridControl from "../../components/Customs/TableGridControl";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { tableColumnNews } from "../../../../utils/Columns";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Adm_DeleteNews,
  Adm_GetDataNewsList,
  Adm_GetNewsDetails,
  Adm_InsertNews,
  Adm_UpdateNews,
} from "../../Slices/SliceNews";
import NewsAddEdit from "./NewsAddEdit";
import imageDefaultPNG from "../../../../assets/logo/imageDefault.png";
import { Adm_GetEnumConstantCbo } from "../../Slices/SliceEnumConstant";
import { Adm_UploadImageNews } from "../../Slices/SliceImagesUpload";
import { unwrapResult } from "@reduxjs/toolkit";
import ConfirmControl from "../../components/Customs/ConfirmControl";
import ExportDataToExcel from "../../components/Customs/ExportDataToExcel";

const initialValuesSearchOld = {
  NewsName: "",
  KindOfNewsID: "",
  DateUpdate: "",
};

const initialValuesInsert = {
  NewsID: "",
  NewsName: "",
  NewsImg: "",
  KindOfNewID: "",
  Content: "",
  Active: false,
};
function NewManager(props) {
  const [initalValuesSearch, setInitalvaluesSearch] = useState(
    initialValuesSearchOld
  );
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);

  // export data excel
  const [dataExport, setDataExport] = useState([]);
  const [showConfirmExport, setShowConfirmExport] = useState(false);
  //
  const stateNews = useSelector((state) => state.news);
  const { dataCbo, loading } = useSelector((state) => state.enumConstant);
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchApiKindOfNew = async () => {
      try {
        await dispatch(Adm_GetEnumConstantCbo({ enumTypeName: "KindOfNews" }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchApiKindOfNew();
  }, []);

  //
  const onGridReady = () => {
    dispatch(Adm_GetDataNewsList(initalValuesSearch))
      .then(unwrapResult)
      .then((payload) => {
        // const arrObjExport = [];
        // payload.forEach((element) => {
        //   const Obj = {
        //     "Mã tin tức": element.newsId,
        //     "Tên tin tức": element.newsName,
        //     "Loại tin tức": element.kindOfNew,
        //     "Ảnh minh hoạ": element.newsImg,
        //     "Ngày cập nhật": element.dateUpdate,
        //     "Nhân viên cập nhật": element.empName,
        //     "Tin tức được kích hoạt": element.active,
        //     //
        //   };
        //   arrObjExport.push(Obj);
        // });
        // setDataExport(arrObjExport);
      })
      .catch((err) => {
        if (err.status === 500) {
          return NotificationManager.error(`${err.message}`, "Error!", 1500);
        }
      });
  };

  const handleClickSearchNew = async (values) => {
    setInitalvaluesSearch(values);
    try {
      await dispatch(Adm_GetDataNewsList(values));
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
    setShowConfirmExport(false);
  };

  const handleClickShowModal = async () => {
    try {
      await dispatch(Adm_GetEnumConstantCbo({ enumTypeName: "KindOfNews" }));
      setInitialValues(initialValuesInsert);
      setImageDefault(`${imageDefaultPNG}`);
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  //
  const handleChoseImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };

  //

  const onInsertNews = (news, type) => {
    let formData = new FormData();
    formData.append("file", imageUpload);
    dispatch(Adm_UploadImageNews(formData))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(Adm_InsertNews({ ...news, newsImg: payload.fileName }))
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

  //
  const onUpdateNews = async (news, values, type) => {
    let imgNewsUpdate = "";
    try {
      if (values.NewsImg !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        imgNewsUpdate = unwrapResult(
          await dispatch(Adm_UploadImageNews(formData))
        ).fileName;
      }
      dispatch(
        Adm_UpdateNews({
          ...news,
          newsImg: imgNewsUpdate,
          newsId: values.NewsID,
        })
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
      return NotificationManager.error(
        `${err.message}`,
        "Cập nhật thất bại!",
        1500
      );
    }
  };

  //
  const handleClickOnSubmitForm = async (values, type) => {
    const news = {
      newsName: values.NewsName,
      content: values.Content,
      enumerationID: values.KindOfNewID,
      active: values.Active,
      empIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      empIDUpdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };
    if (values.NewsID !== "") {
      onUpdateNews(news, values, type);
    } else {
      onInsertNews(news, type);
    }
  };

  //
  const handleClickEdit = (newsID) => {
    dispatch(Adm_GetNewsDetails({ newsID: newsID }))
      .then(unwrapResult)
      .then(async (payload) => {
        setShowModal(true);
        console.log(payload);
        try {
          await dispatch(
            Adm_GetEnumConstantCbo({ enumTypeName: "KindOfNews" })
          );
          setImageDefault(`${payload?.newsImg}`);
          await setInitialValues({
            NewsID: payload?.newsId,
            NewsName: payload?.newsName,
            NewsImg: "",
            KindOfNewID: payload?.enumerationId,
            Content: payload?.content,
            Active: payload?.active,
          });
          setShowModal(true);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        return NotificationManager.error(`${err.error}`, "Error!", 1500);
      });
  };

  //
  const handelClickDelete = (event) => {
    try {
      event.preventDefault();
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.newsId}`)
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
      console.log(selectedData);
      setSelectedIds(Ids);
      setShowConfirm(true);
    } catch (err) {
      console.log(err);
    }
  };

  //thuc hien xoa di 1 dong du lieu
  const ConfirmDelete = async () => {
    let DeleteModels = {
      SelectByIds: selectedIds,
      EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data.empId,
    };
    dispatch(Adm_DeleteNews(DeleteModels))
      .then(unwrapResult)
      .then(() => {
        onGridReady();
        setShowConfirm(false);
        return NotificationManager.success("Xóa thành công", "Success!");
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(`${err.error}`, "Xóa thất bại");
      });
  };

  //==== export
  const onBtnExportData = (event) => {
    event.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);

    if (selectedData.length === 0) {
      const arrObjExport = [];
      stateNews.data.forEach((element) => {
        const Obj = {
          "Mã tin tức": element.newsId,
          "Tên tin tức": element.newsName,
          "Loại tin tức": element.kindOfNew,
          "Ảnh minh hoạ": element.newsImg,
          "Ngày cập nhật": element.dateUpdate,
          "Nhân viên cập nhật": element.empName,
          "Tin tức được kích hoạt": element.active,
          //
        };
        arrObjExport.push(Obj);
      });
      setDataExport(arrObjExport);
    } else {
      const arrObjExport = [];
      selectedData.forEach((element) => {
        const Obj = {
          "Mã tin tức": element.newsId,
          "Tên tin tức": element.newsName,
          "Loại tin tức": element.kindOfNew,
          "Ảnh minh hoạ": element.newsImg,
          "Ngày cập nhật": element.dateUpdate,
          "Nhân viên cập nhật": element.empName,
          "Tin tức được kích hoạt": element.active,
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
        ConfirmDelete={ConfirmDelete}
        count={selectedIds.length}
      />
      <NewsAddEdit
        showModal={showModal}
        toggle={toggle}
        initialValues={initialValues}
        onChangeImages={handleChoseImage}
        imageDefault={imageDefault}
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
                    <BreadcrumbItem active>Quản lý tin tức</BreadcrumbItem>
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
                <Col lg={12}>
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initalValuesSearch}
                      onSubmit={handleClickSearchNew}
                    >
                      {(formikProps) => {
                        return (
                          <Form className="mt-1">
                            <Row className="pb-2">
                              <Col xl={4} lg={6}>
                                <FormGroup className="row">
                                  <label className="col-lg-3 h-label">
                                    Loại tin tức
                                  </label>
                                  <div className="col-lg-8">
                                    <Field
                                      name="KindOfNewsID"
                                      isLoading={
                                        loading === "loading" ? true : false
                                      }
                                      placeholder="Vui lòng chọn"
                                      options={dataCbo}
                                      component={SelectField}
                                    />
                                  </div>
                                </FormGroup>
                                <FormGroup className="row">
                                  <label className="col-lg-3 h-label">
                                    Tên tin tức
                                  </label>
                                  <div className="col-lg-8">
                                    <FastField
                                      className="h-textbox"
                                      name="NewsName"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                                <FormGroup className="row">
                                  <label className="col-lg-3 h-label">
                                    Ngày đăng
                                  </label>
                                  <div className="col-lg-8">
                                    <FastField
                                      type="date"
                                      className="h-textbox"
                                      name="DateUpdate"
                                      component={InputField}
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
                                    onClick={handleClickShowModal}
                                    className="h-button"
                                  >
                                    <IoMdAddCircle color="#2b6e44" size={15} />{" "}
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
                                    <ExportDataToExcel
                                      toggle={toggle}
                                      showModal={showConfirmExport}
                                      onExportData={onBtnExportData}
                                      apiData={dataExport}
                                      fileName="DSTinTuc"
                                    />
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
                          </Form>
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
              tableHeight="450px"
              rowData={stateNews.data}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableColumnNews}
              onEditForm={handleClickEdit}
              fieldValues="newsId"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

NewManager.propTypes = {};

export default NewManager;

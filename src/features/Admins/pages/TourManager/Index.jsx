import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FastField, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin6Line, RiFileExcel2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import InputField from "../../../../CustomFields/InputField/Index";
import { tableColumnsTour } from "../../../../utils/Columns";
import { customStyles } from "../../../../utils/constant";
import TableGridControl from "../../components/Customs/TableGridControl";
import { Adm_GetTourList } from "../../Slices/SliceTour";
import TourAddEdit from "./TourAddEdit";

function TourManager(props) {
  const [showModal, setShowModal] = useState(false);

  const gridRef = useRef(null);
  const dispatch = useDispatch();

  const { tourList } = useSelector((state) => state.tour);
  const onButtonClick = (e) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.athlete} ${node.age}`)
      .join(", ");
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  const onGridReady = async (values) => {
    values = {};
    try {
      await dispatch(Adm_GetTourList(values));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSearchTour = async (values) => {
    console.log(values);
    await dispatch(Adm_GetTourList(values));
  };

  const initialValues = {
    TourID: "",
    TourName: "",
    DateStart: "",
    DateEnd: "",
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleClickShowModal = () => {
    setShowModal(true);
  };

  const toggle = () => {
    setShowModal(false);
  };

  return (
    <>
      <TourAddEdit
        className="modal-xl"
        backdrop={"static"}
        toggle={toggle}
        showModal={!showModal}
      />
      <Container
        fluid
        className="animate__animated animate__slideInUp animate__delay-0.5s"
      >
        <Row>
          <Col>
            <div className="admin-widget">
              <Row>
                <Col lg="12">
                  {/* Begin sitemap */}
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="/admin">Home</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/admin">Library</a>
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
                        />
                        <label>Thu gọn vùng tìm kiếm</label>
                      </FormGroup>
                    </li>
                  </Breadcrumb>
                  {/* end sitemap */}
                </Col>
                <Col lg="12">
                  {/* Begin search */}
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleClickSearchTour}
                    >
                      {(formikProps) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col lg={4}>
                                  <FormGroup className="mt-2 row">
                                    <label className="col-lg-3 h-label">
                                      Loại hình tour
                                    </label>
                                    <div className="col-lg-8">
                                      <Select
                                        isLoading={true}
                                        styles={customStyles}
                                        placeholder="Vui lòng chọn"
                                        options={options}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Mã tour
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="TourID"
                                        type="number"
                                        component={InputField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Tên tour
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="TourName"
                                        component={InputField}
                                      />
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col lg={4}>
                                  <FormGroup className="mt-2 row">
                                    <label className="col-lg-3 h-label">
                                      Điểm xuất phát
                                    </label>
                                    <div className="col-lg-8">
                                      <Select
                                        isLoading={true}
                                        styles={customStyles}
                                        placeholder="Vui lòng chọn"
                                        options={options}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Ngày bắt đầu
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="DateStart"
                                        component={InputField}
                                        type="date"
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Ngày kết thúc
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="DateEnd"
                                        component={InputField}
                                        type="date"
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
                                        onClick={onButtonClick}
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
              rowData={tourList}
              gridRef={gridRef}
              onGridReady={onGridReady}
              //
              tableColoumn={tableColumnsTour}
            />
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

TourManager.propTypes = {};

export default TourManager;
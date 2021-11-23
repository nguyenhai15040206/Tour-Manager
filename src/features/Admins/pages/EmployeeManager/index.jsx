import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FastField, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin6Line, RiFileExcel2Fill } from "react-icons/ri";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { tableColumnEmployee } from "../../../../utils/Columns";
import TableGridControl from "../../components/Customs/TableGridControl";
import {
  Adm_DeleteEmployee,
  Adm_GetEmployeeList,
} from "../../Slices/SliceEmployee";
import InputField from "./../../../../CustomFields/InputField/Index";
import RadioField from "./../../../../CustomFields/InputField/RadioField";
import { TableColumnsEmployeeExport } from "./../../../../utils/ColumnsExport";
import DataExportExcelControl from "./../../components/Customs/DataExportExcelControl";
import EmployeeAddEdit from "./EmployeeAddEdit";
import { AgGridColumn } from "ag-grid-react";
import EditForm from "./../../components/Customs/EditForm";

// Thái Trần Kiều Diễm 20211115 -xử lý employee

function EmployeeManager(props) {
  // state in component
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState([]);
  // End
  //
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  //

  // state in store
  const stateEmp = useSelector((state) => state?.employee);
  console.log("select ", stateEmp?.dataEmpList);
  // end

  //const stateEmpDelete=useState((state)=>state?.employee.)

  //
  const onGridReady = async (values) => {
    values = {};
    try {
      await dispatch(Adm_GetEmployeeList(values));
    } catch (err) {
      console.log(err);
    }
  };

  //
  const handleClickShowModal = () => {
    setShowModal(true);
  };
  const toggle = () => {
    setShowModal(false);
  };
  //

  // start handle

  const handleClickDelete = async (e) => {
    try {
      const value = {};
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.empId}`)
        .join(",");
      const Ids = selectedDataStringPresentation.split(",").map(Number);
      console.log("Ids", Ids[0]);
      // nếu là chưa chọn => vui lòng chọn dòng cần xóa
      if (Ids[0] === 0) {
        return NotificationManager.Error("Error!", "Xóa thất bại!", 1500);
      }
      await dispatch(Adm_DeleteEmployee(Ids));
      await dispatch(Adm_GetEmployeeList(value));
      return NotificationManager.success("Success!", "Xóa thành công!", 1500);
    } catch (err) {
      console.log(err);
      return NotificationManager.Error(`${err}`, "Xóa thất bại!", 1500);
    }
  };

  const getSelectedRowData = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    //alert(`selected Nodes: ${JSON.stringify(selectedData)}`);
    console.log("selectedData", selectedData);
    setValue(selectedData);
    console.log(value);
  };
  // ham nay co dung khonog

  const handleUpdateEmplyee = (empID) => {
    try {
      alert(empID);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickExportExcel = () => {
    //const data = [];
    if (stateEmp.dataEmpList != null) {
      return (
        <div>
          <DataExportExcelControl
            columnsExport={TableColumnsEmployeeExport}
            DataExport={stateEmp.dataEmpList}
            button={
              <button
                type="button"
                className="h-button"
                //onClick={handleClickExportExcel()}
              >
                <RiFileExcel2Fill color="#2b6e44" size={15} /> Xuất Excel
              </button>
            }
          />
        </div>
      );
    }
  };

  // try +> catch
  const handelClickSearchTour = async (value) => {
    //console.log(value);
    await dispatch(Adm_GetEmployeeList(value));
    //console.log("");
  };

  const initialValues = {
    empId: "",
    empName: "",
    workingDate: "",
    gender: "",
    phoneNumber: "",
    email: "",
  };

  // roi ben nay khong goij ha

  return (
    <>
      <EmployeeAddEdit
        className="modal-lg"
        backdrop={"static"}
        toggle={toggle}
        showModal={showModal}
      />
      <Container
        fluid
        className="animate__animated animate_slideInUp animate__delay-0.5s "
      >
        <Row>
          <Col>
            <div className="admin-widget">
              <Row>
                <Col lg="12">
                  {/*Begin sitemap */}
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="/admin/employee">Home</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/admin/employee">Library</a>
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
                  {/*end Sitemap */}
                </Col>
                <Col lg="12">
                  {/**Begin Search */}
                  <div id="showSearch" className="collapse show">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handelClickSearchTour}
                    >
                      {(formikProps) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-2 row">
                                    <label className="col-lg-3 h-label">
                                      Mã nhân viên
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="empId"
                                        type="number"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Tên nhân viên
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="empName"
                                        component={InputField}
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Ngày làm việc
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
                                        className="h-textbox"
                                        name="workingDate"
                                        component={InputField}
                                        type="date"
                                      ></FastField>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-2 row">
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

                                  <FormGroup className="row">
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-star",
                                        alignItems: "center",
                                      }}
                                    >
                                      <label className="col-lg-3 h-label">
                                        Giới tính
                                      </label>
                                      <FormGroup
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                        }}
                                      >
                                        <FastField
                                          styles={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                          name="gender"
                                          id="true"
                                          defaultChecked={"true"}
                                          className="h-textbox"
                                          component={RadioField}
                                        />
                                        <label
                                          htmlFor="true"
                                          className="pt-2 h-label-checkbox"
                                        >
                                          Nam
                                        </label>
                                      </FormGroup>
                                      <FormGroup
                                        style={{
                                          //marginLeft: "2px",
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                        }}
                                      >
                                        <FastField
                                          styles={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                          id="false"
                                          name="gender"
                                          className="h-textbox"
                                          component={RadioField}
                                        />
                                        <label
                                          htmlFor="false"
                                          className="pt-2 h-label-checkbox"
                                        >
                                          Nữ
                                        </label>
                                      </FormGroup>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              {/**Start toolbar widget */}
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
                                      <button
                                        type="button"
                                        className="h-button"
                                        onClick={() => handleClickExportExcel()}
                                      >
                                        <RiFileExcel2Fill
                                          color="#2b6e44"
                                          size={15}
                                        />{" "}
                                        Xuất Excel
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => handleClickDelete(e)}
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
                  {/**end search */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TableGridControl
              onEditRow={() => {
                alert("OK");
              }}
              rowData={stateEmp.dataEmpList}
              tableHeight="450px"
              tableColoumn={tableColumnEmployee}
              gridRef={gridRef}
              onGridReady={onGridReady}
            >
              <AgGridColumn
                minWidth={50}
                field="empId"
                headerName=""
                cellRendererFramework={(field) => {
                  return (
                    <EditForm
                      onClickEdit={() => {
                        handleUpdateEmplyee(field.value);
                      }}
                    />
                  );
                }}
              ></AgGridColumn>
            </TableGridControl>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EmployeeManager;

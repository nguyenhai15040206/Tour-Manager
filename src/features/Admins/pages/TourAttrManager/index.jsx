import { FastField, Form, Formik } from "formik";
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
  Adm_DeleteTouristAttr,
  Adm_GetTouristAttr,
} from "./../../Slices/SliceTouristAttraction";
import TableGridControl from "../../components/Customs/TableGridControl";
import { tableColumnTouristAttr } from "./../../../../utils/Columns";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Adm_DeleteEmployee } from "./../../Slices/SliceEmployee";
import TouristAttrAddEdit from "./TouristAttrAddEdit";
import { NotificationManager } from "react-notifications";

function TourAttrManager() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  const stateProvince = useSelector((state) => state?.address);
  const stateTouristAtt = useSelector((state) => state?.touristAttraction);

  const handleClickShowModal = () => {
    setShowModal(true);
  };

  const toggle = () => {
    setShowModal(false);
  };

  const initialValues = {
    touristAttrId: "",
    touristAttrName: "",
    provinceId: "",
  };

  ///lấy danh sách tỉnh thành
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const value = {};
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
    await dispatch(Adm_GetTouristAttr(values));
    console.log(values);
  };
  //xóa
  const handleClickDelete = async (e) => {
    const value = {};
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.touristAttrId}`)
      .join(",");
    const Ids = selectedDataStringPresentation.split(",").map(Number);
    console.log(Ids[0]);
    if (Ids[0] === 0) {
      //await dispatch(Adm_GetTouristAttr(value));
      return NotificationManager.error("Error!", "Thêm thất bại!", 1500);
    }

    try {
      await dispatch(Adm_DeleteTouristAttr(Ids));
      await dispatch(Adm_GetTouristAttr(value));
      return NotificationManager.success("Success!", "Thêm thành công!", 1500);
    } catch {
      return NotificationManager.error("Error!", "Thêm thất bại!", 1500);
    }
  };

  return (
    <>
      <TouristAttrAddEdit
        className="modal-lg"
        backdrop={"static"}
        toggle={toggle}
        showModal={showModal}
      />
      <Container
        fluid
        className="animate__animated animated__slideInUp animate__delay-0.5s"
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
                                      Tên tỉnh thành
                                    </label>
                                    <div className="col-lg-8">
                                      <FastField
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
            ></TableGridControl>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TourAttrManager;

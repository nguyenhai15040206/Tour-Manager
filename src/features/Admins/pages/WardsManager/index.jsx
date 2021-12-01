import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
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
import { tableColumnWard } from "../../../../utils/Columns";
import { Adm_GetWardsByIdPro } from "../../Slices/SliceWards";
import SelectField from "./../../../../CustomFields/SelectField/Index";
import TableGridControl from "./../../components/Customs/TableGridControl";
import { Adm_GetProvince } from "./../../Slices/SliceAddress";
import { Adm_GetDistrictByProvinceCBB } from "./../../Slices/SliceDistrict";

const initialValues = {
  provinceId: null,
  districtId: null,
};
function WardsManager(props) {
  //state store
  const stateProvince = useSelector((state) => state.address);
  const stateDistrict = useSelector((state) => state.district);
  const stateWards = useSelector((state) => state.wards);

  ///
  ///
  const gridRef = useRef(null);
  const dispatch = useDispatch();

  //get data province
  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(Adm_GetProvince({}));
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [dispatch]);

  //get values Click province(e)
  const handleChangClickProvince = async (e) => {
    try {
      if (e === null || e === "") {
        return;
      }
      const params = {
        provinceID: e.value,
      };
      await dispatch(Adm_GetDistrictByProvinceCBB(params));
    } catch (error) {
      console.log(error);
    }
  };

  ///get values click district
  const handleOnSubmitForm = async (values) => {
    try {
      if (values.provinceId === "" || values.provinceId === null) {
        return NotificationManager.warning(
          "Vui lòng nhập tỉnh/thành",
          "Warning!",
          1500
        );
      }
      if (values.districtId === "" || values.districtId === null) {
        return NotificationManager.warning(
          "Vui lòng nhập quận/huyện",
          "Warning!",
          1500
        );
      }
      const params = {
        districtID: values.districtId,
      };
      await dispatch(Adm_GetWardsByIdPro(params));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container
        fluid
        className="animate__animated animate__slideInUp animate__delay-0.5s"
      >
        <Row>
          <Col>
            <div className="admin-widget">
              <Row>
                <Col lg={12}>
                  {/**begin */}
                  <Breadcrumb>
                    <BreadcrumbItem active>
                      <a href="admin/wards">Trang chủ</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="admin/wards">Địa lý - xã hội</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Phường/xã</BreadcrumbItem>
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
                      onSubmit={handleOnSubmitForm}
                    >
                      {(fromilk) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-1 row">
                                    <label className="col-lg-3 h-label h-lable-Obligatory">
                                      Tỉnh/ Thành
                                    </label>
                                    <div className="col-lg-8">
                                      <Field
                                        component={SelectField}
                                        name="provinceId"
                                        className="h-textbox"
                                        placeholder="Vui lòng chọn"
                                        isLoading={
                                          stateProvince?.loading === "loaded"
                                            ? false
                                            : true
                                        }
                                        options={stateProvince?.data}
                                        handleChange={(e) => {
                                          handleChangClickProvince(e);
                                        }}
                                      ></Field>
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label h-lable-Obligatory">
                                      Quận/ Huyện
                                    </label>
                                    <div className="col-lg-8">
                                      <Field
                                        component={SelectField}
                                        className="h-textbox"
                                        name="districtId"
                                        placeholder="Vui lòng chọn"
                                        isLoading={
                                          stateDistrict?.loading === "loaded"
                                            ? false
                                            : true
                                        }
                                        options={stateDistrict?.dataDistrictCbb}
                                      ></Field>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="commandToolBarWidge">
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
              rowData={stateWards.dataWards}
              gridRef={gridRef}
              tableHeight="361px"
              tableColoumn={tableColumnWard}
              fieldValues="wardsId"
            ></TableGridControl>
          </Col>
        </Row>
      </Container>
    </>
  );
}

WardsManager.propTypes = {};

export default WardsManager;

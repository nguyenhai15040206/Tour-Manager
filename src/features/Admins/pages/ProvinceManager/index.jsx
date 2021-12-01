import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { Field, Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Adm_GetProvinceAndSearch } from "../../Slices/SliceAddress";
import SelectField from "./../../../../CustomFields/SelectField/Index";
import { IoMdAddCircle } from "react-icons/io";
import TableGridControl from "../../components/Customs/TableGridControl";
import { FaSearch } from "react-icons/fa";
import { tableColumnProvince } from "../../../../utils/Columns";
import { Adm_GetProvince } from "./../../Slices/SliceAddress";

const initialValuesAddress = {
  provinceId: [],
};
function ProvinceManager(props) {
  //state component
  const [initialValues, setInitialValues] = useState(initialValuesAddress);
  //state store
  const stateProvince = useSelector((state) => state?.address);
  ///
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  //get danh sách tỉnh thành

  useEffect(() => {
    const fetchApi = async () => {
      //const values = { provinceId: [], divisionType: "" };
      try {
        await dispatch(Adm_GetProvinceAndSearch(initialValuesAddress));
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [dispatch]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(Adm_GetProvince({}));
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [dispatch]);

  //tìm kiếm
  const handleClickSearch = async (values) => {
    try {
      await dispatch(Adm_GetProvinceAndSearch(values));
    } catch (err) {
      console.log(err);
    }
  };

  //get change value

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
                      <a href="/admin/address">Trang chủ</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/admin/address">Địa lý - xã hội</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Tỉnh thành</BreadcrumbItem>
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
                      onSubmit={handleClickSearch}
                    >
                      {(formilk) => {
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-1 row">
                                    <label className="col-lg-3 h-label">
                                      Tên tỉnh thành
                                    </label>
                                    <div className="col-lg-8">
                                      <Field
                                        isMulti={true}
                                        className="h-textbox"
                                        isLoading={
                                          stateProvince?.loading === "loaded"
                                            ? false
                                            : true
                                        }
                                        //handleChange={handleChangeClick}
                                        placeholder="Vui lòng chọn"
                                        name="provinceId"
                                        // ben BE tra ve dung roi em khoi can map lai em
                                        options={stateProvince?.data}
                                        component={SelectField}
                                      ></Field>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="commandToolBarWidge">
                                    <button type="submit" className="h-button">
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
          <TableGridControl
            rowData={stateProvince.dataSearch}
            tableColoumn={tableColumnProvince}
            gridRef={gridRef}
            tableHeight="395px"
            ///
            fieldValues="districtId"
          ></TableGridControl>
        </Row>
      </Container>
    </>
  );
}

ProvinceManager.propTypes = {};

export default ProvinceManager;

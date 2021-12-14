import React, { useEffect, useRef } from "react";
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
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import SelectField from "./../../../../CustomFields/SelectField/Index";
import TableGridControl from "../../components/Customs/TableGridControl";
import { FaSearch } from "react-icons/fa";
import { tableColumnDistrict } from "../../../../utils/Columns";
import { Adm_GetDisTrictByIdPro } from "./../../Slices/SliceDistrict";
import { NotificationManager } from "react-notifications";

const initialValues = {
  provinceId: [],
};

function DistrictManager(props) {
  //state store
  const stateProvince = useSelector((state) => state?.address);
  const stateDistrict = useSelector((state) => state?.district);
  ///
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  //get danh sách tỉnh thành
  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(Adm_GetProvince());
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [dispatch]);

  //tìm kiếm
  const handleClickSearch = async (values) => {
    try {
      const Ids = values.provinceId;
      if (Ids.length === 0) {
        return NotificationManager.warning(
          "Vui lòng chọn tỉnh/thành!",
          "Warning!",
          1500
        );
      }
      await dispatch(Adm_GetDisTrictByIdPro(Ids));
    } catch (err) {
      console.log(err);
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
                      <a href="/admin/address">Trang chủ</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <a href="/admin/address">Địa lý - xã hội</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Quận/huyện</BreadcrumbItem>
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
                                    <label className="col-lg-3 h-label h-lable-Obligatory">
                                      Tên tỉnh thành
                                    </label>
                                    <div className="col-lg-8">
                                      <Field
                                        className="h-textbox"
                                        isMulti={true}
                                        isLoading={
                                          stateProvince?.loading === "loaded"
                                            ? false
                                            : true
                                        }
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
          <TableGridControl
            rowData={stateDistrict.dataDistrict}
            tableColoumn={tableColumnDistrict}
            gridRef={gridRef}
            tableHeight="390px"
            ///
            fieldValues="districtId"
          ></TableGridControl>
        </Row>
      </Container>
    </>
  );
}

DistrictManager.propTypes = {};

export default DistrictManager;

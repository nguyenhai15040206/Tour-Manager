import { unwrapResult } from "@reduxjs/toolkit";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FastField, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
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
import * as yup from "yup";
import imageDefaultPNG from "../../../../assets/logo/imageDefault.png";
import InputField from "../../../../CustomFields/InputField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import { tableColumnsTour } from "../../../../utils/Columns";
import ConfirmControl from "../../components/Customs/ConfirmControl";
import TableGridControl from "../../components/Customs/TableGridControl";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import { Adm_UploadImageTour } from "../../Slices/SliceImagesUpload";
import {
  Adm_DeleteTourByIds,
  Adm_GetTourById,
  Adm_GetTourList,
  Adm_InsertTour,
} from "../../Slices/SliceTour";
import {
  Adm_DeleteTourDetailsByTourIds,
  Adm_InsertTourDetails,
} from "../../Slices/SliceTourDetails";
import { Adm_GetTouristAttByRegions } from "../../Slices/SliceTouristAttraction";
import { Adm_GetTravelTypeCbo } from "../../Slices/SliceTravelType";
import {
  Adm_DeleteUnitPriceByTourIds,
  Adm_InsertUnitPrice,
} from "../../Slices/SliceUnitPrice";
import TourAddEdit from "./TourAddEdit";

const initialValuesSearch = {
  TourName: "",
  DateStart: "",
  DateEnd: "",
  Suggest: false,
  TravelTypeID: null,
  DeparturePlace: [],
};

const initialValuesInsert = {
  TourImg: "",
  TourID: "",
  TourName: "",
  Description: "",
  DateStart: "",
  DateEnd: "",
  Transport: "",
  BabyUnitPrice: "", // đơn giá trẻ em
  AdultUnitPrice: "", // đơn giá người lớn
  ChildrenUnitPrice: "", // đơn giá trẻ nhỏ
  Schedule: "", // Lịch trình
  QuanityMax: 10,
  QuanityMin: "",
  CurrentQuanity: 0,
  Regions: "",
  DeparturePlace: "",
  TouristAttaction: [],
};
function TourManager(props) {
  // state in components
  const [rating, setRating] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);
  const [imageUpload, setImageUpload] = useState(null);
  const [selectedTourByIds, setSelectedTourByIds] = useState([]);
  //end
  //state in redux
  const { tourList } = useSelector((state) => state?.tour);
  const stateAddress = useSelector((state) => state.address);
  const stateTourisAtt = useSelector((state) => state.touristAttraction);
  const stateTravelType = useSelector((state) => state?.travelType);
  //end
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  //
  useEffect(() => {
    const fetchApiDepacturePlace = async () => {
      try {
        await dispatch(Adm_GetProvince());
        await dispatch(Adm_GetTravelTypeCbo());
      } catch (err) {
        console.log(err);
      }
    };
    fetchApiDepacturePlace();
  }, [dispatch]);
  const onButtonClick = (e) => {
    e.preventDefault();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.tourId}`)
      .join(", ");
    if (selectedDataStringPresentation === "") {
      return NotificationManager.warning("Chọn dòng để xóa!", "", 1500);
    }
    const Ids = selectedDataStringPresentation.split(",").map(String);
    setSelectedTourByIds(Ids);
    setShowConfirm(true);
  };

  const onGridReady = async () => {
    try {
      await dispatch(Adm_GetTourList(initialValuesSearch));
    } catch (err) {
      console.log(err);
    }
  };

  // validation
  const validationShema = yup.object().shape({
    DateStart: yup.date().min(new Date(), "[Ngày bắt đầu] không hợp lệ!"),
    DateEnd: yup
      .date()
      .when(
        "DateStart",
        (eventDateStart, schema) =>
          eventDateStart &&
          schema.min(eventDateStart, "[Ngày kết thúc] không hợp lệ!")
      ),
  });
  // ======================== Xử lý sự kiện
  //search
  const handleClickSearchTour = async (values) => {
    try {
      console.log(values);
      await dispatch(Adm_GetTourList(values));
    } catch (err) {
      console.log(err);
    }
  };
  // handeCLick change rating
  const handleClickChangeRating = (rating) => {
    console.log(rating);
    setRating(rating);
  };

  // onSubmitForm
  //Nguyễn Tấn Hải - bắt sự kiện submit form
  //Thêm mới dữ liệu TOur => call APi khi submit on success!
  const onInsertTour = (tour, values) => {
    let formData = new FormData();
    formData.append("file", imageUpload);
    dispatch(Adm_UploadImageTour(formData))
      .then(unwrapResult)
      .then((payload) => {
        console.log({ ...tour, tourImg: payload.fileName });
        dispatch(Adm_InsertTour({ ...tour, tourImg: payload.fileName }))
          .then(unwrapResult)
          .then((payload) => {
            const tourIDPayload = payload.tourId;
            if (tourIDPayload === undefined) {
              return NotificationManager.error(`Lỗi`, "Thêm thất bại!", 1500);
            }
            // insert tour => insert tourDetails => insert dong gia
            console.log(tourIDPayload);
            const unitPrice = {
              tourId: tourIDPayload,
              adultUnitPrice: values.AdultUnitPrice,
              childrentUnitPrice: 0,
              babyUnitPrice: values.BabyUnitPrice,
              empIDInsert: "3f94669c-23fe-4e3a-88cf-00456ace4e4f",
              empIdUpdate: "3f94669c-23fe-4e3a-88cf-00456ace4e4f",
            };
            dispatch(Adm_InsertUnitPrice(unitPrice))
              .then(unwrapResult)
              .then(async () => {
                let arrTouristAttr = values.TouristAttaction;
                if (Array.isArray(arrTouristAttr)) {
                  try {
                    arrTouristAttr.map(async (item) => {
                      const tourDetails = {
                        tourID: tourIDPayload,
                        touristAttrID: item,
                        empIDInsert: "3f94669c-23fe-4e3a-88cf-00456ace4e4f",
                        empIDUpdate: "3f94669c-23fe-4e3a-88cf-00456ace4e4f",
                      };
                      return await dispatch(Adm_InsertTourDetails(tourDetails));
                    });
                    await dispatch(Adm_GetTourList(initialValuesSearch));
                    return NotificationManager.success(
                      `Thêm thành công!`,
                      "Success!",
                      1500
                    );
                  } catch (err) {
                    return NotificationManager.success(
                      `${err}`,
                      "Error!",
                      1500
                    );
                  }
                }
              })
              .catch((err) => {
                return NotificationManager.error(
                  `${err}`,
                  "Thêm thất bại!",
                  1500
                );
              });
          })
          .catch((err) => {
            if ((err.status = 401)) {
              console.log(err.status);
              //history.push("/admin");
              //console.log("Vui lòng đăng nhập lại");
            }
            return NotificationManager.error(`${err}`, "Thêm thất bại!", 1500);
          });
      })
      .catch((err) => {
        return NotificationManager.error(`${err}`, "Thêm thất bại!", 1500);
      });
  };
  const handleClickOnSumitForm = async (values) => {
    //thực hiện call dữ liệu
    console.log(values);
    const tour = {
      tourName: values.TourName,
      description: values.Description,
      dateStart: values.DateStart,
      dateEnd: values.DateEnd,
      transport: values.Transport,
      quaniTyMax: values.QuanityMax,
      quanityMin: values.QuanityMin,
      currentQuanity: values.CurrentQuanity === "" ? 0 : values.CurrentQuanity,
      Schedule: values.Schedule,
      rating: rating,
      travelTypeID: "972c5fc0-a815-41a2-8de1-1fe5301fb76c", //
      DeparturePlace: values.DeparturePlace,
      tourGuideID: null, //
      empIDUpdate: "3f94669c-23fe-4e3a-88cf-00456ace4e4f", //
      suggest: true, //
      empIDInsert: "3f94669c-23fe-4e3a-88cf-00456ace4e4f", //
      status: null, //
    };
    if (values.TourID !== "") {
      // edit here
      alert("Edit đê");
      return;
    } else {
      onInsertTour(tour, values);
    }
  };
  // showModel Add Edit form
  const handleClickShowModal = async () => {
    try {
      setInitialValues(initialValuesInsert);
      await dispatch(Adm_GetProvince({}));
      setImageDefault(`${imageDefaultPNG}`);
      setShowModal(true);
    } catch (err) {
      return NotificationManager.error(`${err}`, "Error", 1500);
    }
  };

  // closed toggle
  const toggle = () => {
    setShowModal(false);
    setShowConfirm(false);
  };

  // handle click change regions => get tourRistAttr
  const handleChangeRegions = async (e) => {
    try {
      if (e === null || e === "") {
        return;
      }
      const params = {
        regions: e.value,
      };
      await dispatch(Adm_GetTouristAttByRegions(params));
    } catch (err) {
      console.log(err);
    }
  };

  // handleClick Edit tour by Id => get tourDetails
  const handleEditTour = async (tourId) => {
    try {
      console.log(tourId);
      const params = {
        tourId: tourId,
      };

      dispatch(Adm_GetTourById(params))
        .then(unwrapResult)
        .then((payload) => {
          console.log(payload);
          setInitialValues({
            TourID: payload.tourId,
            TourName: payload.tourName,
            Description: payload.description,
            DeparturePlace: payload.departurePlace,
            QuanityMax: payload.quanityMax,
            QuanityMin: payload.quanityMin,
            CurrentQuanity: payload.currentQuanity,
            Regions: 1,
            Transport: payload.transport.trim(),
            DateStart: payload.dateStart.slice(0, 10),
            DateEnd: payload.dateEnd.slice(0, 10),
            TouristAttaction: [1, 2, 3],
          });
          setRating(payload.rating);
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch(Adm_GetProvince())
        .then(unwrapResult)
        .then((payload) => {
          const params = {
            regions: 1,
          };
          dispatch(Adm_GetTouristAttByRegions(params))
            .then(unwrapResult)
            .then((payload) => {
              setShowModal(true);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };
  // handle Change Image
  const handleChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };

  // handel click Delete MultiRow
  const confirmDeleteMultiRow = () => {
    let DeleteModels = {
      SelectByIds: selectedTourByIds,
      EmpId: "29da46c9-df68-4eb3-9b6a-f80a77cf2a98",
    };
    console.log(DeleteModels);
    dispatch(Adm_DeleteTourByIds(DeleteModels))
      .then(unwrapResult)
      .then(() => {
        dispatch(Adm_DeleteUnitPriceByTourIds(DeleteModels))
          .then(unwrapResult)
          .then(() => {
            dispatch(Adm_DeleteTourDetailsByTourIds(DeleteModels))
              .then(unwrapResult)
              .then(async () => {
                await dispatch(Adm_GetTourList({}));
                setShowConfirm(false);
                return NotificationManager.success(
                  `Xóa thành công!`,
                  "Success!",
                  1500
                );
              })
              .catch((err) => {
                return NotificationManager.error(`${err}!`, "Error!", 1500);
              });
          })
          .catch((err) => {
            return NotificationManager.error(`${err}!`, "Error!", 1500);
          });
      })
      .catch((err) => {
        return NotificationManager.error(`${err}!`, "Error!", 1500);
      });
  };
  //-==========================
  return (
    <>
      <ConfirmControl
        count={selectedTourByIds.length}
        ConfirmDelete={confirmDeleteMultiRow}
        showModal={showConfirm}
        toggle={toggle}
      />
      <TourAddEdit
        className="modal-xl"
        backdrop={"static"}
        toggle={toggle}
        rating={rating}
        onSubmitForm={(values) => {
          handleClickOnSumitForm(values);
        }}
        onChangeRating={(rating) => {
          handleClickChangeRating(rating);
        }}
        onChangeImage={handleChangeImage}
        touristAttrByRegions={stateTourisAtt.touristAttrByRegions}
        onGetTOuristByRegions={handleChangeRegions}
        imageDefault={`${imageDefault}`}
        initialValues={initialValues}
        showModal={showModal}
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
                      initialValues={initialValuesSearch}
                      onSubmit={handleClickSearchTour}
                      validationSchema={validationShema}
                    >
                      {(formikProps) => {
                        // console.log(formikProps.values);
                        return (
                          <>
                            <Form className="mt-1">
                              <Row className="pb-2">
                                <Col xl={4} lg={6}>
                                  <FormGroup className="mt-1 row">
                                    <label className="col-lg-3 h-label">
                                      Loại hình tour
                                    </label>
                                    <div
                                      className="col-lg-8"
                                      style={{ marginRight: "4px" }}
                                    >
                                      <Field
                                        name="TravelTypeID"
                                        isLoading={
                                          stateTravelType?.loading === "loading"
                                            ? true
                                            : false
                                        }
                                        placeholder="Vui lòng chọn"
                                        options={stateTravelType?.dataCbo}
                                        component={SelectField}
                                      />
                                    </div>
                                  </FormGroup>
                                  <FormGroup className="row">
                                    <label className="col-lg-3 h-label">
                                      Điểm xuất phát
                                    </label>
                                    <div className="col-lg-8">
                                      <Field
                                        name="DeparturePlace"
                                        isMulti={true}
                                        isLoading={
                                          stateAddress?.loading === "loading"
                                            ? true
                                            : false
                                        }
                                        placeholder="Vui lòng chọn"
                                        options={stateAddress.data}
                                        component={SelectField}
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
                                <Col xl={4} lg={6}>
                                  <FormGroup className="row mt-1">
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
                                  <FormGroup className="row mt-1">
                                    <label className="col-lg-3 h-label"></label>
                                    <div
                                      className="col-lg-8"
                                      style={{
                                        display: "flex",
                                        WebkitJustifyContent: "flex-start",
                                      }}
                                    >
                                      <FastField
                                        className="h-checkbox"
                                        name="Suggest"
                                        component={InputField}
                                        type="checkbox"
                                      />
                                      <label className="h-label-checkbox">
                                        Mytour đề xuất
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
                                        onClick={onButtonClick}
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
              fieldValues="tourId"
              onEditForm={handleEditTour}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

TourManager.propTypes = {};

export default TourManager;

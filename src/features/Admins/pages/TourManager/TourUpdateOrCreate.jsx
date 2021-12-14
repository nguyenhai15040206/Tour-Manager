import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { FastField, Field, Form, Formik } from "formik";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  Col,
  FormGroup,
  Row,
  Spinner,
} from "reactstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ReactRating from "react-rating";
import InputField from "../../../../CustomFields/InputField/Index";
import { IoMdSave } from "react-icons/io";
import TextAreaField from "../../../../CustomFields/TextareaField/Index";
import SelectField from "../../../../CustomFields/SelectField/Index";
import EditorField from "../../../../CustomFields/EditorField/Index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import validationSchema from "../../../../utils/ValidateShema";
import { useDispatch } from "react-redux";
import { Adm_GetProvince } from "../../Slices/SliceAddress";
import Options from "../../../../utils/Options";
import { Adm_GetTouristAttByRegions } from "../../Slices/SliceTouristAttraction";
import imageDefaultPNG from "../../../../assets/logo/imageDefault.png";
import { useHistory } from "react-router-dom";
import { Adm_UploadImageTour } from "../../Slices/SliceImagesUpload";
import { Adm_InsertTour, Adm_GetTourById } from "../../Slices/SliceTour";
import { NotificationManager } from "react-notifications";
import { Adm_InsertTourDetails } from "../../Slices/SliceTourDetails";
import { Adm_GetTravelTypeCbo } from "../../Slices/SliceTravelType";
import { Adm_GetEnumConstantCbo } from "../../Slices/SliceEnumConstant";
import { Adm_GetCompanyByTravelTypeCbo } from "../../Slices/SliceTravelConpanyTransport";
//
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
};

let initialValuesInsert = {
  // thông tin cơ bản
  TourID: "",
  TourName: "",
  Description: "",
  TravelTypeID: "",
  TourImg: "",
  DeparturePlaceFrom: "",
  DeparturePlaceTo: "",
  DateStart: "",
  DateEnd: "",
  BabyUnitPrice: "", // đơn giá trẻ em
  AdultUnitPrice: "", // đơn giá người lớn
  ChildrenUnitPrice: "", // đơn giá trẻ nhỏ
  Surcharge: 0, // phụ thu nếu có
  QuanityMax: 10,
  QuanityMin: "",
  CurrentQuanity: 0,
  Suggest: false,

  // thông tin vận chuyển và lịch trình tour
  Regions: "",
  TouristAttaction: [],
  Schedule: "", // Lịch trình
  TransportType: "",
  Hang: "",
};

function TourUpdateOrCreate(props) {
  // state in components
  const [rating, setRating] = useState(3);
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);
  const [imageUpload, setImageUpload] = useState(null);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  //end
  // Begin get state in store

  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateTourisAtt = useSelector((state) => state.touristAttraction);
  const stateTravelType = useSelector((state) => state?.travelType);
  const stateAddress = useSelector((state) => state.address);
  const stateTravelCompany = useSelector(
    (state) => state.travelConpanyTransport
  );
  //end
  //
  const dispatch = useDispatch();
  const history = useHistory();
  const { tourId } = useParams();
  const isAddMode = !tourId;
  let submitAction = undefined;

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(Adm_GetProvince({}));
        await dispatch(Adm_GetTravelTypeCbo());
        const params = {
          enumTypeName: "TransportType",
        };
        await dispatch(Adm_GetEnumConstantCbo(params));
        if (!isAddMode) {
          const params = {
            tourId: tourId,
          };
          await dispatch(Adm_GetTourById(params))
            .then(unwrapResult)
            .then((payload) => {
              setImageDefault(`${payload.tourImg}`);
              setRating(payload.rating);

              setInitialValues({
                TourID: payload.tourId,
                TourName: payload.tourName,
                TourImg: "",
                Description: payload.description,
                DeparturePlace: payload.departurePlace,
                QuanityMax: payload.quanityMax,
                QuanityMin: payload.quanityMin,
                CurrentQuanity: payload.currentQuanity,
                AdultUnitPrice:
                  payload.adultUnitPrice == null ? 0 : payload.adultUnitPrice,
                ChildrenUnitPrice:
                  payload.childrenUnitPrice == null
                    ? 0
                    : payload.childrenUnitPrice,
                BabyUnitPrice:
                  payload.babyUnitPrice == null ? 0 : payload.babyUnitPrice,
                Regions: payload.regions,
                DateStart: payload.dateStart.slice(0, 10),
                DateEnd: payload.dateEnd.slice(0, 10),
                TouristAttaction:
                  payload.tourDetails == null ? [] : payload.tourDetails,
                Schedule: payload.schedule,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (err) {
        return NotificationManager.error(`${err}`, "Error!", 1500);
      }
    };
    fetchApi();
  }, [dispatch, tourId, isAddMode]);

  ////////////////
  isAddMode
    ? (document.title = "Thêm tour du lịch")
    : (document.title = "Cập nhật tour du lịch");

  const titleUpdateOrCreated = isAddMode
    ? "Tạo mới tour du lịch"
    : "Cập nhật tour du lịch";

  const validationShema = isAddMode
    ? validationSchema.TourManagerAdd
    : validationSchema.TourManagerEdit;
  /////////////

  ////////////////////// Xử lý sự kiện

  // handle click change rating tour
  const handleClickChangeRating = (rating) => {
    console.log(rating);
    setRating(rating);
  };

  // handle Change Image
  const handleChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };

  // handle click change regions => get tourRistAttr
  const handleChangeRegions = async (e) => {
    try {
      if (e === null || e === "") {
        const params = {
          regions: ":(",
        };
        await dispatch(Adm_GetTouristAttByRegions(params));
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

  // handle change travel type => load company travel by traveltype
  const handleClickChangeTravelType = async (e) => {
    try {
      if (e === null) {
        const params = {
          enumType: ":(",
        };
        await dispatch(Adm_GetCompanyByTravelTypeCbo(params));
      }
      const params = {
        enumType: e.value,
      };
      await dispatch(Adm_GetCompanyByTravelTypeCbo(params));
    } catch (err) {
      // return NotificationManager.error(
      //   `${err.error}`,
      //   "Vui lòng kiểm tra lại!!!",
      //   1500
      // );
    }
  };

  // onSubmitForm
  //Nguyễn Tấn Hải - bắt sự kiện submit form
  //Thêm mới dữ liệu TOur => call APi khi submit on success!
  const onInsertTour = (tour, values) => {
    if (values.DeparturePlaceFrom === values.DeparturePlaceTo) {
      return NotificationManager.warning(
        "[Điểm đến] trùng [Điểm x/phát]",
        "Warning!",
        1500
      );
    }
    let formData = new FormData();
    formData.append("file", imageUpload);
    dispatch(Adm_UploadImageTour(formData))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(Adm_InsertTour({ ...tour, tourImg: payload.fileName }))
          .then(unwrapResult)
          .then((tour) => {
            console.log(tour);
            const tourIDPayload = tour.tourId;
            if (tourIDPayload === undefined) {
              return NotificationManager.error(`Lỗi`, "Thêm thất bại!", 1500);
            }
            let arrTouristAttr = values.TouristAttaction;
            if (Array.isArray(arrTouristAttr)) {
              arrTouristAttr.map(async (item) => {
                try {
                  const tourDetails = {
                    tourID: tourIDPayload,
                    touristAttrID: item,
                    empIDInsert: JSON.parse(
                      localStorage.getItem("accessTokenEmp")
                    ).data.empId,
                    empIDUpdate: JSON.parse(
                      localStorage.getItem("accessTokenEmp")
                    ).data.empId,
                  };
                  return await dispatch(Adm_InsertTourDetails(tourDetails));
                } catch (err) {
                  return NotificationManager.error(
                    `${err.error}`,
                    "Error!",
                    1500
                  );
                }
              });
              return NotificationManager.success(
                `Thêm thành công!`,
                "Success!",
                1500
              );
            }
          })
          .catch((err) => {
            if (err.status === 401) {
              localStorage.removeItem("accessTokenEmp");
              return history.push("/admin/login");
            }
            return NotificationManager.error(
              `${err.error}`,
              "Thêm thất bại!",
              1500
            );
          });
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(
          `${err.error}`,
          "Thêm thất bại!",
          1500
        );
      });
  };

  // cập nhật
  const onEdtiTour = async (tour, values) => {
    let tourImageEdit = "";
    try {
      if (values.TourImg !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        tourImageEdit = unwrapResult(
          await dispatch(Adm_UploadImageTour(formData))
        ).fileName;
      }
    } catch (err) {
      return NotificationManager.error(
        `${err.message}`,
        "Thêm thất bại!",
        1500
      );
    }
  };
  // handle SubmitForm
  const handelClickOnSubmitForm = async (values, type) => {
    console.log(values);
    //thực hiện call dữ liệu
    const tour = {
      // thông tin cơ bản
      tourName: values.TourName,
      description: values.Description,
      travelTypeID: values.TravelTypeID,
      departurePlaceFrom: values.DeparturePlaceFrom,
      departurePlaceTo: values.DeparturePlaceTo,
      dateStart: values.DateStart,
      dateEnd: values.DateEnd,
      rating: rating,
      adultUnitPrice: values.AdultUnitPrice,
      childrenUnitPrice: values.ChildrenUnitPrice,
      babyUnitPrice: values.BabyUnitPrice,
      surcharge: values.Surcharge,
      quaniTyMax: values.QuanityMax,
      quanityMin: values.QuanityMin,
      suggest: values.Suggest,

      // thông tin về vận chuyển lịch trình
      Schedule: values.Schedule,
      // DepartureTransportID: values.DepartureTransportID,
      // SightseeingTransportID: values.SightseeingTransportID,

      // tourGuideID: values.TourGuideID,

      // noteByTour: values.NoteByTour,
      // conditionByTour: values.ConditionByTour,
      // noteByMyTour: values.NoteByMyTour,
      EmpIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      EmpIdupdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };

    if (values.TourID !== "") {
      // edti here
      //onEdtiTour(tour, values);
    } else {
      onInsertTour(tour, values);
    }

    if ((type = "reset")) {
      setInitialValues(initialValuesInsert);
    }
  };
  return (
    <div className="animate__animated animate__slideInUp animate__delay-0.5s">
      <Card>
        <p>{initialValues.TourID}</p>
        <CardHeader
          style={{
            color: "#43A1FC",
            fontSize: "16px",
            fontWeight: "600",
            padding: "5px 10px",
            backgroundColor: "#F8F8F8",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            textTransform: "none",
          }}
        >
          {titleUpdateOrCreated}
        </CardHeader>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationShema}
          onSubmit={async (values, { resetForm }) => {
            if (submitAction === "Save") {
              handelClickOnSubmitForm(values, "");
              return;
            }
            if (submitAction === "SaveAndCreated") {
              await handelClickOnSubmitForm(values, "reset");
              resetForm();
              return;
            }
            if (submitAction === "SaveAndClosed") {
              handelClickOnSubmitForm(values, "");
              history.push("/admin/TourManager");
              return;
            }
            submitAction = undefined;
          }}
        >
          {(formikProps) => {
            return (
              <>
                <Form>
                  <CardHeader
                    style={{
                      justifyContent: "start",
                      padding: "2px 0rem 3px 10px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <button
                      className="h-button"
                      type="button"
                      onClick={() => {
                        submitAction = "Save";
                        formikProps.submitForm();
                      }}
                    >
                      <IoMdSave size={20} color="#3664a4" />
                      Lưu
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        submitAction = "SaveAndCreated";
                        formikProps.submitForm();
                      }}
                      className="h-button"
                      style={{ marginLeft: "4px" }}
                    >
                      <IoMdSave size={20} color="#3664a4" />
                      Lưu và tạo mới
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        submitAction = "SaveAndClosed";
                        //alert("OK");
                        formikProps.submitForm();
                      }}
                      className="h-button"
                      style={{ marginLeft: "4px" }}
                    >
                      <IoMdSave size={20} color="#3664a4" />
                      Lưu và đóng
                    </button>
                  </CardHeader>
                  <CardBody>
                    <p
                      style={{
                        width: "100%",
                        padding: "0 0 5px 10px",
                        lineHeight: "inherit",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#438eb9",
                        borderBottom: "1px solid #dfeaf6",
                      }}
                    >
                      Thông tin cơ bản
                    </p>
                    <Row className="mt-2">
                      <FormGroup style={styles}>
                        <div style={{ width: "153px" }}></div>
                        <div style={{ width: "calc(100% - 153px)" }}>
                          <ReactRating
                            onChange={(rating) => {
                              handleClickChangeRating(rating);
                            }}
                            initialRating={rating}
                            emptySymbol={<AiOutlineStar size={20} />}
                            fullSymbol={<AiFillStar color="orange" size={20} />}
                          />
                        </div>
                      </FormGroup>
                    </Row>
                    <Row>
                      <Col xl={8} lg={12}>
                        <Row>
                          <FormGroup style={styles}>
                            <div style={{ width: "153px" }}>
                              <label className="h-label">Mã tour</label>
                            </div>
                            <div style={{ width: "calc(100% - 153px)" }}>
                              <FastField
                                disabled={true}
                                className="h-textbox"
                                name="TourID"
                                type="text"
                                component={InputField}
                              />
                            </div>
                          </FormGroup>
                          <FormGroup style={styles}>
                            <div style={{ width: "153px" }}>
                              <label className="h-label h-lable-Obligatory">
                                Tên tour
                              </label>
                            </div>
                            <div style={{ width: "calc(100% - 153px)" }}>
                              <FastField
                                className="h-textbox"
                                name="TourName"
                                component={InputField}
                              />
                            </div>
                          </FormGroup>

                          <FormGroup style={styles}>
                            <div style={{ width: "153px" }}>
                              <label className="h-label h-lable-Obligatory">
                                Mô tả tour
                              </label>
                            </div>
                            <div style={{ width: "calc(100% - 153px)" }}>
                              <FastField
                                // marginLeft="3px"
                                name="Description"
                                className="h-textbox"
                                component={TextAreaField}
                              />
                            </div>
                          </FormGroup>
                          <FormGroup style={styles}>
                            <div style={{ width: "153px" }}>
                              <label className="h-label h-lable-Obligatory">
                                Loại hình du lịch
                              </label>
                            </div>
                            <div
                              style={{
                                width: "calc(100% - 153px)",
                              }}
                            >
                              <Field
                                className="h-textbox"
                                isLoading={
                                  stateTravelType?.loading === "loaded"
                                    ? false
                                    : true
                                }
                                placeholder="Chọn loại hình du lịch"
                                name="TravelTypeID"
                                options={stateTravelType.dataCbo}
                                component={SelectField}
                              />
                            </div>
                          </FormGroup>
                        </Row>
                        <Row>
                          <Col xl={12} lg={12}>
                            <Row>
                              <Col xl={6} lg={12}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Điểm khởi hành
                                    </label>
                                  </div>
                                  <div
                                    style={{
                                      width: "calc(100% - 153px)",
                                    }}
                                  >
                                    <Field
                                      className="h-textbox"
                                      isLoading={
                                        stateAddress?.loading === "loaded"
                                          ? false
                                          : true
                                      }
                                      placeholder="Chọn tỉnh/thành phố"
                                      name="DeparturePlaceFrom"
                                      options={stateAddress.data}
                                      component={SelectField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col xl={6} lg={12}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Điểm đến
                                    </label>
                                  </div>
                                  <div
                                    style={{
                                      width: "calc(100% - 153px)",
                                    }}
                                  >
                                    <Field
                                      className="h-textbox"
                                      isLoading={
                                        stateAddress?.loading === "loaded"
                                          ? false
                                          : true
                                      }
                                      placeholder="Chọn tỉnh/thành phố"
                                      name="DeparturePlaceTo"
                                      options={stateAddress.data}
                                      component={SelectField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12} xl={6}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Ngày bắt đầu
                                    </label>
                                  </div>
                                  <div style={{ width: "calc(100% - 153px)" }}>
                                    <FastField
                                      type="date"
                                      name="DateStart"
                                      className="h-textbox"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col lg={12} xl={6}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Ngày kết thúc
                                    </label>
                                  </div>
                                  <div style={{ width: "calc(100% - 153px)" }}>
                                    <FastField
                                      type="date"
                                      name="DateEnd"
                                      className="h-textbox"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl={6} lg={12}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Đơn giá người lớn
                                    </label>
                                  </div>
                                  <div style={{ width: "calc(100% - 153px)" }}>
                                    <FastField
                                      type="text"
                                      name="AdultUnitPrice"
                                      className="h-textbox"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col xl={6} lg={12}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Đơn giá trẻ em
                                    </label>
                                  </div>
                                  <div style={{ width: "calc(100% - 153px)" }}>
                                    <FastField
                                      type="text"
                                      name="ChildrenUnitPrice"
                                      className="h-textbox"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl={6} lg={12} style={{ display: "block" }}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Đơn giá trẻ nhỏ
                                    </label>
                                  </div>
                                  <div style={{ width: "calc(100% - 153px)" }}>
                                    <FastField
                                      type="text"
                                      name="BabyUnitPrice"
                                      className="h-textbox"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col xl={6} lg={12} style={{ display: "block" }}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label">
                                      Phụ phí(nếu có)
                                    </label>
                                  </div>
                                  <div style={{ width: "calc(100% - 153px)" }}>
                                    <FastField
                                      type="text"
                                      name="Surcharge"
                                      className="h-textbox"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl={6} lg={12}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Số lượng tối đa
                                    </label>
                                  </div>
                                  <div style={{ width: "calc(100% - 153px)" }}>
                                    <FastField
                                      type="number"
                                      name="QuanityMax"
                                      className="h-textbox"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col xl={6} lg={12}>
                                <FormGroup style={styles}>
                                  <div style={{ width: "153px" }}>
                                    <label className="h-label h-lable-Obligatory">
                                      Số lượng tối thiểu
                                    </label>
                                  </div>
                                  <div style={{ width: "calc(100% - 153px)" }}>
                                    <FastField
                                      type="number"
                                      name="QuanityMin"
                                      className="h-textbox"
                                      component={InputField}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            {!isAddMode && (
                              <FormGroup style={styles}>
                                <div style={{ width: "153px" }}>
                                  <label className="h-label">
                                    Số lượng hiện tại
                                  </label>
                                </div>
                                <div style={{ width: "calc(100% - 153px)" }}>
                                  <FastField
                                    disabled={true}
                                    type="number"
                                    name="CurrentQuanity"
                                    className="h-textbox"
                                    component={InputField}
                                  />
                                </div>
                              </FormGroup>
                            )}
                            <FormGroup style={styles}>
                              <div style={{ width: "153px" }}></div>
                              <div
                                style={{
                                  width: "calc(100% - 153px)",
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "stretch",
                                }}
                              >
                                <FastField
                                  className="h-checkbox"
                                  name="Suggest"
                                  component={InputField}
                                  type="checkbox"
                                />
                                <label className="h-label-checkbox">
                                  Tour được Mytour đề xuất?
                                </label>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col xl={4} lg={12}>
                        <div>
                          <Card
                            style={{ height: "284.5px", marginTop: "2px" }}
                            inverse
                          >
                            <CardImg
                              style={{
                                height: "100%",
                                objectFit: "cover",
                              }}
                              alt="Image Tour"
                              src={`${imageDefault}`}
                            />
                          </Card>
                          <FormGroup>
                            <div>
                              <FastField
                                type="file"
                                // multiple="multiple"
                                handleChange={handleChangeImage}
                                accept="image/*"
                                name="TourImg"
                                className="h-textbox form-control"
                                component={InputField}
                              />
                            </div>
                          </FormGroup>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <p
                          style={{
                            width: "100%",
                            padding: "0 0 5px 10px",
                            lineHeight: "inherit",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#438eb9",
                            borderBottom: "1px solid #dfeaf6",
                          }}
                        >
                          Thông tin vận chuyển - Hướng dẫn đoàn - Giá cả - Lịch
                          trình cho tour
                        </p>
                        <Row className="mt-2">
                          <Col xl={4} lg={6}>
                            <FormGroup style={styles}>
                              <div style={{ width: "153px" }}>
                                <label className="h-label h-lable-Obligatory">
                                  Loại phương tiện
                                </label>
                              </div>
                              <div style={{ width: "calc(100% - 153px)" }}>
                                <Field
                                  className="h-textbox"
                                  isLoading={
                                    stateEnumConstant?.loading === "loaded"
                                      ? false
                                      : true
                                  }
                                  handleChange={handleClickChangeTravelType}
                                  placeholder="Chọn loại phương tiện"
                                  name="TransportType"
                                  options={stateEnumConstant.dataCbo}
                                  component={SelectField}
                                />
                              </div>
                            </FormGroup>
                          </Col>
                          <Col xl={4} lg={6}>
                            <FormGroup style={styles}>
                              <div style={{ width: "153px" }}>
                                <label className="h-label h-lable-Obligatory">
                                  Hãng vận chuyển
                                </label>
                              </div>
                              <div style={{ width: "calc(100% - 153px)" }}>
                                <Field
                                  isClearable={true}
                                  className="h-textbox"
                                  isLoading={
                                    stateTravelCompany?.loading === "loaded"
                                      ? false
                                      : true
                                  }
                                  placeholder="Chọn loại phương tiện"
                                  name="Hang"
                                  options={
                                    stateTravelCompany.companyByTravelType
                                  }
                                  component={SelectField}
                                />
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={4} lg={12}>
                            <FormGroup style={styles}>
                              <div style={{ width: "153px" }}>
                                <label className="h-label h-lable-Obligatory">
                                  Vùng miền
                                </label>
                              </div>
                              <div style={{ width: "calc(100% - 153px)" }}>
                                <FastField
                                  handleChange={handleChangeRegions}
                                  className="h-textbox"
                                  placeholder="Chọn Vùng miền"
                                  name="Regions"
                                  options={Options.optionsRegions}
                                  component={SelectField}
                                />
                              </div>
                            </FormGroup>
                          </Col>
                          <Col xl={8} lg={12}>
                            <FormGroup style={styles}>
                              <div style={{ width: "153px" }}>
                                <label className="h-label h-lable-Obligatory">
                                  Địa điểm du lịch
                                </label>
                              </div>
                              <div style={{ width: "calc(100% - 153px)" }}>
                                <Field
                                  isMulti={true}
                                  className="h-textbox"
                                  isLoading={
                                    stateTourisAtt.loading === "loaded"
                                      ? false
                                      : true
                                  }
                                  placeholder="Chọn địa điểm du lịch"
                                  name="TouristAttaction"
                                  options={stateTourisAtt.touristAttrByRegions}
                                  component={SelectField}
                                />
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <FormGroup style={{ marginTop: "2px", ...styles }}>
                          <div style={{ width: "153px" }}>
                            <label className="h-label h-lable-Obligatory">
                              Lịch trình tour
                            </label>
                          </div>
                          <div style={{ width: "calc(100% - 153px)" }}>
                            <FastField
                              className="h-editor form-control"
                              name="Schedule"
                              component={EditorField}
                              placeholder="Vui lòng nhập lịch trình và format theo đúng quy định!"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <p
                          style={{
                            width: "100%",
                            padding: "0 0 5px 10px",
                            lineHeight: "inherit",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#438eb9",
                            borderBottom: "1px solid #dfeaf6",
                          }}
                        >
                          Thông tin khác
                        </p>
                        <FormGroup style={{ marginTop: "2px", ...styles }}>
                          <div style={{ width: "153px" }}>
                            <label className="h-label">
                              Ghi chú cho tour này
                            </label>
                          </div>
                          <div style={{ width: "calc(100% - 153px)" }}>
                            <FastField
                              className="h-editor form-control"
                              name="Schedule"
                              component={EditorField}
                              placeholder="Vui lòng nhập lịch trình và format theo đúng quy định!"
                            />
                          </div>
                        </FormGroup>
                        <FormGroup style={{ marginTop: "2px", ...styles }}>
                          <div style={{ width: "153px" }}>
                            <label className="h-label">
                              Điều kiện cho tour này
                            </label>
                          </div>
                          <div style={{ width: "calc(100% - 153px)" }}>
                            <FastField
                              className="h-editor form-control"
                              name="Schedule"
                              component={EditorField}
                              placeholder="Vui lòng nhập lịch trình và format theo đúng quy định!"
                            />
                          </div>
                        </FormGroup>
                        <FormGroup style={{ marginTop: "2px", ...styles }}>
                          <div style={{ width: "153px" }}>
                            <label className="h-label">Lưu ý(nếu có)</label>
                          </div>
                          <div style={{ width: "calc(100% - 153px)" }}>
                            <FastField
                              className="h-editor form-control"
                              name="Schedule"
                              component={EditorField}
                              placeholder="Vui lòng nhập lịch trình và format theo đúng quy định!"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup style={{ marginTop: "2px", ...styles }}>
                      <div style={{ width: "153px" }}></div>
                      <div style={{ width: "calc(100% - 153px)" }}></div>
                    </FormGroup>
                  </CardBody>
                </Form>
              </>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
}

TourUpdateOrCreate.propTypes = {};

export default TourUpdateOrCreate;

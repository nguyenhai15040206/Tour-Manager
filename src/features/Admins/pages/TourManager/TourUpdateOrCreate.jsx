import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { FastField, Field, Form, Formik, FieldArray } from "formik";
import { FcMindMap } from "react-icons/fc";
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Col,
  FormGroup,
  Row,
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
import {
  Adm_GetProvince,
  Adm_GetProvinceByRegions,
} from "../../Slices/SliceAddress";
import Options from "../../../../utils/Options";
import {
  Adm_GetTouristAttByRegions,
  Adm_GetTouristAttByProvince,
} from "../../Slices/SliceTouristAttraction";
import imageDefaultPNG from "../../../../assets/logo/imageDefault.png";
import { useHistory } from "react-router-dom";
import { Adm_UploadImageTour } from "../../Slices/SliceImagesUpload";
import {
  Adm_InsertTour,
  Adm_GetTourById,
  Adm_UpdateTour,
} from "../../Slices/SliceTour";
import { NotificationManager } from "react-notifications";
import { Adm_InsertTourDetails } from "../../Slices/SliceTourDetails";
import { Adm_GetTravelTypeCbo } from "../../Slices/SliceTravelType";
import { Adm_GetEnumConstantCbo } from "../../Slices/SliceEnumConstant";
import {
  Adm_GetCompanyByTravelTypeCbo,
  Adm_GetCompanyTransportInTourCbo,
} from "../../Slices/SliceTravelConpanyTransport";
import { Adm_UpdateTourDetails } from "../../Slices/SliceTourDetails";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Shedule from "./Shedule";
import * as yup from "yup";
import { Adm_GetDataTourGuidCondition } from "../../Slices/SliceTourGuide";
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
  TourGuideID: "",
  NoteByTour: "",
  ConditionByTour: "",
  NoteByMyTour: "",
  ProvinceByRegions: "",
  TouristAttaction: [],
  TransportType: "",
  CompanyStartID: "",
  CompanyTransportInTour: "",

  // state Shedule
  //#region  lịch trình ngày
  TitleDay1: "",
  Shedule1: "",
  TitleDay2: "",
  Shedule2: "",
  TitleDay3: "",
  Shedule3: "",
  TitleDay4: "",
  Shedule4: "",
  TitleDay5: "",
  Shedule5: "",
  TitleDay6: "",
  Shedule6: "",
  TitleDay7: "",
  Shedule7: "",
  TitleDay8: "",
  Shedule8: "",
  TitleDay9: "",
  Shedule9: "",
  TitleDay10: "",
  Shedule10: "",
  TitleDay11: "",
  Shedule11: "",
  TitleDay12: "",
  Shedule12: "",
  TitleDay13: "",
  Shedule13: "",
  TitleDay14: "",
  Shedule14: "",
  TitleDay15: "",
  Shedule15: "",
  TitleDay16: "",
  Shedule16: "",
  TitleDay17: "",
  Shedule17: "",
  TitleDay18: "",
  Shedule18: "",
  TitleDay19: "",
  Shedule19: "",
  TitleDay20: "",
  Shedule20: "",
  TitleDay21: "",
  Shedule21: "",
  TitleDay22: "",
  Shedule22: "",
  TitleDay23: "",
  Shedule23: "",
  TitleDay24: "",
  Shedule24: "",
  TitleDay25: "",
  Shedule25: "",
  TitleDay26: "",
  Shedule26: "",
  TitleDay27: "",
  Shedule27: "",
  TitleDay28: "",
  Shedule28: "",
  TitleDay29: "",
  Shedule29: "",
  TitleDay30: "",
  Shedule30: "",
  //#endregion end
};

function TourUpdateOrCreate(props) {
  // state in components
  const [rating, setRating] = useState(3);
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);
  const [imageUpload, setImageUpload] = useState(null);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [isOpenInfoTranposrt, setIsOpenInfoTranpsport] = useState(false);
  const [isOpenInfoNote, setIsOpenInfoNote] = useState(false);
  const [totalShedule, setTotalShedule] = useState([]);
  //end
  // Begin get state in store

  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateTourisAtt = useSelector((state) => state.touristAttraction);
  const stateTravelType = useSelector((state) => state?.travelType);
  const stateAddress = useSelector((state) => state.address);
  const stateTourGuide = useSelector((state) => state.tourGuide);

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
        await dispatch(Adm_GetCompanyTransportInTourCbo());
      } catch (err) {
        console.log(err.error);
      }
    };
    fetchApi();
  }, [dispatch, tourId, isAddMode]);

  //#region  call dữ liệu khi cập nhạt tour
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
            .then(async (payload) => {
              try {
                const params = {
                  regions: payload.regions,
                };

                setImageDefault(`${payload.tourImg}`);
                setRating(payload.rating);
                //==
                const re = "^||||^";
                let arrayObj = String(payload.schedule).split(re);
                arrayObj.pop();
                const arrTemp = [];
                for (let index = 0; index < arrayObj.length; index++) {
                  const element = arrayObj[index].split("^||^");
                  arrTemp.push({ title: element[0], shedule: element[1] });
                }

                //#region  duyệt index =. set initital values Cho Object [key,values]
                let ObjectInit = {};
                let IndexKey = 0;
                const arrayShedule = [];
                for (IndexKey = 0; IndexKey < arrTemp.length; IndexKey++) {
                  ObjectInit[`TitleDay${IndexKey + 1}`] =
                    arrTemp[IndexKey].title;
                  ObjectInit[`Shedule${IndexKey + 1}`] =
                    arrTemp[IndexKey].shedule;
                  arrayShedule.push({
                    title: `TitleDay${IndexKey + 1}`,
                    name: `Shedule${IndexKey + 1}`,
                    day: IndexKey + 1,
                  });
                }
                setTotalShedule(arrayShedule);
                for (let index = IndexKey; index < 30; index++) {
                  ObjectInit[`TitleDay${index + 1}`] = "";
                  ObjectInit[`Shedule${index + 1}`] = "";
                }

                if (payload.transportTypeID != null) {
                  const params = {
                    enumType: payload.transportTypeID,
                  };
                  await dispatch(Adm_GetCompanyByTravelTypeCbo(params));
                }
                //==
                setInitialValues(
                  Object.assign(ObjectInit, {
                    TourID: payload.tourId,
                    TourName: payload.tourName,
                    Description: payload.description,

                    TravelTypeID: payload.travelTypeId,
                    TourImg: "",
                    DeparturePlaceFrom: payload.departurePlaceFrom,
                    DeparturePlaceTo: payload.departurePlaceTo,
                    DateStart: payload.dateStart.slice(0, 10),
                    DateEnd: payload.dateEnd.slice(0, 10),
                    AdultUnitPrice:
                      payload.adultUnitPrice == null
                        ? 0
                        : payload.adultUnitPrice,
                    ChildrenUnitPrice:
                      payload.childrenUnitPrice == null
                        ? 0
                        : payload.childrenUnitPrice,
                    BabyUnitPrice:
                      payload.babyUnitPrice == null ? 0 : payload.babyUnitPrice,
                    Surcharge: payload.surcharge, // phụ thu nếu có
                    QuanityMax: payload.quanityMax,
                    QuanityMin: payload.quanityMin,
                    CurrentQuanity: payload.currentQuanity,
                    Suggest: payload.suggest,

                    // thông tin  khác
                    Regions: payload.regions,
                    NoteByTour:
                      payload.noteByTour === null ? "" : payload.noteByTour,
                    ConditionByTour:
                      payload.conditionByTour === null
                        ? ""
                        : payload.conditionByTour,
                    NoteByMyTour:
                      payload.NoteByMyTour === null ? "" : payload.noteByMyTour,
                    TransportType: payload.transportTypeID,
                    CompanyStartID:
                      payload.companyTransportStart === null
                        ? ""
                        : payload.companyTransportStart,
                    CompanyTransportInTour:
                      payload.companyTransportInTour === null
                        ? ""
                        : payload.companyTransportInTour,
                    TouristAttaction:
                      payload.tourDetails == null ? [] : payload.tourDetails,
                    ProvinceByRegions: "",
                  })
                );
                await dispatch(Adm_GetTouristAttByRegions(params));
                await dispatch(Adm_GetProvinceByRegions(params));
              } catch (err) {
                console.log(err.error);
              }
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
  //#endregion
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
        await dispatch(Adm_GetProvinceByRegions(params));
        await dispatch(Adm_GetTouristAttByRegions(params));
        return;
      }
      const params = {
        regions: e.value,
      };
      await dispatch(Adm_GetProvinceByRegions(params));
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
      console.log(err);
    }
  };

  // onSubmitForm
  //#region Nguyễn Tấn Hải - bắt sự kiện submit form
  //Thêm mới dữ liệu TOur => call APi khi submit on success!
  const onInsertTour = (tour, values) => {
    if (values.DeparturePlaceFrom === values.DeparturePlaceTo) {
      return NotificationManager.warning(
        "[Điểm đến] trùng [Điểm x/phát]",
        "Warning!",
        1500
      );
    }
    if (totalShedule.length === 0) {
      return NotificationManager.warning(
        "Vui lòng generate lịch trình tour",
        "Warning!",
        2500
      );
    }

    //#region  array tạm check shedule
    var arrtemp = [
      { Shedule: values.Shedule1 },
      { Shedule: values.Shedule2 },
      { Shedule: values.Shedule3 },
      { Shedule: values.Shedule4 },
      { Shedule: values.Shedule5 },
      { Shedule: values.Shedule6 },
      { Shedule: values.Shedule7 },
      { Shedule: values.Shedule8 },
      { Shedule: values.Shedule9 },
      { Shedule: values.Shedule10 },
      { Shedule: values.Shedule11 },
      { Shedule: values.Shedule12 },
      { Shedule: values.Shedule13 },
      { Shedule: values.Shedule14 },
      { Shedule: values.Shedule15 },

      { Shedule: values.Shedule16 },
      { Shedule: values.Shedule17 },
      { Shedule: values.Shedule18 },
      { Shedule: values.Shedule19 },

      { Shedule: values.Shedule20 },
      { Shedule: values.Shedule21 },
      { Shedule: values.Shedule22 },
      { Shedule: values.Shedule23 },
      { Shedule: values.Shedule24 },
      { Shedule: values.Shedule25 },
      { Shedule: values.Shedule26 },
      { Shedule: values.Shedule27 },
      { Shedule: values.Shedule28 },
      { Shedule: values.Shedule29 },
      { Shedule: values.Shedule30 },
    ];

    //#endregion end

    var arrShedule = [];
    for (let index = 0; index < totalShedule.length; index++) {
      var title = document
        .getElementById(`${totalShedule[index].title}`)
        .value.trim();
      if (title === "" || arrtemp[index].Shedule.length <= 20) {
        return NotificationManager.warning(
          `Vui lòng nhập lịch trình ngày ${index + 1}`,
          "Warning!",
          2500
        );
      } else {
        arrShedule.push({ title: title, Shedule: arrtemp[index].Shedule });
      }
    }

    let SheduleAll = "";
    for (let index = 0; index < arrShedule.length; index++) {
      SheduleAll += `${arrShedule[index].title} ^||^ ${arrShedule[index].Shedule} ^||||^`;
    }
    console.log(SheduleAll);
    //#region  submit
    let formData = new FormData();
    formData.append("file", imageUpload);
    dispatch(Adm_UploadImageTour(formData))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(
          Adm_InsertTour({
            ...tour,
            tourImg: payload.fileName,
            Schedule: SheduleAll,
          })
        )
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
    //#endregion
  };

  // cập nhật
  const onEdtiTour = async (tour, values) => {
    let tourImageEdit = "";
    try {
      const dateStart = new Date(document.getElementById("DateStart").value);
      const dateEnd = new Date(document.getElementById("DateEnd").value);
      const diff = Math.floor(dateEnd - dateStart) / 86400000;
      console.log(diff);
      if (totalShedule.length !== diff) {
        return NotificationManager.warning(
          "Số ngày được thay đổi, vui lòng generate lịch trình tour",
          "Warning!",
          2500
        );
      }

      //#region  array tạm check shedule
      var arrtemp = [
        { Shedule: values.Shedule1 },
        { Shedule: values.Shedule2 },
        { Shedule: values.Shedule3 },
        { Shedule: values.Shedule4 },
        { Shedule: values.Shedule5 },
        { Shedule: values.Shedule6 },
        { Shedule: values.Shedule7 },
        { Shedule: values.Shedule8 },
        { Shedule: values.Shedule9 },
        { Shedule: values.Shedule10 },
        { Shedule: values.Shedule11 },
        { Shedule: values.Shedule12 },
        { Shedule: values.Shedule13 },
        { Shedule: values.Shedule14 },
        { Shedule: values.Shedule15 },

        { Shedule: values.Shedule16 },
        { Shedule: values.Shedule17 },
        { Shedule: values.Shedule18 },
        { Shedule: values.Shedule19 },

        { Shedule: values.Shedule20 },
        { Shedule: values.Shedule21 },
        { Shedule: values.Shedule22 },
        { Shedule: values.Shedule23 },
        { Shedule: values.Shedule24 },
        { Shedule: values.Shedule25 },
        { Shedule: values.Shedule26 },
        { Shedule: values.Shedule27 },
        { Shedule: values.Shedule28 },
        { Shedule: values.Shedule29 },
        { Shedule: values.Shedule30 },
      ];

      //#endregion end

      var arrShedule = [];
      for (let index = 0; index < totalShedule.length; index++) {
        var title = document
          .getElementById(`${totalShedule[index].title}`)
          .value.trim();
        if (title === "" || arrtemp[index].Shedule.length <= 20) {
          return NotificationManager.warning(
            `Vui lòng nhập lịch trình ngày ${index + 1}`,
            "Warning!",
            2500
          );
        } else {
          arrShedule.push({ title: title, Shedule: arrtemp[index].Shedule });
        }
      }

      let SheduleAll = "";
      for (let index = 0; index < arrShedule.length; index++) {
        SheduleAll += `${arrShedule[index].title} ^||^ ${arrShedule[index].Shedule} ^||||^`;
      }
      if (values.TourImg !== "") {
        let formData = new FormData();
        formData.append("file", imageUpload);
        tourImageEdit = unwrapResult(
          await dispatch(Adm_UploadImageTour(formData))
        ).fileName;
      }
      dispatch(
        Adm_UpdateTour({
          ...tour,
          tourImg: tourImageEdit,
          tourId: values.TourID,
          Schedule: SheduleAll,
        })
      )
        .then(unwrapResult)
        .then(async (payload) => {
          console.log(payload);
          let arrTouristAttr = values.TouristAttaction;
          console.log(arrTouristAttr);
          const params = {
            tourId: payload.tourId,
            TourAttrIds: arrTouristAttr,
            EmpId: JSON.parse(localStorage.getItem("accessTokenEmp")).data
              .empId,
          };
          await dispatch(Adm_UpdateTourDetails(params))
            .then(() => {
              return NotificationManager.success(
                `Cập nhật thành công`,
                "Success!!!",
                1500
              );
            })
            .catch((err) => {
              if (err.status === 401) {
                localStorage.removeItem("accessTokenEmp");
                return history.push("/admin/login");
              }
              return NotificationManager.error(
                `${err.error}`,
                "Cập nhật thất bại!",
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
            "cập nhật thất bại!",
            1500
          );
        });
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem("accessTokenEmp");
        return history.push("/admin/login");
      }
      return NotificationManager.error(
        `${err.error}`,
        "Cập nhật thất bại!",
        1500
      );
    }
  };
  // handle SubmitForm
  const handelClickOnSubmitForm = async (values, type) => {
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

      //
      companyTransportStartId: values.CompanyStartID,
      companyTransportInTourId: values.CompanyTransportInTour,
      tourGuideID: values.TourGuideID,
      noteByTour: values.NoteByTour,
      conditionByTour: values.ConditionByTour,
      noteByMyTour: values.NoteByMyTour,
      EmpIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      EmpIdupdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };

    if (values.TourID !== "") {
      // edti here
      onEdtiTour(tour, values);
      if (type === "reset") {
        setInitialValues(initialValuesInsert);
      }
    } else {
      onInsertTour(tour, values);
      if (type === "reset") {
        setInitialValues(initialValuesInsert);
      }
    }
  };
  //#endregion

  //====================
  // change province  => call tourist attraction vy province
  const handleClickChangeProvince = async (e) => {
    try {
      const params = {
        provinceIDs: e.map((item) => `${item.value}`).join(","),
      };
      await dispatch(Adm_GetTouristAttByProvince(params));
    } catch (err) {
      console.log(err.error);
    }
  };

  //=============
  //#region xử lý general lịch trình các ngày
  const handleClickGenerateShedule = () => {
    const dateStart = new Date(document.getElementById("DateStart").value);
    const dateEnd = new Date(document.getElementById("DateEnd").value);
    const currentDate = new Date();
    if (!isValidDate(dateStart) || dateStart < currentDate) {
      if (isAddMode) {
        setTotalShedule([]);
      }
      return NotificationManager.warning(
        "Ngày bắt đầu không hợp lệ!",
        "warning!!!",
        2500
      );
    }
    if (!isValidDate(dateEnd) || +dateEnd <= +dateStart) {
      if (isAddMode) {
        setTotalShedule([]);
      }
      return NotificationManager.warning(
        "Ngày kết thúc không hợp lệ!",
        "warning!!!",
        2500
      );
    }

    const diff = Math.floor(dateEnd - dateStart) / 86400000;

    const arrayShedule = [];
    for (let index = 0; index < diff; index++) {
      arrayShedule.push({
        title: `TitleDay${index + 1}`,
        name: `Shedule${index + 1}`,
        day: index + 1,
      });
    }
    console.log(initialValues);
    setTotalShedule(arrayShedule);
  };
  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };

  //#endregion

  //======
  // lọc ra các hướng dẫn viên cho chưa có trong tour đã tạo
  const handleClickGetTourGuideCondition = () => {
    const dateStart = new Date(document.getElementById("DateStart").value);
    const dateEnd = new Date(document.getElementById("DateEnd").value);
    const currentDate = new Date();
    if (!isValidDate(dateStart) || dateStart < currentDate) {
      return NotificationManager.warning(
        "Ngày bắt đầu không hợp lệ!",
        "warning!!!",
        2500
      );
    }
    if (!isValidDate(dateEnd) || +dateEnd <= +dateStart) {
      return NotificationManager.warning(
        "Ngày kết thúc không hợp lệ!",
        "warning!!!",
        2500
      );
    }
    const params = {
      pDateStart: document.getElementById("DateStart").value,
      pDateEnd: document.getElementById("DateEnd").value,
    };
    dispatch(Adm_GetDataTourGuidCondition(params))
      .then(unwrapResult)
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        return NotificationManager.warning(
          `${err.error}`,
          "Vui lòng kiểm tra lại!!!",
          2500
        );
      });
  };
  //==
  return (
    <>
      <div className="animate__animated animate__slideInUp animate__delay-0.5s">
        <Card>
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
            onSubmit={(values, { resetForm }) => {
              if (submitAction === "Save") {
                handelClickOnSubmitForm(values, "");
                return;
              }
              if (submitAction === "SaveAndCreated") {
                handelClickOnSubmitForm(values, "reset");
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
                              fullSymbol={
                                <AiFillStar color="orange" size={20} />
                              }
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
                                        disable={!isAddMode}
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
                                        disable={!isAddMode}
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
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
                                      <FastField
                                        handleChange={() => {
                                          if (isAddMode) {
                                            setTotalShedule([]);
                                          }
                                        }}
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
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
                                      <FastField
                                        handleChange={() => {
                                          if (isAddMode) {
                                            setTotalShedule([]);
                                          }
                                        }}
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
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
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
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
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
                                <Col
                                  xl={6}
                                  lg={12}
                                  style={{ display: "block" }}
                                >
                                  <FormGroup style={styles}>
                                    <div style={{ width: "153px" }}>
                                      <label className="h-label h-lable-Obligatory">
                                        Đơn giá trẻ nhỏ
                                      </label>
                                    </div>
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
                                      <FastField
                                        type="text"
                                        name="BabyUnitPrice"
                                        className="h-textbox"
                                        component={InputField}
                                      />
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col
                                  xl={6}
                                  lg={12}
                                  style={{ display: "block" }}
                                >
                                  <FormGroup style={styles}>
                                    <div style={{ width: "153px" }}>
                                      <label className="h-label">
                                        Phụ phí(nếu có)
                                      </label>
                                    </div>
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
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
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
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
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
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
                            Thông tin HDV - DS địa điểm tham quan - Lịch trình
                            bởi Mytour
                          </p>
                          <Row className="mt-2">
                            <Col xl={8} lg={12}>
                              <FormGroup style={styles}>
                                <div style={{ width: "153px" }}>
                                  <label className="h-label">
                                    Hướng dẫn viên
                                  </label>
                                </div>
                                <div style={{ width: "calc(100% - 153px)" }}>
                                  <div style={styles}>
                                    <div style={{ width: "calc(100% - 70px)" }}>
                                      <Field
                                        className="h-textbox"
                                        placeholder="Chọn hướng dẫn viên nếu có hoặc cập nhật sau"
                                        name="TourGuideID"
                                        isLoading={
                                          stateTourGuide?.loading === "loaded"
                                            ? false
                                            : true
                                        }
                                        options={stateTourGuide.dataCondition}
                                        component={SelectField}
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      style={{
                                        width: "70px",
                                        margin: "2.9px 0px 0px 3px",
                                      }}
                                      className="h-button"
                                      onClick={() => {
                                        handleClickGetTourGuideCondition();
                                      }}
                                    >
                                      <FaSearch
                                        color="rgb(180 173 30)"
                                        size={15}
                                      />
                                      {" Lọc "}
                                    </button>
                                  </div>
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
                                    disable={!isAddMode}
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
                                  <label className="h-label">
                                    DS tỉnh theo vùng
                                  </label>
                                </div>
                                <div
                                  style={{
                                    width: "calc(100% - 153px)",
                                  }}
                                >
                                  <Field
                                    handleChange={handleClickChangeProvince}
                                    className="h-textbox"
                                    isMulti={true}
                                    isLoading={
                                      stateAddress?.loading === "loaded"
                                        ? false
                                        : true
                                    }
                                    placeholder="Hổ trợ lọc ds địa điểm theo tỉnh"
                                    name="ProvinceByRegions"
                                    options={stateAddress.ProvinceByRegions}
                                    component={SelectField}
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
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
                          <div className="mt-1" style={styles}>
                            <div style={{ width: "153px" }}>
                              <label className="h-label"></label>
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => {
                                  handleClickGenerateShedule();
                                }}
                                className="h-button"
                              >
                                <FcMindMap size={20} /> Generate Lịch trình
                              </button>
                            </div>
                          </div>
                          {totalShedule.length > 0 &&
                            totalShedule.map((item, index) => (
                              <Shedule
                                name={`${item.name}`}
                                title={`${item.title}`}
                                day={item.day}
                                key={index}
                              />
                            ))}
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <p
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              padding: "0 0 5px 10px",
                              lineHeight: "inherit",
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#438eb9",
                              borderBottom: "1px solid #dfeaf6",
                            }}
                          >
                            <span
                              onClick={() => {
                                setIsOpenInfoTranpsport(!isOpenInfoTranposrt);
                              }}
                              data-bs-toggle="collapse"
                              data-bs-target="#showInfomationTransport"
                            >
                              Thông tin vận chuyển{""}
                            </span>
                            <MdKeyboardArrowDown
                              size={20}
                              //className="cr-sidebar__nav-item-icon"
                              style={{
                                padding: 0,
                                transform: isOpenInfoTranposrt
                                  ? "rotate(0deg)"
                                  : "rotate(-90deg)",
                                transition: "transform 0.3s",
                              }}
                            />
                          </p>
                        </Col>
                        <div id="showInfomationTransport" className="collapse">
                          <Row className="mt-2">
                            <Col xl={4} lg={12}>
                              <FormGroup style={styles}>
                                <div style={{ width: "153px" }}>
                                  <label className="h-label h-lable-Obligatory">
                                    Loại p/t di chuyển
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
                                    placeholder="Vui lòng chọn"
                                    name="TransportType"
                                    options={stateEnumConstant.dataCbo}
                                    component={SelectField}
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xl={8} lg={12}>
                              <FormGroup style={styles}>
                                <div style={{ width: "153px" }}>
                                  <label className="h-label h-lable-Obligatory">
                                    P/tiện khứ - hồi
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
                                    placeholder="Chọn hãng vận chuyển khứ hồi"
                                    name="CompanyStartID"
                                    options={
                                      stateTravelCompany.companyByTravelType
                                    }
                                    component={SelectField}
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="">
                            <Col xl={8} lg={12}>
                              <FormGroup style={styles}>
                                <div style={{ width: "153px" }}>
                                  <label className="h-label h-lable-Obligatory">
                                    P/tiện tham quan
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
                                    placeholder="Chọn hãng xe tham quan"
                                    name="CompanyTransportInTour"
                                    options={
                                      stateTravelCompany.companyTravelInTour
                                    }
                                    component={SelectField}
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <p
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              padding: "0 0 5px 10px",
                              lineHeight: "inherit",
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#438eb9",
                              borderBottom: "1px solid #dfeaf6",
                            }}
                          >
                            <span
                              onClick={() => {
                                setIsOpenInfoNote(!isOpenInfoNote);
                              }}
                              data-bs-toggle="collapse"
                              data-bs-target="#showInfomationNote"
                            >
                              Thông tin khác
                            </span>
                            <MdKeyboardArrowDown
                              size={20}
                              //className="cr-sidebar__nav-item-icon"
                              style={{
                                padding: 0,
                                transform: isOpenInfoNote
                                  ? "rotate(0deg)"
                                  : "rotate(-90deg)",
                                transition: "transform 0.3s",
                              }}
                            />
                          </p>
                          <div id="showInfomationNote" className="collapse">
                            <FormGroup style={{ marginTop: "2px", ...styles }}>
                              <div style={{ width: "153px" }}>
                                <label className="h-label">
                                  Ghi chú cho tour này
                                </label>
                              </div>
                              <div style={{ width: "calc(100% - 153px)" }}>
                                <FastField
                                  className="h-editor form-control"
                                  name="NoteByTour"
                                  component={EditorField}
                                  placeholder="Vui lòng nhập ghi chú và format theo đúng quy định!"
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
                                  name="ConditionByTour"
                                  component={EditorField}
                                  placeholder="Vui lòng nhập điều kiện và format theo đúng quy định!"
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
                                  name="NoteByMyTour"
                                  component={EditorField}
                                  placeholder="Vui lòng nhập lưu ý và format theo đúng quy định!"
                                />
                              </div>
                            </FormGroup>
                          </div>
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
    </>
  );
}

TourUpdateOrCreate.propTypes = {};

export default TourUpdateOrCreate;

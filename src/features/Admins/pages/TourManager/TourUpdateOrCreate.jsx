import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { FastField, Field, Form, Formik } from "formik";
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
  Adm_InsertTourAvailable,
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
import { MdKeyboardArrowDown, MdOutlineLibraryBooks } from "react-icons/md";
import Shedule from "./Shedule";
import * as yup from "yup";
import { Adm_GetDataTourGuidCondition } from "../../Slices/SliceTourGuide";
import InsertTourAvailable from "./InsertTourAvailable";
//
const styles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
};

let initialValuesInsert = {
  // th??ng tin c?? b???n
  TourID: "",
  TourName: "",
  Description: "",
  TravelTypeID: "",
  TourImg: "",
  DeparturePlaceFrom: "",
  DeparturePlaceTo: "",
  DateStart: "",
  DateEnd: "",
  GroupNumber: "",
  BabyUnitPrice: "", // ????n gi?? tr??? em
  AdultUnitPrice: "", // ????n gi?? ng?????i l???n
  ChildrenUnitPrice: "", // ????n gi?? tr??? nh???
  Surcharge: 0, // ph??? thu n???u c??
  QuanityMax: 10,
  QuanityMin: "",
  CurrentQuanity: 0,
  Suggest: false,

  // th??ng tin v???n chuy???n v?? l???ch tr??nh tour
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
  //#region  l???ch tr??nh ng??y
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

//#region validate formik
const validateNotTourFamily = yup.object().shape({
  ChildrenUnitPrice: yup
    .number()
    .moreThan(0, "[????n gi??] l???n h??n 0")
    .transform((value) => (isNaN(value) ? undefined : value))
    .max(yup.ref("AdultUnitPrice"), "[Gi?? tr??? em] < [Gi?? ng?????i l???n]")
    .required("Vui l??ng nh???p ????n gi?? h???p l???!"),
  BabyUnitPrice: yup
    .number()
    .moreThan(0, "[????n gi??] l???n h??n 0")
    .transform((value) => (isNaN(value) ? undefined : value))
    .max(yup.ref("ChildrenUnitPrice"), "[Gi?? tr??? nh???] < [Gi?? tr??? em]")
    .required("Vui l??ng nh???p ????n gi?? h???p l???!"),
});

const validateIsTourFamily = yup.object().shape({
  GroupNumber: yup
    .number()
    .moreThan(0, "[????n gi??] l???n h??n 0")
    .transform((value) => (isNaN(value) ? undefined : value))
    .max(10, "[S??? l?????ng nh??m] t???i ??a l?? 10")
    .required("[S??? l?????ng nh??m] kh??ng th??? b??? tr???ng!"),
});
//#endregion

function TourUpdateOrCreate(props) {
  const { tourId } = useParams();
  //#region  state in components
  const [rating, setRating] = useState(3);
  const [imageDefault, setImageDefault] = useState(`${imageDefaultPNG}`);
  const [imageUpload, setImageUpload] = useState(null);
  const [initialValues, setInitialValues] = useState(initialValuesInsert);
  const [isOpenInfoTranposrt, setIsOpenInfoTranpsport] = useState(false);
  const [isOpenInfoNote, setIsOpenInfoNote] = useState(false);
  const [totalShedule, setTotalShedule] = useState([]);
  const [isAddMode, setIsAddMode] = useState(!tourId);
  const [tourFamily, setTourFamily] = useState(false);
  const [validationShema, setValidationShema] = useState(
    validationSchema.TourManagerAdd.concat(validateNotTourFamily)
  );

  // nh??n b???ng tour
  const [showPopup, setShowPopup] = useState(false);
  const [totalSheduleClone, setTotalSheduleClone] = useState([]);
  const [tourIdAfterInsertAvailiable, setTourIdAfterInsertAvailiable] =
    useState(null);
  //#endregion

  //#region Begin get state in store
  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateTourisAtt = useSelector((state) => state.touristAttraction);
  const stateTravelType = useSelector((state) => state?.travelType);
  const stateAddress = useSelector((state) => state.address);
  const stateTourGuide = useSelector((state) => state.tourGuide);

  const stateTravelCompany = useSelector(
    (state) => state.travelConpanyTransport
  );
  //#endregion
  //
  const dispatch = useDispatch();
  const history = useHistory();

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
  }, [dispatch, tourId]);

  //#region  call d??? li???u khi c???p nh???t tour

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
                //#region  check c?? ph???i l?? tour gia ????nh hay kh??ng?
                if (
                  payload.travelTypeId ===
                  "8f64fb01-91fe-4850-a004-35cf26a1c1ef"
                ) {
                  setTourFamily(true);
                  setValidationShema(
                    validationSchema.TourManagerEdit.concat(
                      validateIsTourFamily
                    )
                  );
                } else {
                  setTourFamily(false);
                  setValidationShema(
                    validationSchema.TourManagerEdit.concat(
                      validateNotTourFamily
                    )
                  );
                }
                //#endregion

                const params = {
                  regions: payload.regions,
                };
                setImageDefault(`${payload.tourImg}`);
                setRating(payload.rating);
                //#region  x??? l?? l???ch tr??nh tour
                const re = "^||||^";
                let arrayObj = String(payload.schedule).split(re);
                arrayObj.pop();
                const arrTemp = [];
                for (let index = 0; index < arrayObj.length; index++) {
                  const element = arrayObj[index].split("^||^");
                  arrTemp.push({ title: element[0], shedule: element[1] });
                }

                //#region  duy???t index =. set initital values Cho Object [key,values]
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
                setTotalSheduleClone(arrayShedule);
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
                //#endregion
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
                    GroupNumber:
                      payload.groupNumber === null ? 0 : payload.groupNumber,
                    AdultUnitPrice:
                      payload.adultUnitPrice === null
                        ? 0
                        : payload.adultUnitPrice,
                    ChildrenUnitPrice:
                      payload.childrenUnitPrice === null
                        ? 0
                        : payload.childrenUnitPrice,
                    BabyUnitPrice:
                      payload.babyUnitPrice === null
                        ? 0
                        : payload.babyUnitPrice,
                    Surcharge: payload.surcharge, // ph??? thu n???u c??
                    QuanityMax: payload.quanityMax,
                    QuanityMin: payload.quanityMin,
                    CurrentQuanity: payload.currentQuanity,
                    Suggest: payload.suggest,

                    // th??ng tin  kh??c
                    Regions: payload.regions,
                    NoteByTour:
                      payload.noteByTour === null ? "" : payload.noteByTour,
                    ConditionByTour:
                      payload.conditionByTour === null
                        ? ""
                        : payload.conditionByTour,
                    NoteByMyTour:
                      payload.noteByMyTour === null ? "" : payload.noteByMyTour,
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
  }, [dispatch, tourId]);
  //#endregion
  isAddMode
    ? (document.title = "Th??m tour du l???ch")
    : (document.title = "C???p nh???t tour du l???ch");

  const titleUpdateOrCreated = isAddMode
    ? "T???o m???i tour du l???ch"
    : "C???p nh???t tour du l???ch";

  ////////////////////// X??? l?? s??? ki???n

  //#region handle click change rating tour and change image
  const handleClickChangeRating = (rating) => {
    setRating(rating);
  };

  // handle Change Image
  const handleChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
      setImageDefault(URL.createObjectURL(event.target.files[0]));
    }
  };

  //#endregion

  // handle change travel type => load company travel by traveltype
  const handleClickChangeTravelType = async (e) => {
    try {
      const params = {
        enumType: e.value,
      };
      await dispatch(Adm_GetCompanyByTravelTypeCbo(params));
    } catch (err) {
      console.log(err);
    }
  };

  // onSubmitForm
  //#region Nguy???n T???n H???i - b???t s??? ki???n submit form
  //Th??m m???i d??? li???u TOur => call APi khi submit on success!
  const onInsertTour = (tour, values, { setStatus, resetForm }) => {
    //#region  check ??i???u ki???n
    if (totalShedule.length === 0) {
      setStatus({ success: false });
      return NotificationManager.warning(
        "Vui l??ng generate l???ch tr??nh tour",
        "Warning!",
        2500
      );
    }
    const dateStart = new Date(document.getElementById("DateStart").value);
    const dateEnd = new Date(document.getElementById("DateEnd").value);
    const diff = Math.floor(dateEnd - dateStart) / 86400000;
    console.log(diff);
    if (totalShedule.length !== diff) {
      return NotificationManager.warning(
        "S??? ng??y ???????c thay ?????i, vui l??ng generate l???ch tr??nh tour",
        "Warning!",
        2500
      );
    }
    //#endregion

    //#region  array t???m check shedule
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
        setStatus({ success: false });
        return NotificationManager.warning(
          `Vui l??ng nh???p l???ch tr??nh ng??y ${index + 1}`,
          "Warning!",
          2500
        );
      } else {
        arrShedule.push({ title: title, Shedule: arrtemp[index].Shedule });
      }
    }

    //#region check ??i???u ki???n v??? l???ch tr??nh
    let SheduleAll = "";
    for (let index = 0; index < arrShedule.length; index++) {
      SheduleAll += `${arrShedule[index].title} ^||^ ${arrShedule[index].Shedule} ^||||^`;
    }
    //#endregion

    //#region  check ??i???u ki???n n???u l?? tour gia ????nh
    if (tourFamily === true) {
      if (Number(values.QuanityMax) % Number(values.GroupNumber) !== 0) {
        return NotificationManager.warning(
          `S??? l?????ng t???i ??a chia h???t cho nh??m kh??ch`,
          "Warning!",
          2500
        );
      }
      if (Number(values.QuanityMin) % Number(values.GroupNumber) !== 0) {
        return NotificationManager.warning(
          `S??? l?????ng t???i thi???u chia h???t cho  nh??m kh??ch`,
          "Warning!",
          2500
        );
      }
    }
    //#endregion

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
              return NotificationManager.error(`L???i`, "Th??m th???t b???i!", 1500);
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
                  setStatus({ success: false });
                  return NotificationManager.error(
                    `${err.error}`,
                    "Error!",
                    1500
                  );
                }
              });
              setStatus({ success: true });
              if (submitAction === "SaveAndCreated") {
                setTotalShedule([]);
                setImageDefault(`${imageDefaultPNG}`);
                setInitialValues(initialValuesInsert);
                resetForm();
              }
              if (submitAction === "SaveAndClosed") {
                history.push("/admin/TourManager");
              }
              return NotificationManager.success(
                `Th??m th??nh c??ng!`,
                "Success!",
                1500
              );
            }
          })
          .catch((err) => {
            setStatus({ success: false });
            if (err.status === 401) {
              localStorage.removeItem("accessTokenEmp");
              return history.push("/admin/login");
            }
            if (err.status === 409) {
              return NotificationManager.warning(
                "Ch???n m???t ng??y b???t ?????u ho???c ?????a ??i???m x/ph??t kh??c!",
                `${err.message}`,
                2500
              );
            }
            return NotificationManager.error(
              `${err.error}`,
              "Th??m th???t b???i!",
              1500
            );
          });
      })
      .catch((err) => {
        setStatus({ success: false });
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        return NotificationManager.error(
          `${err.error}`,
          "Th??m th???t b???i!",
          1500
        );
      });
    //#endregion
  };

  //#region c???p nh???t
  const onEdtiTour = async (tour, values, { resetForm }) => {
    let tourImageEdit = "";
    try {
      //#region  check ??i???u ki???n
      const dateStart = new Date(document.getElementById("DateStart").value);
      const dateEnd = new Date(document.getElementById("DateEnd").value);
      const diff = Math.floor(dateEnd - dateStart) / 86400000;
      if (totalShedule.length !== diff) {
        return NotificationManager.warning(
          "S??? ng??y ???????c thay ?????i, vui l??ng generate l???ch tr??nh tour",
          "Warning!",
          2500
        );
      }
      //#endregion

      //#region  array t???m check shedule
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

      //#region  check ??i???u ki???n v??? l???ch tr??nh tour
      var arrShedule = [];
      for (let index = 0; index < totalShedule.length; index++) {
        var title = document
          .getElementById(`${totalShedule[index].title}`)
          .value.trim();
        if (title === "" || arrtemp[index].Shedule.length <= 20) {
          return NotificationManager.warning(
            `Vui l??ng nh???p l???ch tr??nh ng??y ${index + 1}`,
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
      //#endregion

      //#region  check ??i???u ki???n n???u l?? tour gia ????nh
      if (tourFamily === true) {
        if (Number(values.QuanityMax) % Number(values.GroupNumber) !== 0) {
          return NotificationManager.warning(
            `S??? l?????ng t???i ??a chia h???t cho nh??m kh??ch`,
            "Warning!",
            2500
          );
        }
        if (Number(values.QuanityMin) % Number(values.GroupNumber) !== 0) {
          return NotificationManager.warning(
            `S??? l?????ng t???i thi???u chia h???t cho  nh??m kh??ch`,
            "Warning!",
            2500
          );
        }
      }
      //#endregion
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
              if (submitAction === "SaveAndCreated") {
                setIsAddMode(true);
                setImageDefault(`${imageDefaultPNG}`);
                setTotalShedule([]);
                setInitialValues(initialValuesInsert);
                resetForm();
              }
              if (submitAction === "SaveAndClosed") {
                history.push("/admin/TourManager");
              }
              return NotificationManager.success(
                `C???p nh???t th??nh c??ng`,
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
                "C???p nh???t th???t b???i!",
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
            "c???p nh???t th???t b???i!",
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
        "C???p nh???t th???t b???i!",
        1500
      );
    }
  };
  //#endregion
  // handle SubmitForm
  const handelClickOnSubmitForm = async (values, { setStatus, resetForm }) => {
    //th???c hi???n call d??? li???u
    const tour = {
      // th??ng tin c?? b???n
      tourName: values.TourName,
      description: values.Description,
      travelTypeID: values.TravelTypeID,
      departurePlaceFrom: values.DeparturePlaceFrom,
      departurePlaceTo: values.DeparturePlaceTo,
      dateStart: values.DateStart,
      dateEnd: values.DateEnd,
      rating: rating,
      groupNumber: values.GroupNumber,
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
      onEdtiTour(tour, values, { resetForm });
    } else {
      onInsertTour(tour, values, { setStatus, resetForm });
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
  //#region x??? l?? general l???ch tr??nh c??c ng??y
  const handleClickGenerateShedule = () => {
    const dateStart = new Date(document.getElementById("DateStart").value);
    const dateEnd = new Date(document.getElementById("DateEnd").value);
    const currentDate = new Date();
    if (!isValidDate(dateStart) || dateStart < currentDate) {
      return NotificationManager.warning(
        "Ng??y b???t ?????u kh??ng h???p l???!",
        "warning!!!",
        2500
      );
    }
    if (!isValidDate(dateEnd) || +dateEnd <= +dateStart) {
      return NotificationManager.warning(
        "Ng??y k???t th??c kh??ng h???p l???!",
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
    setTotalShedule(arrayShedule);
  };
  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };

  //#endregion

  //======
  // l???c ra c??c h?????ng d???n vi??n cho ch??a c?? trong tour ???? t???o
  const handleClickGetTourGuideCondition = () => {
    const dateStart = new Date(document.getElementById("DateStart").value);
    const dateEnd = new Date(document.getElementById("DateEnd").value);
    const currentDate = new Date();
    if (!isValidDate(dateStart) || dateStart < currentDate) {
      return NotificationManager.warning(
        "Ng??y b???t ?????u kh??ng h???p l???!",
        "warning!!!",
        2500
      );
    }
    if (!isValidDate(dateEnd) || +dateEnd <= +dateStart) {
      return NotificationManager.warning(
        "Ng??y k???t th??c kh??ng h???p l???!",
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
          "Vui l??ng ki???m tra l???i!!!",
          2500
        );
      });
  };

  // nh??n b???ng tour
  const toggleTourAvailable = () => {
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
    setTourIdAfterInsertAvailiable(null);
  };

  const handleClickSaveTourAvaliable = (values) => {
    const params = {
      dateStart: values.DateStartClone,
      dateEnd: values.DateEndClone,
      departurePlaceFrom: values.DeparturePlaceFromClone,
      tourId: tourId,
      suggest: values.SuggestClone,
      EmpIDInsert: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
      EmpIdupdate: JSON.parse(localStorage.getItem("accessTokenEmp")).data
        .empId,
    };
    dispatch(Adm_InsertTourAvailable(params))
      .then(unwrapResult)
      .then((payload) => {
        setTourIdAfterInsertAvailiable(payload.tourId);
        return NotificationManager.success(
          `Nh??n b???n th??nh c??ng!`,
          "Success!",
          2500
        );
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("accessTokenEmp");
          return history.push("/admin/login");
        }
        if (err.status === 409) {
          return NotificationManager.warning(
            `${err.message}`,
            "Tr??ng d??? li???u!",
            2500
          );
        }
        return NotificationManager.error(
          `${err.error}`,
          "Nh??n b???n th???t b???i!",
          1500
        );
      });
  };
  //

  //=======
  return (
    <>
      <InsertTourAvailable
        tourId={tourIdAfterInsertAvailiable}
        totalShedule={totalSheduleClone}
        showModal={showPopup}
        toggle={toggleTourAvailable}
        onSubmit={handleClickSaveTourAvaliable}
      />
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
            onSubmit={(values, { setStatus, resetForm }) => {
              if (submitAction === "Save") {
                handelClickOnSubmitForm(values, { setStatus });
                return;
              }
              if (submitAction === "SaveAndCreated") {
                handelClickOnSubmitForm(values, { setStatus, resetForm });
                return;
              }
              if (submitAction === "SaveAndClosed") {
                handelClickOnSubmitForm(values, { setStatus });
                return;
              }
              if (submitAction === "AddNewTourDateDiff") {
                handelClickOnSubmitForm(values, { setStatus, resetForm });
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
                        L??u
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
                        L??u v?? t???o m???i
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
                        L??u v?? ????ng
                      </button>
                      <div style={{ float: "right" }}>
                        {!isAddMode && (
                          <button
                            type="button"
                            onClick={() => {
                              handleShowPopup();
                            }}
                            className="h-button"
                            style={{ marginRight: "10px" }}
                          >
                            <MdOutlineLibraryBooks size={20} color="#228B22" />
                            Nh??n b???n tour du l???ch
                          </button>
                        )}
                      </div>
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
                        Th??ng tin c?? b???n
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
                                <label className="h-label">M?? tour</label>
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
                                  T??n tour
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
                                  M?? t??? tour
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
                                  Lo???i h??nh du l???ch
                                </label>
                              </div>
                              <div
                                style={{
                                  width: "calc(100% - 153px)",
                                }}
                              >
                                <Field
                                  isClearable={false}
                                  className="h-textbox"
                                  handleChange={(e) => {
                                    if (e === null) {
                                      setValidationShema(
                                        validationSchema.TourManagerAdd.concat(
                                          validateNotTourFamily
                                        )
                                      );
                                      setTourFamily(false);
                                      return;
                                    }
                                    if (
                                      e.value ===
                                      "8f64fb01-91fe-4850-a004-35cf26a1c1ef"
                                    ) {
                                      setValidationShema(
                                        validationSchema.TourManagerAdd.concat(
                                          validateIsTourFamily
                                        )
                                      );
                                      setTourFamily(true);
                                    } else {
                                      setValidationShema(
                                        validationSchema.TourManagerAdd.concat(
                                          validateNotTourFamily
                                        )
                                      );
                                      setTourFamily(false);
                                    }
                                  }}
                                  isLoading={
                                    stateTravelType?.loading === "loaded"
                                      ? false
                                      : true
                                  }
                                  placeholder="Ch???n lo???i h??nh du l???ch"
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
                                        ??i???m kh???i h??nh
                                      </label>
                                    </div>
                                    <div
                                      style={{
                                        width: "calc(100% - 153px)",
                                      }}
                                    >
                                      <Field
                                        isClearable={false}
                                        disable={!isAddMode}
                                        className="h-textbox"
                                        isLoading={
                                          stateAddress?.loading === "loaded"
                                            ? false
                                            : true
                                        }
                                        placeholder="Ch???n t???nh/th??nh ph???"
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
                                        ??i???m ?????n
                                      </label>
                                    </div>
                                    <div
                                      style={{
                                        width: "calc(100% - 153px)",
                                      }}
                                    >
                                      <Field
                                        isClearable={false}
                                        disable={!isAddMode}
                                        handleChange={async (e) => {
                                          try {
                                            let regionsTemp = 1;
                                            //#region  call d??? li???u
                                            if (e.value <= 25) {
                                              regionsTemp = 1;
                                            }
                                            if (e.value <= 44 && e.value > 25) {
                                              regionsTemp = 2;
                                            }
                                            if (e.value <= 63 && e.value > 44) {
                                              regionsTemp = 3;
                                            }
                                            //#endregion
                                            formikProps.setFieldValue(
                                              "Regions",
                                              regionsTemp
                                            );
                                            const params = {
                                              regions: regionsTemp,
                                            };
                                            await dispatch(
                                              Adm_GetProvinceByRegions(params)
                                            );
                                            await dispatch(
                                              Adm_GetTouristAttByRegions(params)
                                            );
                                          } catch (err) {
                                            console.log(err.error);
                                          }
                                        }}
                                        className="h-textbox"
                                        isLoading={
                                          stateAddress?.loading === "loaded"
                                            ? false
                                            : true
                                        }
                                        placeholder="Ch???n t???nh/th??nh ph???"
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
                                        Ng??y b???t ?????u
                                      </label>
                                    </div>
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
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
                                        Ng??y k???t th??c
                                      </label>
                                    </div>
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
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
                                <Col
                                  xl={6}
                                  lg={12}
                                  className={tourFamily ? "d-block" : "d-none"}
                                >
                                  <FormGroup style={styles}>
                                    <div style={{ width: "153px" }}>
                                      <label className="h-label h-lable-Obligatory">
                                        Nh??m kh??ch
                                      </label>
                                    </div>
                                    <div
                                      style={{ width: "calc(100% - 153px)" }}
                                    >
                                      <FastField
                                        type="number"
                                        name="GroupNumber"
                                        placeholder="S??? l?????ng kh??ch"
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
                                        {tourFamily
                                          ? "????n gi?? TB/kh??ch"
                                          : "????n gi?? ng?????i l???n"}
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
                                <Col
                                  xl={6}
                                  lg={12}
                                  className={tourFamily ? "d-none" : "d-block"}
                                >
                                  <FormGroup style={styles}>
                                    <div style={{ width: "153px" }}>
                                      <label className="h-label h-lable-Obligatory">
                                        ????n gi?? tr??? em
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
                                <Col
                                  xl={6}
                                  lg={12}
                                  className={tourFamily ? "d-none" : "d-block"}
                                >
                                  <FormGroup style={styles}>
                                    <div style={{ width: "153px" }}>
                                      <label className="h-label h-lable-Obligatory">
                                        ????n gi?? tr??? nh???
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
                                <Col xl={6} lg={12}>
                                  <FormGroup style={styles}>
                                    <div style={{ width: "153px" }}>
                                      <label className="h-label">
                                        Ph??? ph??(n???u c??)
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
                                        S??? l?????ng t???i ??a
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
                                        S??? l?????ng t???i thi???u
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
                                      S??? l?????ng hi???n t???i
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
                                    Tour ???????c Mytour ????? xu???t?
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
                            Th??ng tin HDV - DS ?????a ??i???m tham quan - L???ch tr??nh
                            b???i Mytour
                          </p>
                          <Row className="mt-2">
                            <Col xl={8} lg={12}>
                              <FormGroup style={styles}>
                                <div style={{ width: "153px" }}>
                                  <label className="h-label">
                                    H?????ng d???n vi??n
                                  </label>
                                </div>
                                <div style={{ width: "calc(100% - 153px)" }}>
                                  <div style={styles}>
                                    <div style={{ width: "calc(100% - 70px)" }}>
                                      <Field
                                        className="h-textbox"
                                        placeholder="Ch???n h?????ng d???n vi??n n???u c?? ho???c c???p nh???t sau"
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
                                      {" L???c "}
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
                                    V??ng mi???n
                                  </label>
                                </div>
                                <div style={{ width: "calc(100% - 153px)" }}>
                                  <Field
                                    isClearable={false}
                                    disable={true}
                                    className="h-textbox"
                                    placeholder="Ch???n V??ng mi???n"
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
                                    DS t???nh theo v??ng
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
                                    placeholder="H??? tr??? l???c ds ?????a ??i???m theo t???nh"
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
                                ?????a ??i???m du l???ch
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
                                placeholder="Ch???n ?????a ??i???m du l???ch"
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
                                <FcMindMap size={20} /> Generate L???ch tr??nh
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
                              Th??ng tin v???n chuy???n{""}
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
                                    Lo???i p/t di chuy???n
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
                                    placeholder="Vui l??ng ch???n"
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
                                    P/ti???n kh??? - h???i
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
                                    placeholder="Ch???n h??ng v???n chuy???n kh??? h???i"
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
                                    P/ti???n tham quan
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
                                    placeholder="Ch???n h??ng xe tham quan"
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
                              Th??ng tin kh??c
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
                                  Ghi ch?? cho tour n??y
                                </label>
                              </div>
                              <div style={{ width: "calc(100% - 153px)" }}>
                                <FastField
                                  className="h-editor form-control"
                                  name="NoteByTour"
                                  component={EditorField}
                                  placeholder="Vui l??ng nh???p ghi ch?? v?? format theo ????ng quy ?????nh!"
                                />
                              </div>
                            </FormGroup>
                            <FormGroup style={{ marginTop: "2px", ...styles }}>
                              <div style={{ width: "153px" }}>
                                <label className="h-label">
                                  ??i???u ki???n cho tour n??y
                                </label>
                              </div>
                              <div style={{ width: "calc(100% - 153px)" }}>
                                <FastField
                                  className="h-editor form-control"
                                  name="ConditionByTour"
                                  component={EditorField}
                                  placeholder="Vui l??ng nh???p ??i???u ki???n v?? format theo ????ng quy ?????nh!"
                                />
                              </div>
                            </FormGroup>
                            <FormGroup style={{ marginTop: "2px", ...styles }}>
                              <div style={{ width: "153px" }}>
                                <label className="h-label">L??u ??(n???u c??)</label>
                              </div>
                              <div style={{ width: "calc(100% - 153px)" }}>
                                <FastField
                                  className="h-editor form-control"
                                  name="NoteByMyTour"
                                  component={EditorField}
                                  placeholder="Vui l??ng nh???p l??u ?? v?? format theo ????ng quy ?????nh!"
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

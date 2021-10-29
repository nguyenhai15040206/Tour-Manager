import React from "react";
import Header from "../../../../../components/Header";
import Select from "react-select";
import "./styles.scss";
import { BsCalendarMinus } from "react-icons/bs";
import TourItem from "../TourItem";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineSearch,
} from "react-icons/ai";

function TourSearch(props) {
  const optionsTour = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const optionLocation = [
    { value: "hcm", label: "Hồ Chí Minh" },
    { value: "qn", label: "Quy Nhơn" },
    { value: "hn", label: "Hà Nội" },
  ];
  const filterMoney = [
    { value: "giathapdencao", label: "Giá thấp > cao" },
    { value: "giacaodenthap", label: "Giá cao > thấp" },
    { value: "giamgia", label: "Giảm giá nhiều nhất" },
  ];

  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      <main className="tour-search">
        <div className="container container-padding">
          <div className="row">
            <div className="col-md-3 col-12">
              <div className="tour-search__sidebar-inner">
                <div className="tour-search__filter-text px-3 py-2">
                  <h3>Lọc kết quả</h3>
                </div>
                <div className="tour-search__all-option-filter px-3 py-2 ">
                  <h2>Tất cả</h2>
                </div>
                <div className="px-3 py-4">
                  <div className="tour-search__kd-start-to-stop mb-5">
                    <h5 className="point-start-title s-title">
                      Loại hình tour
                    </h5>
                    <Select options={optionsTour} />
                  </div>
                  <div className="tour-search__kd-start-option-location mb-5">
                    <h5 className="point-start-title s-title">Điểm đi</h5>
                    <Select options={optionLocation} />
                  </div>
                  <div className="tour-search__kd-stop-option-location mb-5">
                    <h5 className="point-stop-title s-title">Điểm đến</h5>
                    <Select options={optionLocation} />
                  </div>
                  <div className="tour-search__kd-number-date-tour mb-5">
                    <h5 className="point-number-title s-title">Số ngày</h5>
                    <div className="button-group__number-date">
                      <button type="button" className="btn-option-date mb-3">
                        1-3 ngày
                      </button>
                      <button type="button" className="btn-option-date mb-3">
                        4-7 ngày
                      </button>
                      <button type="button" className="btn-option-date mb-3">
                        8-14 ngày
                      </button>
                      <button type="button" className="btn-option-date mb-3">
                        trên 14 ngày
                      </button>
                    </div>
                  </div>
                  <div className="tour-search__kd-date-start-calendar mb-5">
                    <h5 className="point-title-date-start s-title">Ngày đi</h5>
                    <div className="custom-calendar">
                      <BsCalendarMinus className="icon-calendar" />
                      <input
                        type="text"
                        autoComplete="off"
                        className="text-calendar"
                        placeholder="20/10/2020"
                        readOnly
                      ></input>
                    </div>
                  </div>
                  <div className="tour-search__kd-number-customers mb-5">
                    <h5 className="point-title-customer-number s-title">
                      Số người
                    </h5>
                    <div className="button-group__number-customer">
                      <button
                        type="button"
                        className="btn-option-number-customer mb-3"
                      >
                        1 người
                      </button>
                      <button
                        type="button"
                        className="btn-option-number-customer mb-3"
                      >
                        2 người
                      </button>
                      <button
                        type="button"
                        className="btn-option-number-customer mb-3"
                      >
                        3-5 người
                      </button>
                      <button
                        type="button"
                        className="btn-option-number-customer mb-3"
                      >
                        5+ người
                      </button>
                    </div>
                  </div>
                  <div className="tour-search__kd-transport-tour mb-5">
                    <h5 className="point-title-transport-tour s-title">
                      Thông tin vận chuyển
                    </h5>
                    <div className="button-group__number-customer">
                      <button className="btn-transport-tour">Máy bay</button>
                      <button className="btn-transport-tour">Ô tô</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 col-12">
              <div className="tour-search__kd-title mb-5">
                <h3 className="kd-title">
                  Danh sách tour du lịch khởi hành từ TP. Hồ Chí Minh
                </h3>
              </div>
              <hr />
              <div className="tour-search__kd-number-result-filter mb-5">
                <div className="tour-search__number-result">
                  <p className="title-result">
                    Chúng tôi tìm thấy{" "}
                    <span className="number-result">1,570</span> tour cho quý
                    khách
                  </p>
                </div>
                <div className="tour-search__filter">
                  <p>Sắp xếp theo</p>
                  <Select
                    className="select-filter"
                    options={filterMoney}
                  ></Select>
                </div>
              </div>
              <hr />
              <div className="row mb-5">
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
                <div className="col-4">
                  <TourItem
                    image="https://btnmt.1cdn.vn/2020/10/27/sls-nhung-dia-diem-chup-anh-cuoi-dep-o-ninh-binh-03_0.jpg"
                    assess="9,1"
                    comment="377"
                    date="03/11/2020"
                    numberDate="5N4Đ"
                    time="4:30"
                    nameTour="Tour Caravan - Miền Tây Sông Nước: Châu Đốc - Hà Tiên - Phú Quốc - Cần Thơ - Chương Trình Mới"
                    locationTour="TP. Hồ Chí Minh"
                    moneyTour="7,390,000"
                  ></TourItem>
                </div>
              </div>
              <div className="tour-search__kd-pagination mb-5">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <AiOutlineDoubleLeft />
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <AiOutlineDoubleRight />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tour-search__kd-popular-tour-find mb-5">
                <h3 className="title-find-tour-popular">
                  Các tour đang tìm phổ biến
                </h3>
                <div className="group-popular-tour">
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    hạ long
                  </button>
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    phan thiết
                  </button>
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    du lịch đà nẵng
                  </button>
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    vàm sát
                  </button>
                  <button className="group-item-tour-popular">
                    <AiOutlineSearch />
                    chuyến bay hồi hương
                  </button>
                </div>
              </div>
              <div className="tour-search__kd-location-Popularity mb-5">
                <h3 className="title-location-Popularity">
                  Các điểm đến ưa chuộng
                </h3>
                <div className="groups-Locations-Popularity">
                  <div className="group-name-img-Location-Popularity">
                    <img
                      className="img-location-popularity"
                      src="https://statics.vinpearl.com/dia-diem-du-lich-ha-long-6.jpg"
                      alt="not found"
                    ></img>
                    <h4 className="name-location-popularity">Hạ Long</h4>
                  </div>
                  <div className="group-name-img-Location-Popularity">
                    <img
                      className="img-location-popularity"
                      src="https://www.dalattrip.com/dulich/media/2017/12/thanh-pho-da-lat.jpg"
                      alt="not found"
                    ></img>
                    <h4 className="name-location-popularity">Đà Lạt</h4>
                  </div>
                  <div className="group-name-img-Location-Popularity">
                    <img
                      className="img-location-popularity"
                      src="https://cdnmedia.baotintuc.vn/Upload/3qVxwVtNEPp6Wp9kkF77g/files/2021/08/25/da-nang-250821.jpg"
                      alt="not found"
                    ></img>
                    <h4 className="name-location-popularity">Đà Nẵng</h4>
                  </div>
                  <div className="group-name-img-Location-Popularity">
                    <img
                      className="img-location-popularity"
                      src="https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng%206/Ng%C3%A0y_14/A09BE1E5-34C2-4286-8857-50921434EAF1.jpg"
                      alt="not found"
                    ></img>
                    <h4 className="name-location-popularity">Quy Nhơn</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

TourSearch.propTypes = {};

export default TourSearch;

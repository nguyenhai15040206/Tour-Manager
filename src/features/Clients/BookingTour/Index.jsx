import React from "react";
import "./styles.scss";

function BookingTour() {
  return (
    <>
      <section className="booking-tour">
        <div className="container">
          <div className="booking-tour__header">
            <div className="booking-tour__header--left">
              <img
                src="https://media.travel.com.vn/tour/tfd_210409053856_946989.jpg"
                alt="img"
              ></img>
            </div>
            <div className="booking-tour__header--right">
              <ul className="tour--assess">
                <span className="tour--radius">
                  4.61
                  <span></span>
                </span>

                <li>
                  <span>Rất tốt</span>
                </li>
                <li>370 Nhận xét </li>
                <li>|</li>
                <li>
                  Lượt đi <span>1,3k</span>
                </li>
              </ul>
              <h3>
                <span className="tour--title">
                  Hà Nội - Sapa - Hạ Long - Bái Đính - Tràng An - Tuyệt tình cốc
                  ( Tặng vé Tàu hỏa Mường Hoa) - Khách sạn 3*
                </span>
              </h3>
              <br />
              <ul className="tour--info">
                <span className="tour--info--ticket">
                  <span>
                    <i className="fas fa-tags"></i>
                  </span>
                  <li>NDBDI040-002-140521VN</li>
                </span>
                <li>
                  Khởi hành: <span>17/11/2021</span>
                </li>
                <li>
                  Thời gian: <span>1 ngày</span>
                </li>
                <li>
                  Nơi khởi hành: <span>Quy Nhơn</span>
                </li>
                <li>
                  Số chỗ còn nhận: <span>7</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="booking-tour__trip-overview">
            <div className="trip-overview__left">
              <h3>
                <span>Tổng quan về chuyến đi</span>
              </h3>
              <div className="customer-detail">
                <h2>Thông tin liên lạc</h2>
                <div className="card">
                  <div className="form">
                    <div className="form-group">
                      <label>
                        Họ và tên <span>*</span>
                      </label>
                      <br />
                      <input type="text" className="text-width"></input>
                    </div>
                    <div className="form-group">
                      <label>
                        Email <span>*</span>
                      </label>
                      <br />
                      <input type="text" className="text-width"></input>
                    </div>

                    <div className="form-group">
                      <label>
                        Số điện thoại <span>*</span>
                      </label>
                      <br />
                      <input type="text" className="text-width"></input>
                    </div>
                    <div className="form-group">
                      <label>
                        Địa chỉ <span>*</span>
                      </label>
                      <br />
                      <input type="text" className="text-width"></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="customer">
                <h2>
                  <span>Hành khách</span>
                </h2>
                <div className="customer-ticket">
                  <div className="customer-type">
                    <div className="customer-item">
                      <ul className="age-group">
                        <li>
                          <span>Người lớn</span>
                        </li>
                        <li> 12 tuổi trở lên</li>
                      </ul>
                      <div className="button-group">
                        <button type="button" className="button-radius">
                          <span>-</span>
                        </button>
                        <label>1</label>
                        <button type="button" className="button-radius">
                          <span>+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="customer-type">
                    <div className="customer-item">
                      <ul className="age-group">
                        <li>
                          <span>Trẻ em</span>
                        </li>
                        <li> Từ 5 - 11 tuổi</li>
                      </ul>
                      <div className="button-group">
                        <button type="button" className="button-radius">
                          <span>-</span>
                        </button>
                        <label>0</label>
                        <button type="button" className="button-radius">
                          <span>+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="customer-type">
                    <div className="customer-item">
                      <ul className="age-group">
                        <li>
                          <span>Trẻ nhỏ</span>
                        </li>
                        <li> Từ 2 - 4 tuổin</li>
                      </ul>
                      <div className="button-group">
                        <button type="button" className="button-radius">
                          <span>-</span>
                        </button>
                        <label>0</label>
                        <button type="button" className="button-radius">
                          <span>+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="customer-type">
                    <div className="customer-item">
                      <ul className="age-group">
                        <li>
                          <span>Em bé</span>
                        </li>
                        <li> Từ 0 - 2 tuổi</li>
                      </ul>
                      <div className="button-group">
                        <button type="button" className="button-radius">
                          <span>-</span>
                        </button>
                        <label>0</label>
                        <button type="button" className="button-radius">
                          <span>+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="regulation-age">
                <li>. Người lớn sinh từ <span>11/11/1951</span> đến <span>15/11/2009</span></li>
                <li>. Trẻ em sinh từ <span>16/11/2009</span> đến <span>15/11/2016</span></li>
                <li>. Trẻ nhỏ sinh từ <span>16/11/2016</span> đến <span>15/11/2019</span></li>
                <li>. Em bé sinh từ <span>16/11/2019</span> đến <span>15/11/2021</span></li>
              </ul>
            </div>
            <div className="trip-overview__right">
              <h1>Bạn cần hỗ trợ?</h1>
              <div className="group-button">
                <button className="custom-button">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <span>Gọi miễn phí</span> <span>qua internet</span>
                  </div>
                </button>
                <button className="custom-button-two">
                  <i className="far fa-envelope-open"></i>
                  <div>
                    <span>Gửi yêu cầu</span> <span>hỗ trợ ngay</span>
                  </div>
                </button>
              </div>
              <div className="ticket">
                <h1>Tóm tắt chuyến đi</h1>
                <h4>
                  Tour đặt trước<span>(8 khách)</span>
                </h4>
                <div className="header-ticket">
                  <img
                    src="https://media.travel.com.vn/tour/tfd_210409053856_946989.jpg"
                    alt="img"
                  ></img>
                  <div className="header-title">
                    Hà Nội - Sapa - Hạ Long - Bái Đính - Tràng An - Tuyệt tình
                    cốc ( Tặng vé Tàu hỏa Mường Hoa) - Khách sạn 3*
                  </div>
                </div>
                <div className="detail-trip-ticket">
                  <div className="detail-trip">
                    <div className="calendar-ticket">
                      <i className="far fa-calendar-minus"></i>
                      <div className="info-trip">
                        <span>Bắt đầu chuyến đi</span>
                        <h4>T4, 17 Tháng 11, 2021</h4>
                        <h2>Quy Nhơn</h2>
                      </div>
                    </div>
                    <div className="calendar-ticket">
                      <i className="far fa-calendar-minus"></i>
                      <div className="info-trip">
                        <span>Kết thúc chuyến đi</span>
                        <h4>T4, 17 Tháng 11, 2021</h4>
                        <h2>Quy Nhơn</h2>
                      </div>
                    </div>
                  </div>
                  <div className="detail-ticket">
                    <div className="row">
                      <h4>Hành khách</h4>
                      <i className="fas fa-users">
                        <label>1</label>
                      </i>
                    </div>
                    <div className="row">
                      <p>Người lớn</p>
                      <h4>1 x 8,680,000đ</h4>
                    </div>
                    <div className="row">
                      <p>Trẻ em</p>
                      <h4>0 x 4,340,000đ</h4>
                    </div>
                    <div className="row">
                      <p>Trẻ nhỏ</p>
                      <h4>0 x0đ</h4>
                    </div>
                    <div className="row">
                      <p>Em bé</p>
                      <h4>0 x0đ</h4>
                    </div>
                    <div className="row">
                      <h2>Phụ thu phòng riêng</h2>
                      <h4>0đ</h4>
                    </div>
                    <div className="row">
                      <h2>Mã giảm giá</h2>
                      <div className="button-group">
                        <button type="button" className="button-custom">
                          Thêm mã
                        </button>
                        <button type="button" className="button-custom2">
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="sum-money">
                    <div className="row">
                      <h1>Tổng cộng</h1>
                      <p>8,680,000đ</p>
                    </div>
                    <button className="button-custom">ĐẶT NGAY</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookingTour;

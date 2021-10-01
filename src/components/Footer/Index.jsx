import React from "react";
import "./styles.scss";

function Footer(props) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__register">
          <div className="promotion">
            <img
              src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_mail_red.svg"
              alt=""
            />
            <div className="content">
              <h6>Bạn muốn tiết kiệm tới 50% khi đặt khách sạn, vé máy bay</h6>
              <p>
                Nhập số điện thoại để Mytour có thể gửi đến bạn những chương
                trình khuyến mãi mới nhất!
              </p>
            </div>
          </div>
          <div className="form-register">
            <form className="form" action="">
              <div className="form--input">
                <input type="text" placeholder="Nhập số điện thoại" />
              </div>
              <div className="form--button">
                <button
                  onClick={(e) => {
                    scrollToTop(e);
                  }}
                >
                  Đăng kí
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="footer__content">
          <span>
            <img
              src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_mytour_blue_large.svg"
              alt=""
            />
          </span>
          <div className="content--info">
            <div className="desc">
              <h6>Công ty cổ phần du lịch Việt Nam VNTravel</h6>
              <p>Tổng đài chăm sóc: 1900 2083</p>
              <p>Email: hotro@mytour.vn</p>
              <p>
                Văn phòng Hà Nội: Tầng 11, Tòa Peakview, 36 Hoàng Cầu, Đống Đa
                Văn phòng HCM: Tầng 6, Tòa Nhà Central Park, 117 Nguyễn Du, Q.1
                Mytour Store: 168 Xã Đàn, Đống Đa, Hà Nội
              </p>
              <div className="image">
                <img
                  src="https://staticproxy.mytourcdn.com/0x0,q90/themes/images/logo-dathongbao-bocongthuong-w165.png"
                  alt=""
                />
                <img
                  src="https://staticproxy.mytourcdn.com/0x0,q90/themes/images/logo-congthuong-w165.png"
                  alt=""
                />
              </div>
            </div>
            <div className="policy">
              <h6>Chính sách & Quy định</h6>
              <a href="index.html">Chính sách và quy định chung</a>
              <a href="index.html">Quy định về thanh toán</a>
              <a href="index.html">Quy định về xác nhận thông tin đặt phòng</a>
              <a href="index.html">
                Chính sách về hủy đặt tour và hoàn trả tiền
              </a>
              <a href="index.html">Chính sách bảo mật thông tin</a>
              <a href="index.html">Quy trình giải quyết khiếu nại</a>
            </div>
            <div className="partner">
              <h6>Khách hàng & đối tác</h6>
              <a href="index.html">Tuyển dụng</a>
              <a href="index.html">Hợp tác</a>
              <a href="index.html">Liên hệ</a>
            </div>
          </div>
        </div>
        <div className="hr"></div>
        <div className="pos">
          <p>
            Mytour là thành viên của VNTravel Group - Một trong những tập đoàn
            đứng đầu Đông Nam Á về du lịch trực tuyến và các dịch vụ liên quan
          </p>
          <div className="image">
            <img
              src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_company_group.svg"
              alt=""
            />
          </div>
          <p>
            Copyright © 2020 - CÔNG TY CỔ PHẦN DU LỊCH VIỆT NAM VNTRAVEL - Đăng
            ký kinh doanh số 0108886908 - do Sở Kế hoạch và Đầu tư thành phố Hà
            Nội cấp lần đầu ngày 04 tháng 09 năm 2019
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

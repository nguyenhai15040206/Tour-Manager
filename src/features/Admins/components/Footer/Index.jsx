import React from "react";
import "./styles.scss";

function FooterAdmin(props) {
  return (
    <div className="footer-admin">
      <div className="hr"></div>
      <div className="footer-admin__pos">
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
          Copyright © 2020 - CÔNG TY CỔ PHẦN DU LỊCH VIỆT NAM VNTRAVEL - Đăng ký
          kinh doanh số 0108886908 - do Sở Kế hoạch và Đầu tư thành phố Hà Nội
          cấp lần đầu ngày 04 tháng 09 năm 2019
        </p>
      </div>
    </div>
  );
}

FooterAdmin.propTypes = {};

export default FooterAdmin;

import React from "react";
import PropTypes from "prop-types";

function AcceptBooking(props) {
  return (
    <>
      <h2>ĐIỀU KIỆN BÁN VÉ VÀ CÁC CHƯƠNG TRÌNH DU LỊCH CỦA MYTOUR</h2>
      <div className="accept-booking__item">
        <h2>I. Giá vé du lịch</h2>
        <p>
          - Giá vé du lịch được tính theo tiền Đồng (Việt Nam - VNĐ). Trường hợp
          khách thanh toán bằng USD sẽ được quy đổi ra VNĐ theo tỉ giá của ngân
          hàng Đầu Tư và Phát Triển Việt Nam - Chi nhánh TP.HCM tại thời điểm
          thanh toán.
        </p>
        <p>
          - Giá vé chỉ bao gồm những khoản được liệt kê một cách rõ ràng trong
          phần “Bao gồm” trong các chương trình du lịch. Vietravel không có
          nghĩa vụ thanh toán bất cứ chi phí nào không nằm trong phần “Bao gồm”.
        </p>
        <h2>II. GIÁ DÀNH CHO TRẺ EM</h2>
        <p>
          - Trẻ em dưới 5 tuổi: không thu phí dịch vụ, bố mẹ tự lo cho bé và
          thanh toán các chi phí phát sinh (đối với các dịch vụ tính phí theo
          chiều cao…). Hai người lớn chỉ được kèm 1 trẻ em dưới 5 tuổi, trẻ em
          thứ 2 sẽ đóng phí theo qui định dành cho độ tuổi từ 5 đến dưới 12 tuổi
          và phụ thu phòng đơn. Vé máy bay, tàu hỏa, phương tiện vận chuyển công
          cộng mua vé theo qui định của các đơn vị vận chuyển (nếu có)
        </p>
        <p>
          - Trẻ em từ 5 tuổi đến dưới 12 tuổi: 50% giá tour người lớn đối với
          tuyến xe, 75% giá tour người lớn đối với tuyến có vé máy bay (không có
          chế độ giường riêng). Hai người lớn chỉ được kèm 1 trẻ em từ 5 - dưới
          12 tuổi, em thứ hai trở lên phải mua 1 suất giường đơn.
        </p>
        <p>- Trẻ em từ 12 tuổi trở lên: mua một vé như người lớn.</p>
        <h2>III. THANH TOÁN</h2>
        <p>
          Khi thanh toán, Quý khách vui lòng cung cấp đầy đủ thông tin và đặt
          cọc ít nhất 50% tổng số tiền tour để giữ chỗ, số tiền còn lại Quý
          khách sẽ thanh toán trước ngày khởi hành 05 ngày làm việc (tour ngày
          thường) và trước 10 ngày làm việc (tour dịp Lễ, Tết)”.
        </p>
        <p>
          Thanh toán bằng tiền mặt hoặc chuyển khoản tới tài khoản ngân hàng của
          Vietravel.
        </p>
        <p>- Trẻ em từ 12 tuổi trở lên: mua một vé như người lớn.</p>
      </div>
    </>
  );
}

AcceptBooking.propTypes = {};

export default AcceptBooking;

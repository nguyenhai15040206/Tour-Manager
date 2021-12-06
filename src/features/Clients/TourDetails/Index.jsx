import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { formatCash } from "../../../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { Cli_GetTourDetailsByTourID } from "../../Admins/Slices/SliceTour";
import "./styles.scss";
import { Spinner } from "reactstrap";

function TourDetails(props) {
  //state
  const { Cli_TourDetails, loading } = useSelector((state) => state?.tour);
  // end state
  //
  const dispatch = useDispatch();
  let { tourID } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const fetchDataTourDetails = async () => {
      try {
        const params = {
          tourID: tourID,
        };
        await dispatch(Cli_GetTourDetailsByTourID(params));
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataTourDetails();
  }, [dispatch]);

  const changeDate = (number) => {
    if (Number.isInteger(number)) {
      if (number === 1) {
        return `${number} ngày`;
      }
      if (number > 1) {
        return `${number} ngày ${number - 1} đêm`;
      }
    }
    return `${number} ngày`;
  };
  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      {/* <Banner backgroundImage="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/01/anh1-17.png" /> */}
      {loading === "loading" && (
        <div className="cr-page-spinner">
          <Spinner color="primary" />
        </div>
      )}
      {loading === "loaded" && (
        <main className="tour-details">
          <div className="container">
            <section className="tour-details__header">
              <div className="tour-details__header--left">
                <div className="tour-id">
                  <i className="fab fa-staylinked"></i>
                  <label
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                  >{`${Cli_TourDetails.tourId}`}</label>
                </div>
                <h1 className="tour-name">
                  {/* Phan Thiết - Lâu Đài Rượu Vang - Bàu Trắng - Bảo Tàng Làng Chài
                Xưa */}
                  {Cli_TourDetails.tourName}
                </h1>
                <div className="short-rating">
                  <div className="s-rate">
                    <span>9.22</span>
                    <div className="s-comments">
                      <h4>Tuyệt với</h4>
                      <p>358 nhận xét</p>
                    </div>
                  </div>
                  <div className="sale-price">
                    <p>
                      {formatCash(`${Cli_TourDetails.adultUnitPrice}`) + "đ"}
                    </p>
                    <div className="saving"></div>
                  </div>
                </div>
              </div>
              <div className="tour-details__header--right">
                <div className="add-cart">
                  <Link to="/bookingtour" className="add-to-cart">
                    <i className="fas fa-shopping-cart"></i>
                    <label>Đặt ngay</label>
                  </Link>
                </div>
              </div>
            </section>
            <section className="tour-details__banner">
              <div className="banner__image--slider">
                <div className="slider">
                  <img
                    src="https://media.travel.com.vn/tour/tfd_210322111746_294581.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="banner__image--right">
                <div className="top">
                  <div className="top__left">
                    <img
                      src="https://media.travel.com.vn/tour/tfd_210322112302_685803.jpg"
                      alt=""
                    />
                  </div>
                  <div className="top__right">
                    <img
                      src="https://media.travel.com.vn/tour/tfd_210927032143_292540.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="bottom">
                  <img
                    src="https://media.travel.com.vn/destination/dc_200914_SAPA%20(10).jpg"
                    alt=""
                  />
                </div>
              </div>
            </section>
            <section className="tour-details__group-box">
              <div className="box-order">
                <div className="time">
                  <p>
                    Khời hành:{" "}
                    <b>{`${Cli_TourDetails.dateStart}`.slice(0, 10)}</b>
                  </p>
                  <p>
                    Thời gian: <b>{Cli_TourDetails.totalDay} ngày</b>
                  </p>
                  <p>
                    Nơi khởi hành: <b>{Cli_TourDetails.provinceName}</b>
                  </p>
                  <p>
                    Số chỗ còn nhận: <b>{Cli_TourDetails.quanity}</b>
                  </p>
                  <p>
                    HDV dẫn đoàn:{" "}
                    {Cli_TourDetails.touGuideName === null ? (
                      <b>Đang cập nhật</b>
                    ) : (
                      <b>{`${Cli_TourDetails.touGuideName}`}</b>
                    )}
                  </p>
                </div>
                <div className="calendar">
                  <div className="calendar__box">
                    <i className="far fa-calendar"></i>
                    <label>Ngày khác</label>
                  </div>
                </div>
              </div>
              <div className="group-services">
                <div className="group-services__item">
                  <i className="far fa-calendar"></i>
                  <label>Thời gian</label>
                  <p>{changeDate(Cli_TourDetails.totalDay)}</p>
                  {/* <p>3 ngày 2 đêm</p> */}
                </div>
                <div className="group-services__item">
                  <i className="fas fa-users"></i>
                  <label>Quy mô nhóm</label>
                  <p>20 người</p>
                </div>
                <div className="group-services__item">
                  <i className="fas fa-hotel"></i>
                  <label>Khách sạn</label>
                  <p>Chưa cập nhật</p>
                </div>

                <div className="group-services__item">
                  <i className="fas fa-map-marked-alt"></i>
                  <label>Địa điểm tham quan</label>
                  {Cli_TourDetails.tourDetails &&
                    Cli_TourDetails.tourDetails.map((item, index) => (
                      <p key={index}>{item.touristAttrName}</p>
                    ))}
                </div>
                <div className="group-services__item">
                  <i className="fas fa-truck"></i>
                  <label>Phương tiện di chuyển</label>
                  <p>{`${Cli_TourDetails.transport}`}</p>
                </div>
                <div className="group-services__item">
                  <i className="fab fa-d-and-d"></i>
                  <label>Dịch vụ đi kèm</label>
                  <p></p>
                </div>
              </div>
            </section>
            <div
              dangerouslySetInnerHTML={{ __html: Cli_TourDetails.schedule }}
            />
            <section className="tour-details__map-route">
              <h2 className="title">Bản đồ và lịch trình</h2>
              <div className="content">
                <ul className="timeline">
                  <li className="timeline__item">
                    <div className="timeline__item--tail"></div>
                    <div className="timeline__item--head timeline__item--head-blue"></div>
                    <div className="timeline__item--content">
                      <h5 className="title">
                        Ngày 1 - TP.HỒ CHÍ MINH - MŨI NÉ - LÂU ĐÀI RƯỢU VANG Số
                        bữa ăn: 03 (Ăn sáng, trưa, tối)
                      </h5>
                      <div className="details">
                        <p>
                          Quý khách tập trung tại Công ty Vietravel (190
                          Pasteur, Phường 6, Quận 3, TP.Hồ Chí Minh) khởi hành
                          đi Phan Thiết. Quý khách ăn sáng trên cung đường đi.
                          Đến Phan Thiết đoàn tham quan:
                        </p>
                        <p>
                          <strong>- Lâu đài Rượu Vang RD:</strong> nghe giới
                          thiệu về quy trình sản xuất, đóng chai và thưởng thức
                          một trong những loại rượu vang hảo hạng nổi tiếng thế
                          giới được xuất xứ từ Thung Lũng Napa (Mỹ).{" "}
                        </p>
                        <p>
                          <strong>- Bảo tàng Ngọc Trai Mũi Né:</strong> khu
                          trưng bày được giới thiệu một cách nghệ thuật và sang
                          trọng theo từng chủng loại, màu sắc và kích cỡ. Từ các
                          bộ sưu tập ngọc trai để nguyên cho đến các loại trang
                          sức đính ngọc trai như: vòng đeo cổ, mặt dây chuyền,
                          nhẫn, bông tai, lắc, đồng hồ đính ngọc trai….
                        </p>
                        <p>
                          Sau khi ăn tối, Quý khách tự do dạo phố khám phá Mũi
                          Né về đêm,…Nghỉ đêm tại Mũi Né.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline__item">
                    <div className="timeline__item--tail"></div>
                    <div className="timeline__item--head timeline__item--head-blue"></div>
                    <div className="timeline__item--content">
                      <h5 className="title">
                        Ngày 2 - MŨI NÉ - BÀU TRẮNG Số bữa ăn:02 (Ăn sáng, trưa)
                      </h5>
                      <div className="details">
                        <p>
                          Quý khách dùng bữa sáng tại khách sạn. Sau đó, đoàn đi
                          tham quan:
                        </p>
                        <p>
                          <strong>- Bàu Trắng:</strong> hay còn được gọi với cái
                          tên khác Bàu Sen bởi trong hồ khi vào mùa hè sen nở sẽ
                          rất đẹp, phủ kín cả một vùng hồ…. Quý khách dùng bữa
                          trưa. Chiều tự do nghỉ ngơi, tắm biển hồ bơi tại khách
                          sạn/resort,…hoặc xe đưa đoàn tham quan:
                        </p>
                        <p>
                          <strong>- Trung tâm Bùn Khoáng Mũi Né:</strong> Tận
                          hưởng cảm giác tắm khoáng thư giãn, ngoài ra Quý khách
                          còn có thể tắm bùn hoặc massage là một liệu pháp làm
                          đẹp từ thiên nhiên giúp cải thiện làn da tươi trẻ, mịn
                          màng (chi phí tự túc). Buổi tối, Quý khách tự do dạo
                          phố ăn chiều tự túc. Nghỉ đêm tại Mũi Né.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline__item">
                    <div className="timeline__item--tail"></div>
                    <div className="timeline__item--head timeline__item--head-blue"></div>
                    <div className="timeline__item--content">
                      <h5 className="title">
                        Ngày 3 - MŨI NÉ – LÀNG CHÀI XƯA – TP HỒ CHÍ MINH Số bữa
                        ăn:02 (Ăn sáng, trưa)
                      </h5>
                      <div className="details">
                        <p>
                          Quý khách dùng bữa sáng và tự do tắm biển. Đến giờ trả
                          phòng, đoàn đi tham quan:
                        </p>
                        <p>
                          <strong>- Làng Chài Xưa Mũi Né: </strong> với lịch sử
                          300 năm cái nôi của nghề làm nước mắm, trải nghiệm cảm
                          giác lao động trên đồng muối, đi trên con đường rạng
                          xưa, thăm phố cổ Phan Thiết, , thăm nhà lều của hàm hộ
                          nước mắm xưa, đắm chìm cảm xúc trong biển 3D và thích
                          thú khi đi chợ làng chài xưa với bàn tính tay, bàn cân
                          xưa thú vị,…
                        </p>
                        <p>
                          - Mua sắm đặc sản Phan Thiết sạch tại{" "}
                          <strong>Organik Farm - Hello Muine</strong> (chi phí
                          tự túc) - nước mắm rin nguyên chất, nước mắm Nhật
                          Shiitake, mực một nắng, khô cá dứa, nước cốt thanh
                          long… về làm quà cho người thân và bạn bè. Chiều đoàn
                          về đến TP.Hồ Chí Minh, xe đưa về điểm đón ban đầu.
                          Chia tay Quý khách và kết thúc chương trình du lịch.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline__item timeline__item--last">
                    <div className="timeline__item--tail"></div>
                    <div className="timeline__item--head timeline__item--head-blue"></div>
                    <div className="timeline__item--content"></div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}

TourDetails.propTypes = {};

export default TourDetails;

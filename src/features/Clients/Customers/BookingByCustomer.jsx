import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatCash } from "../../../utils/format";
import { Cli_GetDataBookingByCusomer } from "../../Admins/Slices/SliceBookingTour";
import BookingItem from "./BookingItem";

function BookingByCustomer(props) {
  const { dataBookingByCustomer } = useSelector((state) => state?.bookingTour);
  const dispatch = useDispatch();
  const { pID } = useParams();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const params = {
          customerId: pID,
        };
        console.log(params);
        await dispatch(Cli_GetDataBookingByCusomer(params));
      } catch (err) {
        console.log(err);
      }
    };
    fecthData();
  }, []);
  return (
    <>
      {dataBookingByCustomer.map((item, key) => (
        <BookingItem
          key={key}
          Image={`${item?.tourImg}`}
          DateStart={`${item?.dateStart}`}
          TourName={`${item?.tourName}`}
          BookingID={`${item?.bookingTourId}`}
          TotalDay={`${item?.totalDay}`}
          BookingDate={`${item?.bookingDate}`}
          status={
            item?.status == false
              ? item?.isDelete == false
                ? "Tour đã hủy vì quá hạn thanh toán"
                : "Chưa thanh toán"
              : "Đã thanh toán"
          }
          totalMoneyBooking={formatCash(`${item.totalMoney}`)}
        />
      ))}
    </>
  );
}

BookingByCustomer.propTypes = {};

export default BookingByCustomer;

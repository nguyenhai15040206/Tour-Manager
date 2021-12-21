import React from "react";
import ReViewItem from "../ReviewerItem/Index";
import "./styles.scss";

function ReviewerList(props) {
  return (
    <section className="review">
      <div className="container">
        <h3 className="review__title">Ý kiến khách hàng</h3>
        <h6>Phản hồi của khách hàng sau khi đi tour của Mytour</h6>
        <div className="review__list">
          <ReViewItem
            image="https://reduction-admin.github.io/react-reduction/static/media/100_4.978e51b5.jpg"
            title="Phản hồi của khách hàng điền hòa lộc tour đà lạt ngày 04/06/2020"
            name="Điền Hòa Lộc"
          />
          <ReViewItem
            image="https://reduction-admin.github.io/react-reduction/static/media/100_4.978e51b5.jpg"
            title="Phản hồi của khách hàng nguyễn văn nam và nguyễn đăng tường tour miền tây ngày 20/04/2020"
            name="Nguyễn Văn Nam"
          />
          <ReViewItem
            image="https://reduction-admin.github.io/react-reduction/static/media/100_4.978e51b5.jpg"
            title="Thư khen của khách hàng sam nguyen tour sing - malaysia cùng vietravel"
            name="Sam Nguyen"
          />
        </div>
      </div>
    </section>
  );
}

ReviewerList.propTypes = {};

export default ReviewerList;

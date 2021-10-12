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
            image="https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-9/176880266_1609953652536323_438876987912733542_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=CxZdg0FQ67MAX-FKQSI&_nc_ht=scontent-sin6-1.xx&oh=2b670188964a68281b8a394d5350eba8&oe=6179A23C"
            title="Phản hồi của khách hàng điền hòa lộc tour đà lạt ngày 04/06/2020"
            name="Điền Hòa Lộc"
          />
          <ReViewItem
            image="https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/175725617_2921699001442868_4294533732197647141_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=gCFnlnxk5NoAX8QACd8&_nc_ht=scontent-hkg4-2.xx&oh=1bd81cd8d531173cc9d43ff56e69e1a1&oe=617CB99C"
            title="Phản hồi của khách hàng nguyễn văn nam và nguyễn đăng tường tour miền tây ngày 20/04/2020"
            name="Nguyễn Văn Nam"
          />
          <ReViewItem
            image="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/152128000_2877427309203371_8747811503522828655_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=SB-ZzKafYQAAX_q6rQv&_nc_ht=scontent.fdad3-1.fna&oh=cd772ad476422ae8434ff3b5188bc9d3&oe=617BDCDB"
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

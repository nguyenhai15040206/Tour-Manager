import React from "react";
import { Container } from "reactstrap";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./styles.scss";

// Nguyễn Tấn Hải [24/10/2021] code dựng trang main
function MainLayout(props) {
  return (
    <>
      <main className="cr-app bg-light">
        <Sidebar />
        <Container fluid className="cr-content">
          <Header />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            quibusdam aperiam perferendis! Deserunt similique cupiditate unde
            fugit veritatis, possimus culpa consequuntur? Porro temporibus
            maiores doloribus cum a totam velit inventore!
          </div>
        </Container>
      </main>
    </>
  );
}

MainLayout.propTypes = {};

export default MainLayout;

import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";

function Login(props) {
  const { open, closedLogin } = props;

  const handleClickClosedLogin = ()=>{
    if(closedLogin){
      closedLogin();
    }
  }
  return (
    <div className={`modal ${open}`}>
      <div className="modal__overlay" onClick = {()=>{handleClickClosedLogin()}}></div>
      <div className="modal__login">
        <div className="btn-closed">
          <button onClick= {()=>{handleClickClosedLogin()}}>
            <span>
              <svg width="24" height="24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#1A202C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <h6 className="title">Đăng nhập</h6>
        <button className="btn facebook">
          <div className="btn__login">
            <svg width="36" height="36" fill="none">
              <path
                d="M18 28.542c5.822 0 10.542-4.72 10.542-10.542S23.822 7.458 18 7.458 7.458 12.178 7.458 18 12.178 28.542 18 28.542z"
                fill="#1877F2"
              ></path>
              <path
                d="M22.104 21.047L22.57 18h-2.924v-1.977c0-.834.409-1.647 1.718-1.647h1.33v-2.594a16.18 16.18 0 00-2.36-.206c-2.408 0-3.982 1.46-3.982 4.102V18h-2.677v3.047h2.677v7.366c1.091.171 2.203.171 3.294 0v-7.366h2.457z"
                fill="#fff"
              ></path>
            </svg>
            <span>Đăng nhập bằng Facebook</span>
          </div>
        </button>
        <button className="btn">
          <div className="btn__login">
            <svg width="36" height="36" fill="none">
              <path
                d="M18.498 11.795a6.17 6.17 0 013.983 1.454l3.12-2.972a10.485 10.485 0 00-16.507 3.062l3.519 2.712a6.211 6.211 0 015.885-4.256z"
                fill="#D94F3D"
              ></path>
              <path
                d="M12.295 17.998c0-.662.108-1.32.318-1.947l-3.519-2.712a10.467 10.467 0 000 9.318l3.519-2.712a6.174 6.174 0 01-.318-1.947z"
                fill="#F2C042"
              ></path>
              <path
                d="M28.567 16.09H18.546v4.294h5.678a5.119 5.119 0 01-2.173 2.94l3.49 2.692c2.232-2.002 3.542-5.258 3.026-9.927z"
                fill="#5085ED"
              ></path>
              <path
                d="M22.05 23.324a6.67 6.67 0 01-3.552.877 6.211 6.211 0 01-5.886-4.256l-3.518 2.712a10.51 10.51 0 009.404 5.84c2.573.07 5.081-.815 7.042-2.482l-3.49-2.69z"
                fill="#57A75C"
              ></path>
            </svg>
            <span>Đăng nhập bằng Google</span>
          </div>
        </button>
        <p>Hoặc đăng nhập bằng số điện thoại, email</p>
        <form className="form" action="">
          <div className="form--input">
            <input type="text" placeholder="Nhập số điện thoại hoặc email" />
          </div>
          <div className="form--input">
            <input type="password" placeholder="Mật khẩu" />
          </div>
          <button className="btn btn-login">Đăng nhập</button>
        </form>
        <div className="password-recovery">
          <button className="btn-password-recovery">
            <span>Khôi phục mật khẩu</span>
          </button>
        </div>
        <div className="register">
          <span>Chưa có tài khoản?</span>
          <button className="btn-password-recovery">
            <span>Khôi phục mật khẩu</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  open: PropTypes.string,
  closedLogin: PropTypes.func,
};

Login.defaultProps = {
  open: "",
  closedLogin: null
};

export default Login;

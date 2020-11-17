import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { USER_LOGIN } from "../../../Ultity/ConfigWeb";

export default function NavbarDangNhap() {
  return (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/DangKy">
          Đăng kí
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/DangNhap">
          Đăng nhập
        </NavLink>
      </li>
    </Fragment>
  );
}

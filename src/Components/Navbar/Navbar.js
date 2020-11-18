import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import logo from "../../Assets/img/logo@2x.png";
import { CaretDownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import NavbarDangNhap from "./NavbarDangNhap/NavbarDangNhap";
import NavbarNguoiDung from "./NavbarNguoiDung/NavbarNguoiDung";
import { USER_LOGIN, TOKEN } from "../../Ultity/ConfigWeb";
import { MenuOutlined } from "@ant-design/icons";
import { dangXuatTaiKhoanAction } from "../../redux/Actions/NguoiDungActions";
export default function Navbar() {
  const dispatch = useDispatch();
  const dangXuatTaiKhoan = () => {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(TOKEN);
    dispatch(dangXuatTaiKhoanAction());
  };
  let tenTaiKhoan = useSelector((state) => state.NguoiDungReducer.userLocal);
  return (
    <nav className="navbar navbar-expand-md container border-nav">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} className="img-fluid navbar-img" alt={logo} />
      </NavLink>
      {localStorage.getItem(USER_LOGIN) ? (
        <div
          className="navbar-toggler d-lg-none iconFlex"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="nguoidung-info_hinhAnh">
            {tenTaiKhoan.hoTen?.slice(0, 1).toUpperCase()}
          </div>
          <CaretDownOutlined />
        </div>
      ) : (
        <MenuOutlined
          className="navbar-toggler d-lg-none"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
      )}

      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {localStorage.getItem(USER_LOGIN) ? (
            <>
              <li className="nav-item d-lg-flex d-md-flex d-none active">
                <NavLink className="nav-link" to="/TatCaKhoaHoc">
                  Khóa học
                </NavLink>
              </li>
              <li className="nav-item d-lg-flex d-md-flex d-none">
                <NavLink className="nav-link" to="/TroGiup">
                  Trợ giúp
                </NavLink>
              </li>
              <li className="nav-item d-lg-none d-md-none d-flex active">
                <NavLink className="nav-link" to="/ThongTinTaiKhoan">
                  Thông tin tài khoản
                </NavLink>
              </li>
              {tenTaiKhoan.maLoaiNguoiDung === "GV" ? (
                <li className="nav-item d-lg-none d-md-none d-flex">
                  <NavLink to="/admin/nguoidungManager">
                    Quản lý người dùng
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item d-lg-none d-md-none d-flex">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={() => {
                    dangXuatTaiKhoan();
                  }}
                >
                  Đăng xuất
                </NavLink>
              </li>
              <NavbarNguoiDung />
            </>
          ) : (
            <>
              <li className="nav-item active">
                <NavLink className="nav-link" to="/TatCaKhoaHoc">
                  Khóa học
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/TroGiup">
                  Trợ giúp
                </NavLink>
              </li>
              <NavbarDangNhap />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

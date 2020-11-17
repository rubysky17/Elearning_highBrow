import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { USER_LOGIN, TOKEN } from "../../../Ultity/ConfigWeb";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { dangXuatTaiKhoanAction } from "../../../redux/Actions/NguoiDungActions";
export default function NavbarNguoiDung() {
  const dispatch = useDispatch();
  const dangXuatTaiKhoan = () => {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(TOKEN);
    dispatch(dangXuatTaiKhoanAction());
  };

  let tenTaiKhoan = useSelector((state) => state.NguoiDungReducer.userLocal);
  return (
    <>
      <li className="nav-item d-none d-lg-block d-md-block">
        <NavLink
          className="nav-link"
          to={localStorage.getItem(USER_LOGIN) ? "/ThongTinTaiKhoan" : "/"}
        >
          <div className="nguoidung-info">
            <div className="nguoidung-info_hinhAnh">
              {tenTaiKhoan.hoTen?.slice(0, 1).toUpperCase()}
            </div>
            <div className="nguoidung-info_ten">{tenTaiKhoan.taiKhoan}</div>
            <div className="option-nguoidung">
              <ul>
                <li>
                  <NavLink to="/ThongTinTaiKhoan">Thông tin tài khoản</NavLink>
                </li>
                <li>
                  <NavLink to="/ThongTinTaiKhoan">Khóa học của tôi</NavLink>
                </li>
                {tenTaiKhoan.maLoaiNguoiDung === "GV" ? (
                  <li>
                    <NavLink to="/admin/nguoidungManager">
                      Quản lý người dùng
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <NavLink to="/" onClick={() => dangXuatTaiKhoan()}>
                    Đăng xuất
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </NavLink>
      </li>
    </>
  );
}

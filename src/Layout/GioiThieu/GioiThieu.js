import React from "react";
import "./GioiThieu.css";
import { NavLink } from "react-router-dom";

export default function GioiThieu() {
  return (
    <div className="gioiThieu">
      <div className="gioiThieu_text">
        <p animate={{ x: 500 }} transition={{ ease: "easeOut", duration: 3 }}>
          Học điều mới mẻ mỗi ngày
        </p>
        <span className="d-lg-block d-sm-block d-none">
          Mỗi buổi sáng thức dậy, hãy thu nạp cho mình một kiến thức mới. Chọn
          hơn 300+ khóa học của chúng tôi.
        </span>
        <br />
        <div
          className="gioiThieu-btn"
          animate={{ y: 50 }}
          transition={{ ease: "easeOut", duration: 3 }}
        >
          <NavLink to="/tatCaKhoaHoc">TÌM KIẾM KHÓA HỌC</NavLink>
        </div>
      </div>
    </div>
  );
}

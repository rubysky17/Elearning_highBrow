import React from "react";
import { Input } from "antd";

import logo from "../../Assets/img/logo@2x.png";
import { NavLink } from "react-router-dom";
import "./Footer.css";
const { Search } = Input;
export default function Footer() {
  return (
    <footer>
      <div className="row footer">
        <div className="col-xl-3 col-md-4 footer-left">
          <img src={logo} alt={logo} />
          <p>
            HighBrow là nơi học lập trình.
            <br /> Các khoá học được đầu tư kỹ lưỡng từ nội dung tới chất lượng
            hình ảnh và âm thanh.
            <br />
            Học viên có thể học từ con số 0 tới khi trở thành lập trình viên
            chuyên nghiệp tại đây.
          </p>
        </div>
        <div className="col-xl-5 col-md-5 footer-middle">
          <div className="row">
            <div className="col-6">
              <p>HighBrow</p>
              <ul>
                <li>
                  <li>
                    <NavLink to="/trogiup">Giới thiệu</NavLink>
                  </li>
                </li>
                <li>
                  <NavLink to="/trogiup">Câu hỏi thường gặp</NavLink>
                  <li></li>
                </li>
                <li>
                  <NavLink to="/trogiup">Liên hệ</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <p>Hỗ trợ</p>
              <ul>
                <li>
                  <NavLink to="/trogiup">Trợ giúp</NavLink>
                </li>
                <li>
                  <li>
                    <NavLink to="/trogiup">Đóng góp</NavLink>
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-3 footer-right">
          <p>Theo dõi chúng tôi</p>
          <span>
            Nhập email để đăng ký nhận những thông tin hữu ích về học tập từ
            HighBrow
          </span>
          <br />
          <div className="footer-search d-lg-block d-sm-none d-none">
            <Search
              placeholder="Nhập Email của bạn..."
              enterButton="Đăng ký"
              size="large"
              onSearch={(value) => console.log(value)}
            />
          </div>
          <br />
        </div>
      </div>
      <div className="row footer-outro">
        <div className="footer-outro_text">
          <p>© 2020 HighBrow JSC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

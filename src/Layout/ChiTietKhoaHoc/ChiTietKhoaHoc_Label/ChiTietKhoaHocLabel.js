import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  layThongTinNguoiDungAction,
  huyDangKyKhoaHocAction,
  dangKyKhoaHocAction,
} from "../../../redux/Actions/NguoiDungActions";
import "./ChiTietKhoaHoc.Label.css";
import { Card, Button } from "antd";
import {
  VideoCameraOutlined,
  SnippetsOutlined,
  FolderOpenOutlined,
  ReloadOutlined,
  MobileOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { USER_LOGIN } from "../../../Ultity/ConfigWeb";

export default function ChiTietKhoaHocLabel(props) {
  let maKhoaHoc = props.maKhoaHoc;
  let chiTietKhoaHoc = props.chiTietKhoaHoc;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction(userNow.taiKhoan, maKhoaHoc));
  }, []);

  const dangKyKhoaHoc = (taiKhoan, maKhoaHoc) => {
    dispatch(dangKyKhoaHocAction(taiKhoan, maKhoaHoc, chiTietKhoaHoc));
  };
  const huyDangKyKhoaHoc = (taiKhoan, maKhoaHoc) => {
    dispatch(huyDangKyKhoaHocAction(taiKhoan, maKhoaHoc));
  };
  let userNow = useSelector((state) => state.NguoiDungReducer?.userLocal);

  let taiKhoanLocal = useSelector(
    (state) => state.NguoiDungReducer.thongTinTaiKhoan
  );
  let status = useSelector((state) => state.NguoiDungReducer.trangThaiKhoaHoc);
  return (
    <Card
      hoverable
      style={{ width: "90%" }}
      cover={<img src={props.chiTietKhoaHoc.hinhAnh} alt="example" />}
      className="label-img"
    >
      {localStorage.getItem(USER_LOGIN) ? (
        status === false ? (
          <Button
            className="label-button_add"
            type="primary"
            onClick={() => {
              {
                dangKyKhoaHoc(
                  taiKhoanLocal.taiKhoan,
                  props.chiTietKhoaHoc.maKhoaHoc
                );
              }
            }}
          >
            GHI DANH
          </Button>
        ) : (
          <Button
            className="label-button_add"
            type="danger"
            onClick={() => {
              {
                huyDangKyKhoaHoc(
                  taiKhoanLocal.taiKhoan,
                  props.chiTietKhoaHoc.maKhoaHoc
                );
              }
            }}
          >
            HỦY
          </Button>
        )
      ) : (
        <NavLink to="/dangnhap">
          <Button className="label-button_buy" type="default">
            Đăng nhập
          </Button>
        </NavLink>
      )}

      <div className="label-detail">
        <p>Khóa học này bao gồm: </p>
        <ul>
          <li>
            <span>
              <VideoCameraOutlined />
            </span>
            8.5 giờ học Video
          </li>
          <li>
            <span>
              <SnippetsOutlined />
            </span>
            26 Phần
          </li>
          <li>
            <span>
              <FolderOpenOutlined />
            </span>
            4 Nguồn download tài liệu
          </li>
          <li>
            <span>
              <ReloadOutlined />
            </span>
            Quyền truy cập cả đời
          </li>
          <li>
            <span>
              <MobileOutlined />
            </span>
            Phù hợp trên PC và mobile
          </li>
          <li>
            <span>
              <FireOutlined />
            </span>
            Cấp chứng chỉ khi hoàn thành khóa học
          </li>
        </ul>
      </div>
    </Card>
  );
}

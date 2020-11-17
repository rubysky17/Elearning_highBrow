import React from "react";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import "./ChiTietKhoaHoc.Intro.css";

import ava from "../../../Assets/img/joe-86x86.jpg";
import { ExclamationCircleOutlined, GlobalOutlined } from "@ant-design/icons";
import { Card } from "antd";

export default function ChiTietKhoaHocIntro(props) {
  let { chiTietKhoaHoc } = props;
  let { nguoiTao } = props;

  return (
    <div className="chitietkhoahoc-intro">
      <h1 className="intro-tenkhoahoc">{chiTietKhoaHoc.tenKhoaHoc}</h1>
      <p className="intro-mota">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        molestie in orci non tincidunt. Vestibulum venenatis velit non iaculis
        varius. Pellentesque molestie lacus eget lacus gravida pretium. Sed
        purus arcu, porta non pellentesque et, auctor eget magna.
      </p>
      <span className="intro-danhgia">
        <span className="intro-label">BestSeller</span>
        <Box component="fieldset" mt={1} borderColor="transparent">
          <Rating name="read-only" value={4} readOnly size="small" />
        </Box>
        <p>(10,462 Đánh giá) 159,854 học sinh</p>
      </span>
      <div className="intro-img">
        <img src={ava} alt={ava} />
        <span>
          Khóa học được tạo bởi{" "}
          <span className="intro-img_taikhoan">{nguoiTao.taiKhoan}</span>
        </span>
      </div>
      <div className="intro-date">
        <p>
          <ExclamationCircleOutlined />
          Ngày tạo : {chiTietKhoaHoc.ngayTao}
        </p>

        <p>
          <GlobalOutlined />
          Tiếng Việt
        </p>
      </div>
    </div>
  );
}

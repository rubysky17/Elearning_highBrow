import React from "react";
import "./Comment.css";

import CardComment from "./CardComment/CardComment";

const mangComment = [
  {
    hinhAnh: "../Assets/img/jessica-stroup-86x86.jpg",
    ten: "Jessica Stroup",
    ngheNghiep: "FrontEnd Developer",
    binhLuan:
      "Tôi rất thích học tại HighBrow, trang rất nhiều khóa học và đa dạng chủ đề. Mong trang web ngày càng phát triển.",
  },
  {
    hinhAnh: "../Assets/img/joe-86x86.jpg",
    ten: "Stephanie Busari",
    ngheNghiep: "Editor",
    binhLuan:
      "Kể từ ngày biết đến HighBrow, tôi điều học được những điều mới mẻ mỗi ngày. Cảm ơn HighBrow đã mang đến cho cộng đồng Developer những kiến thức bổ ích.",
  },
  {
    hinhAnh: "../Assets/img/stephanie-86x86.jpg",
    ten: "Joe Burridge",
    ngheNghiep: "Senior BackEnd Developer",
    binhLuan:
      "Tôi vừa hoàn thành khóa backend tại đây. Khóa học rất chi tiết và dễ hiểu. Cảm ơn HighBrow rất nhiều!",
  },
];

export default function Comment() {
  return (
    <div className="comment-component">
      <div className="row">
        <h2 className="mb-4">Nhận xét của học sinh</h2>
      </div>
      <div className="row">
        {mangComment.map((comment, index) => {
          return <CardComment key={index} comment={comment} className="mx-2" />;
        })}
      </div>
    </div>
  );
}

import React from "react";
import "./CardComment.css";

export default function CardComment(props) {
  return (
    <div className="col-lg-4 col-md-6 col-xs-6 col-12 comment-card">
      <div className="row comment-card_intro">
        <div className="col-xl-3 col-md-5 col-sm-5 col-5 comment-card_img">
          <img src={props.comment.hinhAnh} alt={props.comment.hinhAnh} />
        </div>
        <div className="col-xl-8 col-md-5 d-lg-block d-none comment-card_text">
          <p>{props.comment.ten}</p>
          <span>{props.comment.ngheNghiep}</span>
        </div>
      </div>
      <div className="row comment-card_comment">
        <p>{props.comment.binhLuan}</p>
      </div>
    </div>
  );
}

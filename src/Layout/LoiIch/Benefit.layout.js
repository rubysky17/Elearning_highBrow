import React, { useEffect } from "react";
import "./Benefit.layout.css";

//Image import
import benefit_icon1 from "../../Assets/img/icon_cup_5.2@2x.png";
import benefit_icon2 from "../../Assets/img/icon_email_1.1@2x.png";
import benefit_icon3 from "../../Assets/img/icon_time_3.2@2x.png";

import { motion, useViewportScroll, useTransform } from "framer-motion";
export default function Benefit() {
  return (
    <div className="container text-center my-5">
      <div className="benefits-intro">
        <p>
          Hơn 3,000+ Bài học. Hơn 100+ Chuyên gia. Hơn 400,000+ Học viên. Và hơn
          thế nữa.
        </p>
      </div>
      <div className="benefits-list" data-wow-delay="0.5s">
        <div className="row">
          <motion.div
            className="benefit-item col-lg-4 col-md-4 col-sm-4 col-12"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={benefit_icon1} alt={benefit_icon1} />
            <p>Hơn 100 chủ đề</p>
            <span>Chọn hơn 300+ chủ đề mà bạn muốn học</span>
          </motion.div>
          <motion.div
            className="benefit-item col-lg-4 col-md-4 col-sm-4 col-12"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={benefit_icon2} alt={benefit_icon1} />
            <p>Thông báo qua Email</p>
            <span>Khi có bài mới sẽ thông báo qua Email. Mỗi buổi sáng</span>
          </motion.div>
          <motion.div
            className="benefit-item col-lg-4 col-md-4 col-sm-4 col-12"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={benefit_icon3} alt={benefit_icon1} />
            <p>5 Phút mỗi ngày</p>
            <span>Đọc bài và trải nghiệm cốc cà phê, chỉ mất 5 phút</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

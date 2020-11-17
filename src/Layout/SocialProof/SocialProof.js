import React from "react";
import "./SocialProof.css";

import inc from "../../Assets/img/inc-01.png";
import lifehack from "../../Assets/img/lifehack-01.png";
import lifehacker from "../../Assets/img/lifehacker-01.png";
import nytime from "../../Assets/img/NY-times-01.png";
import time from "../../Assets/img/time-01.png";
import insider from "../../Assets/img/business-insider-01.png";
import Slider from "react-slick";

var mangHinhAnh = [inc, lifehack, lifehacker, nytime, time, insider];

export default function Socialproof() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="d-lg-block d-sm-none d-none social-proof ">
      <h3>Đồng hành cùng</h3>
      <Slider {...settings}>
        {mangHinhAnh.map((item, index) => {
          return (
            <div>
              <img src={item} alt={index} className="social-proof_img" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

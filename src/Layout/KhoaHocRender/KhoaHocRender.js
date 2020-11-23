import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { layKhoaHocTheoMucAction } from "../../redux/Actions/KhoaHocActions";
import Loading from "../../Components/Loading/Loading";
import CardKhoaHoc from "../../Layout/Card/CardKhoaHoc";

import { Carousel } from "antd";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

//import css
import "./KhoaHocRender.css";

export default function KhoaHocRender() {
  const dispatch = useDispatch();
  const [maDanhMuc, setmaDanhMuc] = useState("BackEnd");
  const [done, setdone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      dispatch(layKhoaHocTheoMucAction(maDanhMuc));
      setdone(true);
    }, 1000);
  }, [maDanhMuc]);
  //Lấy danh mục
  const danhMucKhoaHoc = useSelector(
    (state) => state.DanhMucReducer.danhMucKhoaHoc
  );
  //Lấy khóa học theo danh mục
  const danhSachKhoaHocTheoMuc = useSelector(
    (state) => state.DanhMucReducer.khoaHocTheoDanhMuc
  );

  const props = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    nextArrow: <ArrowForwardIosOutlinedIcon />,
    prevArrow: <ArrowBackIosOutlinedIcon />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h2 className="khoahocrender-title">Tùy chọn các khóa học</h2>
      <nav>
        <div
          className="nav nav-tabs khoaHocrender-navtab"
          id="nav-tab"
          role="tablist"
        >
          {danhMucKhoaHoc?.map((danhMuc, index) => {
            let active = index === 0 ? "active" : "";
            return (
              <p
                className={`nav-item nav-link ${active} khoaHocrender-select`}
                id="nav-home-tab"
                data-toggle="tab"
                href={`#${danhMuc.maDanhMuc}`}
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                key={index}
                onClick={() => {
                  setdone(undefined);
                  setmaDanhMuc(danhMuc.maDanhMuc);
                }}
              >
                {danhMuc.tenDanhMuc}
              </p>
            );
          })}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        {danhMucKhoaHoc?.map((danhMuc, index) => {
          let active = index === 0 ? "active" : "";
          return (
            <div
              className={`tab-pane ${active}`}
              id={`${danhMuc.maDanhMuc}`}
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              key={index}
            >
              {!done ? (
                <Loading />
              ) : (
                <>
                  {danhSachKhoaHocTheoMuc === null ? (
                    <div className="noCourse">Không có khóa học</div>
                  ) : (
                    <div>
                      <Carousel {...props}>
                        {danhSachKhoaHocTheoMuc.map((khoaHoc, index) => {
                          return (
                            <div className="cacKhoaHoc">
                              <CardKhoaHoc key={index} khoaHoc={khoaHoc} />
                            </div>
                          );
                        })}
                      </Carousel>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

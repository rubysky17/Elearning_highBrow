import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ChiTietKhoaHocDetail from "../../Layout/ChiTietKhoaHoc/ChiTietKhoaHoc_Detail/ChiTietKhoaHocDetail";
import ChiTietKhoaHocIntro from "../../Layout/ChiTietKhoaHoc/ChiTietKhoaHoc_Intro/ChiTietKhoaHocIntro";
import ChiTietKhoaHocLabel from "../../Layout/ChiTietKhoaHoc/ChiTietKhoaHoc_Label/ChiTietKhoaHocLabel";
import { layChiTietKhoaHocAction } from "../../redux/Actions/KhoaHocActions";

import "./ChiTietKhoaHoc.css";

export default function ChiTietKhoaHoc(props) {
  let { maKhoaHoc } = useParams();
  const chiTietKhoaHoc = useSelector(
    (state) => state.KhoaHocReducer.chiTietKhoaHoc
  );
  const nguoiTao = useSelector((state) => state.KhoaHocReducer.nguoiTao);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layChiTietKhoaHocAction(maKhoaHoc));
  }, []);
  return (
    <div className="container-fluid p-0">
      <div className="background-img_chiTietKhoaHoc">
        <div className="container chitietkhoahoc">
          <div className="row chitietkhoahoc_index">
            <div className="col-xl-7 col-lg-7 col-md-12">
              <ChiTietKhoaHocIntro
                chiTietKhoaHoc={chiTietKhoaHoc}
                nguoiTao={nguoiTao}
              />
            </div>
            <div className="col-xl-5 col-lg-5 col-md-8 col-sm-12">
              <ChiTietKhoaHocLabel
                chiTietKhoaHoc={chiTietKhoaHoc}
                maKhoaHoc={maKhoaHoc}
              />
            </div>
          </div>
        </div>
      </div>
      <ChiTietKhoaHocDetail />
    </div>
  );
}

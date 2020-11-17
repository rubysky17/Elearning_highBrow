import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
//Component import
import Comment from "../../Components/Comment/Comment";
//css
import "./Home.css";
//import Action Redux
import {
  layDanhMucKhoaHocAction,
  layDanhSachKhoaHocAction,
  layKhoaHocTheoMucAction,
} from "../../redux/Actions/KhoaHocActions";
import GioiThieu from "../../Layout/GioiThieu/GioiThieu";
import Socialproof from "../../Layout/SocialProof/SocialProof";
import Benefit from "../../Layout/LoiIch/Benefit.layout";
import KhoaHocRender from "../../Layout/KhoaHocRender/KhoaHocRender";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhMucKhoaHocAction());
    dispatch(layDanhSachKhoaHocAction());
  }, []);

  return (
    <div className="homeComponent">
      <GioiThieu />
      <Benefit />
      <KhoaHocRender />
      <Comment />
      <Socialproof />
    </div>
  );
}

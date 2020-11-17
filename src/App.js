import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "../src/Pages/Home/Home";
import TatCaKhoaHoc from "./Pages/TatCaKhoaHoc/TatCaKhoaHoc";
import { HomeTemplate } from "./Templates/HomeTemplate";
import { AdminTemplate } from "./Templates/AdminTemplate";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ChiTietKhoaHoc from "./Pages/ChiTietKhoaHoc/ChiTietKhoaHoc";
import DangKy from "./Pages/DangKy/DangKy";
import DangNhap from "./Pages/DangNhap/DangNhap";
import ThongTinTaiKhoan from "./Pages/ThongTinTaiKhoan/ThongTinTaiKhoan";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import NguoiDungManager from "./Pages/NguoiDungManager/NguoiDungManager";
import KhoaHocManager from "./Pages/KhoaHocManager/KhoaHocManager";
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <HomeTemplate exact path="/" Component={Home} />
          <HomeTemplate exact path="/TatCaKhoaHoc" Component={TatCaKhoaHoc} />
          <HomeTemplate
            exact
            path="/ChiTietKhoaHoc/:maKhoaHoc"
            Component={ChiTietKhoaHoc}
          />
          <HomeTemplate exact path="/DangKy" Component={DangKy} />
          <HomeTemplate exact path="/DangNhap" Component={DangNhap} />
          <HomeTemplate
            exact
            path="/ThongTinTaiKhoan"
            Component={ThongTinTaiKhoan}
          />
          <AdminTemplate
            path="/admin/NguoiDungManager"
            exact
            Component={NguoiDungManager}
          />
          <AdminTemplate
            path="/admin/KhoaHocManager"
            exact
            Component={KhoaHocManager}
          />
          <HomeTemplate exact="*" Component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;

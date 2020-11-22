import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Select } from "antd";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import swal from "sweetalert";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button1 from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  huyDangKyKhoaHocAction,
  layThongTinNguoiDungAction,
  nguoiDungChinhSuaAction,
} from "../../redux/Actions/NguoiDungActions";
import "./ThongTinTaiKhoan.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function ThongTinTaiKhoan() {
  // Lấy thông tin người dùng
  const dispatch = useDispatch();
  //useEffect gọi action lấy thông tin người dùng
  let userNow = useSelector((state) => state.NguoiDungReducer?.userLocal);
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction(userNow.taiKhoan));
  }, []);

  const [password, setpassword] = useState("");
  const [passwordChange1, setpasswordChange1] = useState("");
  const [passwordChange2, setpasswordChange2] = useState("");

  const [userChange, setUserChange] = useState({
    taiKhoan: userNow.taiKhoan,
    matKhau: "",
    hoTen: userNow.hoTen,
    soDT: userNow.soDT,
    maLoaiNguoiDung: userNow.maLoaiNguoiDung,
    maNhom: userNow.maNhom,
    email: userNow.email,
  });

  const history = useHistory();

  let mangKHGhiDanh = useSelector(
    (state) => state.NguoiDungReducer.mangKhoaHocGhiDanh
  );

  var thongTinTaiKhoan = useSelector(
    (state) => state.NguoiDungReducer.thongTinTaiKhoan
  );

  const handleChange = (e) => {
    let { value, name } = e.target;

    if (name === "matKhau") {
      setpassword(value);
    }
    if (name === "matKhauMoi1") {
      setpasswordChange1(value);
    }
    if (name === "matKhauMoi2") {
      setpasswordChange2(value);
    }
    setUserChange({
      ...userChange,
      [name]: value,
    });
  };
  const doiMatKhau = (matKhau) => {
    dispatch(nguoiDungChinhSuaAction(userChange, history, matKhau));
  };

  const handleSubmit = (e) => {
    dispatch(
      nguoiDungChinhSuaAction(userChange, history, thongTinTaiKhoan.matKhau)
    );
  };
  const handlePassword = () => {
    if (password === thongTinTaiKhoan.matKhau) {
      if (passwordChange1 == null || passwordChange1 == "") {
        swal("Thất bại", "Mật khẩu không được để trống", "warning");
      } else if (passwordChange2 == null || passwordChange2 == "") {
        swal("Thất bại", "Mật khẩu không được để trống", "warning");
      } else if (passwordChange1 === passwordChange2) {
        doiMatKhau(passwordChange2);
      } else {
        swal("Thất bại", "Mật khẩu không đúng", "warning");
      }
    } else {
      swal("Thất bại", "Mật khẩu cũ không đúng", "warning");
    }
  };
  const huyGhiDanhKhoaHoc = (taiKhoan, maKhoaHoc) => {
    dispatch(huyDangKyKhoaHocAction(taiKhoan, maKhoaHoc));
  };
  const { Option } = Select;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="thongtin_ava">
                {userNow.taiKhoan?.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="col-12">
              <div
                className="nav flex-column nav-pills mt-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active fs-link"
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  href="#thongtintaikhoan_tab"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Thông tin tài khoản
                </a>
                <a
                  className="nav-link fs-link"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  href="#v-pills-profile"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Các khóa học của tôi
                </a>
                <a
                  className="nav-link fs-link"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  href="#doimatkhau_tab"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Đổi mật khẩu
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 col-12">
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="thongtintaikhoan_tab"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <h2 className="thongtintaikhoan-title text-center">
                Thông tin tài khoản
              </h2>
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                size={"large"}
                onFinish={handleSubmit}
              >
                <Form.Item label="Tên tài khoản">
                  <Input
                    name="taiKhoan"
                    value={userChange.taiKhoan}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="Họ và tên">
                  <Input
                    name="hoTen"
                    value={userChange.hoTen}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  <Input
                    type="text"
                    name="soDT"
                    value={userChange.soDT}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    name="email"
                    value={userChange.email}
                    onChange={handleChange}
                  />
                </Form.Item>
                <div className="col-12 btn-thongtintaikhoan">
                  <Button htmlType="submit" type="primary" size={"large"}>
                    Xác nhận
                  </Button>
                </div>
              </Form>
            </div>
            <div
              className="tab-pane fade show"
              id="doimatkhau_tab"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <h2 className="thongtintaikhoan-title text-center">
                Đổi mật khẩu
              </h2>
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                size={"large"}
                onFinish={handlePassword}
              >
                <Form.Item label="Mật khẩu cũ">
                  <Input
                    type="password"
                    name="matKhau"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Mật khẩu mới">
                  <Input
                    type="password"
                    name="matKhauMoi1"
                    value={passwordChange1}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Nhập lại mật khẩu mới">
                  <Input
                    type="password"
                    name="matKhauMoi2"
                    value={passwordChange2}
                    onChange={handleChange}
                  />
                </Form.Item>
                {/* <Form.Item label="Mật khẩu">
                  <Input
                    type="password"
                    name="matKhau"
                    value={userChange.matKhau}
                    onChange={handleChange}
                  />
                </Form.Item> */}
                <div className="col-12 btn-thongtintaikhoan">
                  <Button htmlType="submit" type="primary" size={"large"}>
                    Đổi mật khẩu
                  </Button>
                </div>
              </Form>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <div className="row">
                <h2 className="thongtintaikhoan-title">Khóa học của bạn</h2>
                <Grid container spacing={3}>
                  {mangKHGhiDanh.length == 0 ? (
                    <div className="m-auto">
                      <h3 className="text-center lead">
                        Chưa đăng ký khóa học nào
                      </h3>
                      <NavLink
                        to="/tatcakhoahoc"
                        className="d-flex justify-content-center mt-5"
                      >
                        <button className="btn btn success">
                          Chọn khóa học
                        </button>
                      </NavLink>
                    </div>
                  ) : (
                    <>
                      {mangKHGhiDanh.map((khoaHoc, index) => {
                        return (
                          <Grid item sm={12} md={4} lg={4}>
                            <Card className={classes.root}>
                              <CardContent>
                                <Typography
                                  className={classes.title}
                                  color="textSecondary"
                                  gutterBottom
                                >
                                  Khóa học
                                </Typography>
                                <Typography variant="body2" component="p">
                                  {khoaHoc.tenKhoaHoc}
                                </Typography>
                                <Typography
                                  className={classes.pos}
                                  color="textSecondary"
                                >
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button1 size="small">
                                  <NavLink
                                    to={`/ChiTietKhoaHoc/${khoaHoc.maKhoaHoc}`}
                                  >
                                    Xem thêm
                                  </NavLink>
                                </Button1>
                                <Button1
                                  size="small"
                                  color="warning"
                                  onClick={() => {
                                    huyGhiDanhKhoaHoc(
                                      thongTinTaiKhoan.taiKhoan,
                                      khoaHoc.maKhoaHoc
                                    );
                                  }}
                                >
                                  Xóa khóa học
                                </Button1>
                              </CardActions>
                            </Card>
                          </Grid>
                        );
                      })}
                    </>
                  )}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";

import { NavLink, useHistory } from "react-router-dom";
import { nguoiDungDangKyAction } from "../../redux/Actions/NguoiDungActions";

// thư viện formik
import { withFormik, Form, Field } from "formik";
//Thư viện yub (validate form)
import * as Yup from "yup";

import "./DangKy.css";

function DangKy(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(nguoiDungDangKyAction(props.values, history));
  };
  return (
    <Form className="my-5" onSubmit={handleSubmit}>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={10} md={6} lg={3} xl={3}>
          <Typography variant="headline" gutterBottom className="form_title">
            Đăng ký và bắt đầu học
          </Typography>
          <FormControl
            fullWidth
            margin="normal"
            error={props.touched.taiKhoan && !!props.errors.taiKhoan}
          >
            <InputLabel>Tài khoản</InputLabel>
            <Field
              name="taiKhoan"
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  value={props.values.taiKhoan}
                  onChange={props.handleChange}
                />
              )}
            />
            {props.touched.taiKhoan && (
              <FormHelperText>{props.errors.taiKhoan}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={props.touched.hoTen && !!props.errors.hoTen}
          >
            <InputLabel>Họ tên</InputLabel>
            <Field
              name="hoTen"
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  name="hoTen"
                  value={props.values.hoTen}
                  onChange={props.handleChange}
                />
              )}
            />
            {props.touched.hoTen && (
              <FormHelperText>{props.errors.hoTen}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={props.touched.email && !!props.errors.email}
          >
            <InputLabel>Email</InputLabel>
            <Field
              name="email"
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  name="email"
                  value={props.values.email}
                  onChange={props.handleChange}
                />
              )}
            />
            {props.touched.email && (
              <FormHelperText>{props.errors.email}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={props.touched.matKhau && !!props.errors.matKhau}
          >
            <InputLabel>Mật khẩu</InputLabel>
            <Field
              name="matKhau"
              render={({ field }) => (
                <Input
                  fullWidth
                  type="password"
                  {...field}
                  name="matKhau"
                  value={props.values.matKhau}
                  onChange={props.handleChange}
                />
              )}
            />
            {props.touched.matKhau && (
              <FormHelperText>{props.errors.matKhau}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={props.touched.soDT && !!props.errors.soDT}
          >
            <InputLabel>Số điện thoại</InputLabel>
            <Field
              name="soDT"
              render={({ field }) => (
                <Input
                  fullWidth
                  type="phoneNumber"
                  {...field}
                  name="soDT"
                  value={props.values.soDT}
                  onChange={props.handleChange}
                />
              )}
            />
            {props.touched.soDT && (
              <FormHelperText>{props.errors.soDT}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <button className="btn btn-danger p-2" type="submit">
              Đăng ký
            </button>
          </FormControl>
          <p>
            Bạn đã có tài khoản? <NavLink to="/DangNhap">Đăng nhập</NavLink>
          </p>
        </Grid>
      </Grid>
    </Form>
  );
}
const FormikForm = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP12",
      email: "",
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    taiKhoan: Yup.string()
      .required("Tài khoản không được bỏ trống")
      .min(5, "Tài khoản có ít nhất 5 ký tự"),
    email: Yup.string()
      .required("Email không được bỏ trống")
      .email("Email không hợp lệ"),
    hoTen: Yup.string()
      .required("Họ tên không được bỏ trống")
      .min(8, "Họ tên có ít nhất 8 ký tự"),
    soDT: Yup.string().required("Số điện thoại không được bỏ trống"),
    matKhau: Yup.string()
      .required("Mật khẩu không được bỏ trống")
      .min(8, "Mật khẩu có ít nhất 8 ký tự"),
  }),
})(DangKy);

export default FormikForm;

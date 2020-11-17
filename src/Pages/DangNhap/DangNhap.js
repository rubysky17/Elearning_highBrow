import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";

import { withFormik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import { nguoiDungDangNhapAction } from "../../redux/Actions/NguoiDungActions";
import * as Yup from "yup";
function DangNhap(props) {
  let dispatch = useDispatch();
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(nguoiDungDangNhapAction(props.values, history));
  };

  return (
    <Form className="my-5" onSubmit={handleSubmit}>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={10} md={6} lg={3} xl={3}>
          <Typography variant="headline" gutterBottom className="form_title">
            Đăng nhập tài khoản HighBrow của bạn
          </Typography>
          <FormControl
            fullWidth
            margin="normal"
            error={props.touched.taiKhoan && !!props.errors.taiKhoan}
          >
            <InputLabel>Tên tài khoản</InputLabel>
            <Field
              render={({ field }) => (
                <Input
                  fullWidth
                  {...field}
                  onChange={props.handleChange}
                  name="taiKhoan"
                  value={props.values.taiKhoan}
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
            error={props.touched.matKhau && !!props.errors.matKhau}
          >
            <InputLabel>Mật khẩu</InputLabel>
            <Field
              render={({ field }) => (
                <Input
                  fullWidth
                  type="password"
                  {...field}
                  onChange={props.handleChange}
                  name="matKhau"
                  value={props.values.matKhau}
                />
              )}
            />
            {props.touched.matKhau && (
              <FormHelperText>{props.errors.matKhau}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <button className="btn btn-danger p-2" type="submit">
              Đăng Nhập
            </button>
          </FormControl>
          <p>
            Bạn chưa có tài khoản? <NavLink to="/DangKy">Đăng ký</NavLink>
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
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    taiKhoan: Yup.string()
      .required("Tài khoản không được bỏ trống")
      .min(5, "Tài khoản có ít nhất 5 ký tự"),
    matKhau: Yup.string()
      .required("Mật khẩu không được bỏ trống")
      .min(8, "Mật khẩu có ít nhất 8 ký tự"),
  }),
})(DangNhap);
export default FormikForm;

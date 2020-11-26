import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Modal
import { Modal } from "antd";
//Form
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
//Thư viện formik
import { withFormik, Form, Field } from "formik";
//Thư viện yub (validate form)
import * as Yup from "yup";

import { addUserAction, editUserAction } from "../../redux/Actions/AdminAction";

function ModalNguoiDung(props) {
  const dispatch = useDispatch();
  const { visible, handleCancel, setDone } = props;

  const resetForm = () => {
    props.values.taiKhoan = "";
    props.values.hoTen = "";
    props.values.soDT = "";
    props.values.matKhau = "";
    props.values.email = "";
    props.values.maLoaiNguoiDung = "";
  };
  const handleOk = (e) => {
    dispatch(addUserAction(props.values, setDone));
    resetForm();
    handleCancel();
  };
  return (
    <Modal
      title="Thêm người dùng"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Thêm"
      cancelText="Hủy bỏ"
    >
      <Form>
        <Grid container justify="center" alignContent="center">
          <Grid className="mr-3" item xs={5} md={5}>
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
          </Grid>

          <Grid item xs={5} md={5}>
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
          </Grid>
          <Grid item xs={10} md={10}>
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
          </Grid>
          <Grid item xs={10} md={10}>
            <FormControl
              fullWidth
              margin="normal"
              error={
                props.touched.maLoaiNguoiDung && !!props.errors.maLoaiNguoiDung
              }
            >
              <InputLabel>Chức danh</InputLabel>
              <Field
                render={({ field }) => (
                  <Select
                    displayEmpty
                    {...field}
                    name="maLoaiNguoiDung"
                    value={props.values.maLoaiNguoiDung}
                    onChange={props.handleChange}
                  >
                    <MenuItem value="HV">Học Viên</MenuItem>
                    <MenuItem value="GV">Giáo Vụ</MenuItem>
                  </Select>
                )}
              />
              {props.touched.maLoaiNguoiDung && (
                <FormHelperText>{props.errors.maLoaiNguoiDung}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Form>
    </Modal>
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
      maLoaiNguoiDung: "",
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    taiKhoan: Yup.string()
      .required("Không được bỏ trống")
      .min(5, "Có ít nhất 5 ký tự"),
    email: Yup.string().required("Không được bỏ trống").email("Không hợp lệ"),
    hoTen: Yup.string()
      .required("Không được bỏ trống")
      .min(8, "Có ít nhất 8 ký tự"),
    soDT: Yup.string().required("Không được bỏ trống"),
    matKhau: Yup.string()
      .required("Không được bỏ trống")
      .min(8, "Có ít nhất 8 ký tự"),
    maLoaiNguoiDung: Yup.string().required("Không được bỏ trống"),
  }),
})(ModalNguoiDung);

export default FormikForm;

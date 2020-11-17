import React, { useEffect, useState } from "react";
import SearchNguoiDung from "../../Components/SearchNguoiDung/SearchNguoiDung";
import { Table, Tag, Space } from "antd";
import "./NguoiDungManager.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../Assets/img/admin.png";
import { makeStyles } from "@material-ui/core/styles";
import TabNguoiDungModal from "../../Components/TabNguoiDungModal/TabNguoiDungModal";
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

import {
  deleteUserAction,
  layDanhSachNguoiDungAction,
  addUserAction,
  editUserAction,
} from "../../redux/Actions/AdminAction";
import "./NguoiDungManager.css";
import Loading from "../../Components/Loading/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function NguoiDungManager(props) {
  //Modal add user
  const [visible, setVisible] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [more, setMore] = React.useState(false);
  const showModal = (status, data) => {
    if (status === 1) {
      setVisible(true);
    } else if (status === 0) {
      setStatus(true);
    } else if (status === 2) {
      setMore(true);
      setDataModal(data);
    }
  };
  const resetForm = () => {
    props.values.taiKhoan = "";
    props.values.hoTen = "";
    props.values.soDT = "";
    props.values.matKhau = "";
    props.values.email = "";
    props.values.maNhom = "";
    props.values.maLoaiNguoiDung = "";
  };
  const handleOk = (e) => {
    addUser();
    resetForm();
  };
  const handleAccept = (e) => {
    editUser();
    resetForm();
  };
  const handleCancel = (e) => {
    setVisible(false);
    setStatus(false);
    setMore(false);
  };
  //---------------------------Reducer-------------------------------------//
  //Get user Info
  const nguoiDungInfo = useSelector(
    (state) => state.NguoiDungReducer.userLocal
  );
  // Get user List
  const danhSachNguoiDung = useSelector(
    (state) => state.AdminReducer.danhSachNguoiDung
  );
  // get user search
  const danhSachNguoiDungSearch = useSelector(
    (state) => state.AdminReducer.danhSachNguoiDungSearch
  );
  //creat Loading table
  const [done, setDone] = useState(undefined);
  //dispatch và useEffect
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(layDanhSachNguoiDungAction());
      setDone(true);
    }, 1800);
  }, [done]);
  const [dataModal, setDataModal] = useState(null);
  //data of table user
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (maLoaiNguoiDung) => (
        <>
          <Tag color={maLoaiNguoiDung === "HV" ? "red" : "green"}>
            {maLoaiNguoiDung}
          </Tag>
        </>
      ),
      filters: [
        {
          text: "Học viên",
          value: "HV",
        },
        {
          text: "Giáo vụ",
          value: "GV",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
    },
    // record.maLoaiNguoiDung.indexOf(value) === 0,
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            className="text-warning"
            onClick={() => {
              showModal(0, text);
            }}
          >
            Sửa
          </a>
          <a className="text-danger" onClick={() => deleteUser(text.taiKhoan)}>
            Xóa
          </a>
          <a
            className="text-primary"
            onClick={() => {
              showModal(2, text.taiKhoan);
            }}
          >
            Khóa học
          </a>
        </Space>
      ),
    },
  ];
  var data = danhSachNguoiDung;
  if (danhSachNguoiDungSearch === null) {
    data = danhSachNguoiDung;
  } else {
    data = danhSachNguoiDungSearch;
  }

  //------------------------------UserAction----------------------------------//
  //Delete User
  const deleteUser = (taiKhoan) => {
    dispatch(deleteUserAction(taiKhoan, setDone));
  };
  //Edit User
  const editUser = () => {
    dispatch(editUserAction(props.values, setDone));
  };
  //Add User
  const addUser = (e) => {
    dispatch(addUserAction(props.values, setDone));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-12 col-12 p-0 card_admin">
          <div className="logo_img">
            <img src={logo} alt="logo" className="img-fluid " />
          </div>
          <div className="admin_text">
            <p className="title d-lg-block d-md-none d-xs-none d-none">
              Thông tin tài khoản
            </p>
            <p>{nguoiDungInfo.taiKhoan}</p>
            <p className="d-lg-block d-md-none d-xs-none d-none">
              {nguoiDungInfo.email}
            </p>
            <p className="d-lg-block d-md-none d-xs-none d-none">
              {nguoiDungInfo.soDT}
            </p>
            <NavLink to="/" className="btnHome mb-md-5">
              Về trang chủ
            </NavLink>
          </div>
        </div>
        <div className="col-9 p-0 form_admin">
          <div className="row d-flex justify-content-center d-lg-flex d-md-none d-xs-none d-none">
            <div className="col-4 d-lg-block d-md-none d-xs-none d-none">
              <div className="bg-card bg-card1">
                <div className="bg-text">
                  <h3>45</h3>
                  <span>Bài giảng trực tuyến</span>
                </div>
              </div>
            </div>
            <div className="col-4 d-lg-block d-md-none d-xs-none d-none">
              <div className="bg-card bg-card2">
                <div className="bg-text">
                  <h3>100</h3>
                  <span>Giảng viên</span>
                </div>
              </div>
            </div>
            <div className="col-4 d-lg-block d-md-none d-xs-none d-none">
              <div className="bg-card bg-card3">
                <div className="bg-text">
                  <h3>5000+</h3>
                  <span>Học viên</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 justify-content-center">
            <div className="col-lg-10">
              <SearchNguoiDung loading={setDone} />
            </div>
            <div className="col-lg-2 justify-content-center d-flex">
              <button
                className="btnAddUser"
                onClick={() => {
                  showModal(1);
                }}
              >
                Thêm người dùng
              </button>
            </div>
          </div>
          <div className="row w-100 mt-4">
            {!done ? (
              <Loading />
            ) : (
              <Table
                columns={columns}
                dataSource={data}
                pagination={{
                  total: data?.length,
                  pageSize: 5,
                  hideOnSinglePage: true,
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Thêm người dùng"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <Form onSubmit={addUser}>
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
              <FormControl
                fullWidth
                margin="normal"
                error={props.touched.maNhom && !!props.errors.maNhom}
              >
                <InputLabel>Mã nhóm</InputLabel>
                <Field
                  render={({ field }) => (
                    <Select
                      displayEmpty
                      {...field}
                      name="maNhom"
                      value={props.values.maNhom}
                      onChange={props.handleChange}
                    >
                      <MenuItem value="GP01">GP01</MenuItem>
                      <MenuItem value="GP02">GP02</MenuItem>
                      <MenuItem value="GP03">GP03</MenuItem>
                    </Select>
                  )}
                />
                {props.touched.maNhom && (
                  <FormHelperText>{props.errors.maNhom}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={10} md={10}>
              <FormControl
                fullWidth
                margin="normal"
                error={
                  props.touched.maLoaiNguoiDung &&
                  !!props.errors.maLoaiNguoiDung
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
                  <FormHelperText>
                    {props.errors.maLoaiNguoiDung}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Form>
      </Modal>
      <Modal
        title="Sửa người dùng"
        visible={status}
        onOk={handleAccept}
        onCancel={handleCancel}
        okText="Sửa"
        cancelText="Hủy bỏ"
      >
        <Form onSubmit={editUser}>
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
              <FormControl
                fullWidth
                margin="normal"
                error={props.touched.maNhom && !!props.errors.maNhom}
              >
                <InputLabel>Mã nhóm</InputLabel>
                <Field
                  render={({ field }) => (
                    <Select
                      displayEmpty
                      {...field}
                      name="maNhom"
                      value={props.values.maNhom}
                      onChange={props.handleChange}
                    >
                      <MenuItem value="GP01">GP01</MenuItem>
                      <MenuItem value="GP02">GP02</MenuItem>
                      <MenuItem value="GP03">GP03</MenuItem>
                    </Select>
                  )}
                />
                {props.touched.maNhom && (
                  <FormHelperText>{props.errors.maNhom}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={10} md={10}>
              <FormControl
                fullWidth
                margin="normal"
                error={
                  props.touched.maLoaiNguoiDung &&
                  !!props.errors.maLoaiNguoiDung
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
                  <FormHelperText>
                    {props.errors.maLoaiNguoiDung}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Form>
      </Modal>
      <Modal
        title="Thông tin khóa học"
        visible={more}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
        cancelText="Hủy bỏ"
        className="modal_course"
      >
        <TabNguoiDungModal data={dataModal} />
      </Modal>
    </div>
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
      maNhom: "",
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
    maNhom: Yup.string().required("Không được bỏ trống"),
    maLoaiNguoiDung: Yup.string().required("Không được bỏ trống"),
  }),
})(NguoiDungManager);

export default FormikForm;

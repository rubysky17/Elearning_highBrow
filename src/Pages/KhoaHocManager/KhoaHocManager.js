import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
//IMG
import logo from "../../Assets/img/admin.png";

//Component
import Search from "../../Components/Search/Search";
import TabKhoaHocModal from "../../Components/TabKhoaHocModal/TabKhoaHocModal";
import ModalThemKhoaHoc from "../../Components/ModalThemKhoaHoc/ModalThemKhoaHoc";

//CSS
import "./KhoaHocManager.css";

//action reducer
import {
  layDanhMucKhoaHocAction,
  layDanhSachKhoaHocAction,
  deleteCourseAction,
} from "../../redux/Actions/KhoaHocActions";

//Modal for addding course
import ModalAddCourse from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

//table ant design
import { Table, Tag, Space } from "antd";
import { Modal } from "antd";
import Loading from "../../Components/Loading/Loading";

export default function KhoaHocManager() {
  const dispatch = useDispatch();
  const danhMucKhoaHoc = useSelector(
    (state) => state.DanhMucReducer.danhMucKhoaHoc
  );
  let khoaHocFilter = useSelector(
    (state) => state.KhoaHocReducer.khoaHocFilter
  );
  const danhSachKhoaHoc = useSelector(
    (state) => state.KhoaHocReducer.dsKhoaHoc
  );
  const infoUser = useSelector((state) => state.NguoiDungReducer.userLocal);
  //creat Loading table
  const [done, setDone] = useState(undefined);
  useEffect(() => {
    dispatch(layDanhMucKhoaHocAction());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(layDanhSachKhoaHocAction());
      setDone(true);
    }, 1800);
  }, [done]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // action--------------------------------------------------
  //delete
  const deleteCourse = (maKhoaHoc) => {
    dispatch(deleteCourseAction(maKhoaHoc, setDone));
  };
  //Edit course
  const [courseEdit, setcourseEdit] = useState(null);
  const editCourse = (khoaHoc) => {
    // console.log(khoaHoc);
    setOpen(true);
    settitle(false);
    setcourseEdit(khoaHoc);
  };

  // Add Course
  const addCourse = () => {
    setOpen(true);
    settitle(true);
  };
  //column and data table
  const columns = [
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      key: "hoTen",
      responsive: ["sm"],
      render: (nguoiTao) => (
        <>
          <p color={nguoiTao.hoTen}>{nguoiTao.hoTen}</p>
        </>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      responsive: ["lg"],
    },
    {
      title: "Danh mục",
      key: "danhMucKhoaHoc",
      dataIndex: "danhMucKhoaHoc",
      render: (danhMucKhoaHoc) => (
        <>
          <Tag>{danhMucKhoaHoc.maDanhMucKhoahoc}</Tag>
        </>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            className="text-warning"
            onClick={() => {
              editCourse(text);
            }}
          >
            Sửa
          </a>
          <a
            className="text-danger"
            onClick={() => {
              deleteCourse(text.maKhoaHoc);
            }}
          >
            Xóa
          </a>
          <a
            className="text-primary"
            onClick={() => {
              showModal(text.maKhoaHoc);
            }}
          >
            Người dùng
          </a>
        </Space>
      ),
    },
  ];
  var data = danhSachKhoaHoc;
  if (khoaHocFilter !== null) {
    data = khoaHocFilter;
  }
  const [more, setMore] = React.useState(false);
  const [dataModal, setDataModal] = useState(null);
  const showModal = (maKhoaHoc) => {
    setMore(true);
    setDataModal(maKhoaHoc);
  };
  const handleCancel = (e) => {
    setMore(false);
  };
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [title, settitle] = useState(true);
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
          <div className="bg-card bg-card1">
            <div className="bg-text">
              <h3>45</h3>
              <span>Bài giảng trực tuyến</span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
          <div className="bg-card bg-card2">
            <div className="bg-text">
              <h3>100</h3>
              <span>Giảng viên</span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
          <div className="bg-card bg-card3">
            <div className="bg-text">
              <h3>5000+</h3>
              <span>Học viên</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-10">
          <Search danhMucKhoaHoc={danhMucKhoaHoc} />
        </div>

        <div className="col-lg-2 justify-content-center d-flex">
          <button
            className="btnAddCourse"
            onClick={() => {
              addCourse();
            }}
          >
            Thêm khóa học
          </button>
          <ModalAddCourse
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <ModalThemKhoaHoc
                  title={title}
                  handleClose={handleClose}
                  taiKhoan={infoUser}
                  setDone={setDone}
                  khoaHoc={courseEdit}
                />
              </div>
            </Fade>
          </ModalAddCourse>
        </div>
      </div>

      <div>
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
        <Modal
          title="Thông tin khóa học"
          visible={more}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={handleCancel}
          cancelText="Hủy bỏ"
          className="modal_course"
        >
          <TabKhoaHocModal maKhoaHoc={dataModal} />
        </Modal>
      </div>
    </div>
  );
}

import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//import CSS
import "./ModalThemKhoaHoc.css";
//import form MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";

// dropzone
import { useDropzone } from "react-dropzone";
///import action
import {
  themKhoaHocAction,
  suaKhoaHocAction,
} from "../../redux/Actions/AdminAction";
//Styled component
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
  grid: {
    flexGrow: 1,
    width: "100",
  },
  gridItem: {
    margin: "15px 0",
    display: "flex",
    justifyContent: "center",
  },
  dropzone: {
    margin: "15px 0",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    margin: "5px 0",
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ModalThemKhoaHoc(props) {
  const dispatch = useDispatch();
  const title = props.title;
  const classes = useStyles();
  const khoaHoc = props.khoaHoc;
  const taiKhoan = props.taiKhoan;
  const setDone = props.setDone;

  const [thongTinKhoaHoc, setthongTinKhoaHoc] = useState({
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 200,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "GP12",
    ngayTao: "2014-08-18T21:11:54",
    maDanhMucKhoahoc: "",
    taiKhoanNguoiTao: taiKhoan.taiKhoan,
  });
  useEffect(() => {
    if (khoaHoc) {
      setthongTinKhoaHoc({
        maKhoaHoc: khoaHoc.maKhoaHoc,
        biDanh: khoaHoc.biDanh,
        tenKhoaHoc: khoaHoc.tenKhoaHoc,
        moTa: khoaHoc.moTa,
        luotXem: 200,
        danhGia: 0,
        hinhAnh: "",
        maNhom: "GP12",
        ngayTao: khoaHoc.ngayTao,
        maDanhMucKhoahoc: khoaHoc.maDanhMucKhoahoc,
        taiKhoanNguoiTao: taiKhoan.taiKhoan,
      });
    }

    if (title) {
      setthongTinKhoaHoc({
        maKhoaHoc: "",
        biDanh: "",
        tenKhoaHoc: "",
        moTa: "",
        luotXem: 200,
        danhGia: 0,
        hinhAnh: "",
        maNhom: "GP12",
        ngayTao: "2014-08-18T21:11:54",
        maDanhMucKhoahoc: "",
        taiKhoanNguoiTao: taiKhoan.taiKhoan,
      });
    }
  }, [khoaHoc]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "hinhAnh") {
      setthongTinKhoaHoc({
        ...thongTinKhoaHoc,
        hinhAnh: event.target.files[0],
      });
    } else if (name === "danhMucKhoaHoc") {
      setthongTinKhoaHoc({
        ...thongTinKhoaHoc,
        danhMucKhoaHoc: {
          maDanhMucKhoahoc: value[1],
          tenDanhMucKhoaHoc: value[0],
        },
      });
    } else {
      setthongTinKhoaHoc({
        ...thongTinKhoaHoc,
        [name]: value,
      });
    }
  };
  const handleClear = () => {
    setthongTinKhoaHoc({
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 200,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "GP12",
      ngayTao: "2014-08-18T21:11:54",
      maDanhMucKhoahoc: "",
      taiKhoanNguoiTao: taiKhoan.taiKhoan,
    });
    props.handleClose();
  };

  const handleSubmit = () => {
    if (title === true) {
      dispatch(themKhoaHocAction(thongTinKhoaHoc, setDone));
      handleClear();
    } else {
      dispatch(suaKhoaHocAction(thongTinKhoaHoc, setDone));
      handleClear();
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const imageUpload = acceptedFiles[0];
    setthongTinKhoaHoc({ hinhAnh: imageUpload });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //get danh mục khóa học về
  const danhMucKhoaHoc = useSelector(
    (state) => state.DanhMucReducer.danhMucKhoaHoc
  );
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container className={classes.grid} spacing={1}>
        <Grid item xs={12} className={classes.title}>
          <h3 className="text-center">
            {title ? "Thêm khóa học" : "Sửa khóa học"}
          </h3>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <TextField
            id="outlined-basic"
            label="Tên khóa học"
            variant="outlined"
            onChange={handleChange}
            name="tenKhoaHoc"
            value={thongTinKhoaHoc.tenKhoaHoc}
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <TextField
            id="outlined-basic"
            label="Mã Khóa học"
            variant="outlined"
            onChange={handleChange}
            name="maKhoaHoc"
            value={thongTinKhoaHoc.maKhoaHoc}
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Chọn danh mục
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="maDanhMucKhoahoc"
              onChange={handleChange}
              label="Chọn danh mục"
              value={thongTinKhoaHoc.maDanhMucKhoahoc}
            >
              {danhMucKhoaHoc.map((danhMuc, item) => {
                return (
                  <MenuItem value={danhMuc.maDanhMuc}>
                    {danhMuc.tenDanhMuc}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <TextField
            id="outlined-basic"
            label="Bí danh"
            variant="outlined"
            name="biDanh"
            onChange={handleChange}
            value={thongTinKhoaHoc.biDanh}
          />
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
          <TextField
            id="outlined-basic"
            label="Mô tả"
            variant="outlined"
            onChange={handleChange}
            name="moTa"
            value={thongTinKhoaHoc.moTa}
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <TextField
            id="outlined-basic"
            label="Lượt xem"
            variant="outlined"
            onChange={handleChange}
            name="luotXem"
            value={thongTinKhoaHoc.luotXem}
          />
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <TextField
            id="outlined-basic"
            label="Đánh giá"
            variant="outlined"
            onChange={handleChange}
            name="danhGia"
            value={+thongTinKhoaHoc.danhGia}
          />
        </Grid>
        <Grid item xs={12} className={classes.dropzone}>
          <div className="container">
            <h4 className="text-center">Upload hình ảnh</h4>
            <div className="dropzone_css">
              <CloudUploadOutlinedIcon />
              <input
                type="file"
                onChange={handleChange}
                name="hinhAnh"
                className="btn"
              />
              {isDragActive ? <p>Kéo thả file vào đây</p> : ""}
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            {title ? "Thêm khóa học" : "Sửa khóa học"}
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClear();
            }}
          >
            Thoát
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

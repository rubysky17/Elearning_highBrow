import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  huyDangKyKhoaHocAction,
  dangKyKhoaHocAction,
  ghiDanhKhoaHocAction,
} from "../../../redux/Actions/NguoiDungActions";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    margin: "20px",
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

export default function CardModalKhoaHoc(props) {
  let tenKhoaHoc = props.tenKhoaHoc;
  let maKhoaHoc = props.maKhoaHoc;
  let taiKhoan = props.taiKhoan;
  let type = props.type;
  let setDone = props.setDone;
  const classes = useStyles();
  const renderButtonType = (type, maKhoaHoc, taiKhoan) => {
    if (type === "chuaXetDuyet") {
      return (
        <Button
          size="small"
          onClick={() => {
            dangKyKhoaHoc(taiKhoan, maKhoaHoc);
            setDone(undefined);
          }}
        >
          Ghi danh
        </Button>
      );
    } else if (type === "daXetDuyet") {
      return (
        <Button
          size="small"
          onClick={() => {
            huyDangKyKhoaHoc(taiKhoan, maKhoaHoc);
            setDone(undefined);
          }}
        >
          Xóa khóa học{" "}
        </Button>
      );
    } else if (type === "choXetDuyet") {
      return (
        <div>
          <Button
            size="small"
            onClick={() => {
              huyDangKyKhoaHoc(taiKhoan, maKhoaHoc);
              setDone(undefined);
            }}
          >
            Hủy
          </Button>
          <Button
            size="small"
            onClick={() => {
              ghiDanhKhoaHoc(taiKhoan, maKhoaHoc);
              setDone(undefined);
            }}
          >
            Xác nhận
          </Button>
        </div>
      );
    }
  };

  const dispatch = useDispatch();
  const huyDangKyKhoaHoc = (taiKhoan, maKhoaHoc) => {
    dispatch(huyDangKyKhoaHocAction(taiKhoan, maKhoaHoc));
  };
  const dangKyKhoaHoc = (taiKhoan, maKhoaHoc, setDone) => {
    dispatch(dangKyKhoaHocAction(taiKhoan, maKhoaHoc, setDone));
  };
  const ghiDanhKhoaHoc = (taiKhoan, maKhoaHoc) => {
    dispatch(ghiDanhKhoaHocAction(taiKhoan, maKhoaHoc));
  };
  return (
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
          {tenKhoaHoc}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </Typography>
      </CardContent>
      <CardActions>{renderButtonType(type, maKhoaHoc, taiKhoan)}</CardActions>
    </Card>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./ButtonShouldLogin.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
export default function ButtonShouldLogin() {
  return (
    <NavLink to="/dangnhap">
      <Button variant="contained" color="secondary">
        Đăng nhập
      </Button>
    </NavLink>
  );
}

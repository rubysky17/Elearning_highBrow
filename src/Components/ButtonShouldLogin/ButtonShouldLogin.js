import React from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./ButtonShouldLogin.css";

export default function ButtonShouldLogin() {
  return (
    <NavLink to="/dangnhap">
      <Button variant="contained" color="secondary">
        Đăng nhập
      </Button>
    </NavLink>
  );
}

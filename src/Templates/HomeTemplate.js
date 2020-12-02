import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ThongTinTaiKhoan from "../Pages/ThongTinTaiKhoan/ThongTinTaiKhoan";

import { USER_LOGIN } from "../Ultity/ConfigWeb";

export const HomeTemplate = ({ Component, ...restProps }) => {
  const isLogin = localStorage.getItem(USER_LOGIN);
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        if (Component == ThongTinTaiKhoan) {
          if (isLogin === null) {
            return <Redirect to="/DangNhap" />;
          } else {
            return (
              <Fragment>
                <Navbar />
                <Component {...propsRoute} />
                <Footer />
              </Fragment>
            );
          }
        } else {
          return (
            <Fragment>
              <Navbar />
              <Component {...propsRoute} />
              <Footer />
            </Fragment>
          );
        }
      }}
    />
  );
};

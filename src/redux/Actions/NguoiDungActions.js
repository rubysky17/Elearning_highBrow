import axios from "axios";
import swal from "sweetalert";
import { DOMAIN, USER_LOGIN, TOKEN } from "../../Ultity/ConfigWeb";

export const nguoiDungDangKyAction = (userRegister, history) => {
  return async (dispatch) => {
    try {
      let { status } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/DangKy",
        method: "post",
        data: {
          taiKhoan: userRegister.taiKhoan,
          matKhau: userRegister.matKhau,
          email: userRegister.email,
          soDt: userRegister.soDT,
          maNhom: userRegister.maNhom,
          hoTen: userRegister.hoTen,
        },
      });
      if (status === 200) {
        swal("Thành công", "bạn đăng ký thành công", "success");
        history.push("/dangNhap");
      }
    } catch (err) {
      swal("Thất bại", "Đăng ký thất bại", "warning");
    }
  };
};

export const nguoiDungDangNhapAction = (userLogin, history) => {
  return async (dispatch) => {
    try {
      let { data, status } = await axios({
        url: DOMAIN + "/api/quanlynguoidung/dangnhap",
        method: "post",
        data: {
          taiKhoan: userLogin.taiKhoan,
          matKhau: userLogin.matKhau,
        },
      });
      if (status === 200) {
        //Sau khi gọi api => dispatch lên redux
        dispatch({
          type: "DANG_NHAP",
          userLogin: data,
        });
        //Lưu vào localstorage
        localStorage.setItem(USER_LOGIN, JSON.stringify(data));

        localStorage.setItem(TOKEN, data.accessToken);
        swal("Thành công", "bạn đăng nhập thành công", "success");
        history.push("/");
      }
    } catch (err) {
      swal("Thất bại", "Tài khoản hoặc mật khẩu không đúng", "warning");
    }
  };
};

export const dangXuatTaiKhoanAction = () => {
  return (dispatch) => {
    dispatch({
      type: "DANG_XUAT",
    });
    swal("Thành công", "Bạn đăng xuất thành công", "success");
  };
};
export const layThongTinNguoiDungAction = (taiKhoan, maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
        data: {
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { data, status } = res;
        if (status === 200) {
          dispatch({
            type: "THONG_TIN_TAI_KHOAN",
            userInfo: data,
            maKhoaHoc: maKhoaHoc,
          });
        }
      });
    } catch (error) {
      console.log("Lỗi");
    }
  };
};

export const nguoiDungChinhSuaAction = (userChange, history, matKhau) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "put",
        data: {
          taiKhoan: userChange.taiKhoan,
          matKhau: matKhau,
          email: userChange.email,
          soDT: userChange.soDT,
          maLoaiNguoiDung: userChange.maLoaiNguoiDung,
          maNhom: userChange.maNhom,
          hoTen: userChange.hoTen,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        //Sau khi gọi api => dispatch lên redux
        dispatch({
          type: "CAP_NHAT_NGUOI_DUNG",
          userChange: data,
        });
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        history.push("/");
        swal(
          "Thành công",
          "Bạn đã sửa thành công vui lòng đăng nhập lại",
          "success"
        );
      }
    } catch (err) {
      swal(
        "Thất bại",
        "Không thể sửa vui lòng thử lại khi đăng xuất",
        "warning"
      );
    }
  };
};
export const dangKyKhoaHocAction = (
  taiKhoan,
  maKhoaHoc,
  chiTietKhoaHoc,
  setDone
) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/DangKyKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: maKhoaHoc,
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { status } = res;
        if (status === 200) {
          swal("Thành công", "Đăng kí thành công", "success");
          dispatch({
            type: "GHI_DANH_KHOA_HOC",
            chiTietKhoaHoc: chiTietKhoaHoc,
          });
        }
      });
    } catch (error) {
      console.log("đăng ký thất bại");
    }
  };
};
export const huyDangKyKhoaHocAction = (taiKhoan, maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/HuyGhiDanh",
        method: "POST",
        data: {
          maKhoaHoc: maKhoaHoc,
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { status } = res;
        if (status === 200) {
          swal("Thành công", "Hủy đăng ký thành công", "success");
          dispatch({
            type: "HUY_GHI_DANH_KHOA_HOC",
            maKhoaHoc: maKhoaHoc,
          });
        }
      });
    } catch (error) {
      console.log("đăng ký thất bại");
    }
  };
};
export const ghiDanhKhoaHocAction = (taiKhoan, maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/GhiDanhKhoaHoc",
        method: "POST",
        data: {
          maKhoaHoc: maKhoaHoc,
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { status } = res;
        if (status === 200) {
          swal("Thành công", "Ghi danh thành công", "success");
          // dispatch({
          //   type: "GHI_DANH_KHOA_HOC",
          //   maKhoaHoc: maKhoaHoc,
          // });
        }
      });
    } catch (error) {
      console.log("đăng ký thất bại");
    }
  };
};

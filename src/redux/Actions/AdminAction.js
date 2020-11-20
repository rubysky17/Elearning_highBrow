// import constants
import {
  LAY_DANH_SACH_NGUOI_DUNG,
  SEARCH_USER,
  LAY_DS_KH_CHUA_XET_DUYET,
  LAY_DS_KH_DA_XET_DUYET,
  LAY_DS_KH_CHO_XET_DUYET,
  LAY_DS_HV_CHO_XET_DUYET,
  LAY_DS_HV_KHOA_HOC,
} from "../Constants/AdminConstants";
//import axios
import axios from "axios";
import { DOMAIN, USER_LOGIN } from "../../Ultity/ConfigWeb";

import swal from "sweetalert";

//export các action
export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    let { data } = await axios(
      DOMAIN + "api/QuanLyNguoiDung/LayDanhSachNguoiDung"
    );
    dispatch({
      type: LAY_DANH_SACH_NGUOI_DUNG,
      danhSachNguoiDung: data,
    });
  };
};

export const deleteUserAction = (TaiKhoan, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      swal({
        title: "Bạn chắc chứ?",
        text: "Người dùng đã xóa không thể khôi phục lại!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios({
            url:
              DOMAIN + `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => {
              let { data, status } = res;
              if (status === 200) {
                swal("Thành công", "Xóa thành công", "success");
                setDone(undefined);
              }
            })
            .catch((err) => {
              swal("Thất bại", "Không thể xóa người dùng này", "warning");
            });
        }
      });
    } catch (error) {
      console.log("error");
    }
  };
};

export const addUserAction = (userAdding, setDone) => {
  return async () => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));

      axios({
        url: DOMAIN + "api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: {
          taiKhoan: userAdding.taiKhoan,
          matKhau: userAdding.matKhau,
          email: userAdding.email,
          soDT: userAdding.soDT,
          maNhom: userAdding.maNhom,
          hoTen: userAdding.hoTen,
          maLoaiNguoiDung: userAdding.maLoaiNguoiDung,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { data, status } = res;
        if (status === 200) {
          swal("Thành công", "Thêm thành công", "success");
          setDone(undefined);
        }
      });
    } catch (error) {
      console.log("Thêm thất bại");
    }
  };
};

export const searchUserAction = (keyWord, setDone) => {
  return async (dispatch) => {
    if (keyWord == null || keyWord.trim() === "") {
      axios({
        url: DOMAIN + "api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        method: "get",
      })
        .then((res) => {
          let { data } = res;
          dispatch({
            type: LAY_DANH_SACH_NGUOI_DUNG,
            danhSachNguoiDung: data,
          });
          setDone(undefined);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyWord}`,
        method: "get",
      })
        .then((res) => {
          let { data } = res;
          dispatch({
            type: SEARCH_USER,
            listUserSearch: data,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
};

export const editUserAction = (userEdited, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url: DOMAIN + "api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "put",
        data: {
          taiKhoan: userEdited.taiKhoan,
          matKhau: userEdited.matKhau,
          email: userEdited.email,
          soDT: userEdited.soDT,
          maLoaiNguoiDung: userEdited.maLoaiNguoiDung,
          maNhom: userEdited.maNhom,
          hoTen: userEdited.hoTen,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        //Sau khi gọi api => dispatch lên redux
        // dispatch({
        //   type: "CAP_NHAT_NGUOI_DUNG",
        //   userChange: data,
        // });
        // localStorage.removeItem(USER_LOGIN);
        // localStorage.removeItem(TOKEN);
        // history.push("/");
        swal(
          "Thành công",
          "Bạn đã sửa thành công vui lòng đăng nhập lại",
          "success"
        );
        setDone(undefined);
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

export const layKhoaHocChuaGhiDanhAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`,
        method: "post",
        data: {
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: LAY_DS_KH_CHUA_XET_DUYET,
          khoaHoc: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const layKhoaHocChoXetDuyetAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet?TaiKhoan=${taiKhoan}`,
        method: "post",
        data: {
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: LAY_DS_KH_CHO_XET_DUYET,
          khoaHoc: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const layKhoaHocDaXetDuyetAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet?TaiKhoan=${taiKhoan}`,
        method: "post",
        data: {
          taiKhoan: taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: LAY_DS_KH_DA_XET_DUYET,
          khoaHoc: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const layDanhSachHocVienChoXetDuyetAction = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet?MaKhoaHoc=${maKhoaHoc}`,
        method: "post",
        data: {
          maKhoaHoc: maKhoaHoc,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: LAY_DS_HV_CHO_XET_DUYET,
          hocVien: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const layDanhSachHocVienKhoaHocAction = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url:
          DOMAIN +
          `api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,
        method: "post",
        data: {
          maKhoaHoc: maKhoaHoc,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        dispatch({
          type: LAY_DS_HV_KHOA_HOC,
          hocVien: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const themKhoaHocUploadHinhAction = (form_data) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh",
        method: "post",
        data: form_data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        swal("Thành công", "Thêm thành công", "success");
        console.log(data);
      }
    } catch (error) {
      swal("Thất bại", "Không thể thêm khóa học", "warning");
      console.log(error.message);
    }
  };
};

export const themKhoaHocAction = (thongTinKhoaHoc) => {
  return async () => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      axios({
        url: DOMAIN + "api/QuanLyKhoaHoc/ThemKhoaHoc",
        method: "POST",
        data: thongTinKhoaHoc,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { data, status } = res;
        var form_data = new FormData();
        for (var key in thongTinKhoaHoc) {
          form_data.append(key, thongTinKhoaHoc[key]);
        }
        console.log("thành công");
        axios({
          url: DOMAIN + "api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
          method: "POST",
          data: form_data,
        })
          .then((res) => {
            swal("Thành công", "Thêm thành công", "success");
            console.log(res.data);
          })
          .catch((err) => {
            swal("Thất bại", "Thêm thất bại", "warning");
            console.log(err.message);
          });
      });
    } catch (error) {
      console.log(error.message);
      console.log("Thêm thất bại");
    }
  };
};

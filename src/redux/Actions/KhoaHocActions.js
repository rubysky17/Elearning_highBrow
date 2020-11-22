import {
  LAY_DANH_MUC_KHOA_HOC,
  LAY_DANH_SACH,
  LAY_CHI_TIET_KHOA_HOC,
  LAY_KHOA_HOC_THEO_MUC,
  LAY_KHOA_HOC_THEO_SEARCH,
} from "../Constants/KhoaHocConstants";
import { DOMAIN, USER_LOGIN } from "../../Ultity/ConfigWeb";

import axios from "axios";

import swal from "sweetalert";
export const layDanhMucKhoaHocAction = () => {
  return async (dispatch) => {
    let { data } = await axios(
      "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc"
    );
    dispatch({
      type: LAY_DANH_MUC_KHOA_HOC,
      danhMucKhoaHoc: data,
    });
  };
};

export const layDanhSachKhoaHocAction = () => {
  return async (dispatch) => {
    let { data } = await axios(
      "https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP12"
    );
    dispatch({
      type: LAY_DANH_SACH,
      dsKhoaHoc: data,
    });
  };
};

export const layChiTietKhoaHocAction = (maKhoaHoc) => {
  return async (dispatch) => {
    let { data } = await axios.get(
      `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
    );
    dispatch({
      type: LAY_CHI_TIET_KHOA_HOC,
      chiTietKhoaHoc: data,
    });
  };
};
export const layKhoaHocTheoMucAction = (maDanhMuc, setDone) => {
  return (dispatch) => {
    try {
      axios({
        url:
          DOMAIN +
          `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP12`,
        method: "get",
      })
        .then((res) => {
          dispatch({
            type: LAY_KHOA_HOC_THEO_MUC,
            khoaHocTheoDanhMuc: res.data,
          });
        })
        .catch((err) =>
          dispatch({
            type: LAY_KHOA_HOC_THEO_MUC,
            khoaHocTheoDanhMuc: null,
          })
        );
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
export const layKhoaHocTheoSearchAction = (maDanhMuc, setDone) => {
  return (dispatch) => {
    try {
      axios({
        url:
          DOMAIN +
          `/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP12`,
        method: "get",
      })
        .then((res) => {
          dispatch({
            type: LAY_KHOA_HOC_THEO_SEARCH,
            khoaHocTheoDanhMuc: res.data,
          });
        })
        .catch((err) =>
          dispatch({
            type: LAY_KHOA_HOC_THEO_SEARCH,
            khoaHocTheoDanhMuc: null,
          })
        );
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const khoaHocSearchAction = (tuKhoa) => {
  return (dispatch) => {
    dispatch({
      type: "LAY_KHOA_HOC_SEARCH",
      keyWord: tuKhoa,
    });
  };
};
export const deleteCourseAction = (maKhoaHoc, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      swal({
        title: "Bạn chắc chứ?",
        text: "Khóa học này xóa không thể khôi phục lại!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios({
            url: DOMAIN + `api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => {
              let { status } = res;
              if (status === 200) {
                swal("Thành công", "Xóa thành công", "success");
              }
              layDanhSachKhoaHocAction();
              setDone(undefined);
            })
            .catch((err) => {
              swal("Thất bại", "Không thể xóa khóa học này", "warning");
            });
        }
      });
    } catch (error) {
      console.log("error");
    }
  };
};

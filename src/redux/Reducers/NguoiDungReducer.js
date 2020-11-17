import { USER_LOGIN } from "../../Ultity/ConfigWeb";

let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLocal: userLogin,
  thongTinTaiKhoan: {},
  thongTinKhoaHoc: {},
  mangKhoaHocGhiDanh: [],
  trangThaiKhoaHoc: null,
};

export const NguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DANG_NHAP": {
      state.userLocal = action.userLogin;
      return { ...state };
    }

    case "DANG_XUAT": {
      state.userLocal = {};
      return { ...state };
    }
    case "CAP_NHAT_NGUOI_DUNG": {
      state.userLocal = action.userChange;
      return { ...state };
    }

    case "THONG_TIN_TAI_KHOAN": {
      state.thongTinTaiKhoan = action.userInfo;
      state.mangKhoaHocGhiDanh = action.userInfo.chiTietKhoaHocGhiDanh;
      let index = state.mangKhoaHocGhiDanh.findIndex(
        (kh) => kh.maKhoaHoc === action.maKhoaHoc
      );
      if (index !== -1) {
        state.trangThaiKhoaHoc = true;
      } else {
        state.trangThaiKhoaHoc = false;
      }
      return { ...state };
    }

    case "GHI_DANH_KHOA_HOC": {
      state.trangThaiKhoaHoc = !state.trangThaiKhoaHoc;
      state.thongTinKhoaHoc = action.chiTietKhoaHoc;
      let mangKhoaHocMoi = [...state.mangKhoaHocGhiDanh];
      mangKhoaHocMoi.push(state.thongTinKhoaHoc);
      state.mangKhoaHocGhiDanh = mangKhoaHocMoi;
      return { ...state };
    }
    case "HUY_GHI_DANH_KHOA_HOC": {
      state.trangThaiKhoaHoc = !state.trangThaiKhoaHoc;
      let mangKHMoi = [...state.mangKhoaHocGhiDanh];
      if (mangKHMoi !== null) {
        let index = mangKHMoi.findIndex(
          (kh) => kh?.maKhoaHoc === action.maKhoaHoc
        );
        if (index !== -1) {
          mangKHMoi.splice(index, 1);
        }
      }
      state.mangKhoaHocGhiDanh = mangKHMoi;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

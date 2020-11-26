// import constants
import {
  LAY_DANH_SACH_NGUOI_DUNG,
  SEARCH_USER,
  LAY_DS_KH_CHO_XET_DUYET,
  LAY_DS_KH_DA_XET_DUYET,
  LAY_DS_KH_CHUA_XET_DUYET,
  LAY_DS_HV_CHO_XET_DUYET,
  LAY_DS_HV_KHOA_HOC,
} from "../Constants/AdminConstants";

//tạo initialState
const initialState = {
  danhSachNguoiDung: [],
  danhSachNguoiDungRender: [],
  danhSachNguoiDungSearch: null,

  danhSachKhoaHocChoXetDuyet: null,
  danhSachKhoaHocDaXetDuyet: null,
  danhSachKhoaHocChuaXetDuyet: null,

  danhSachHocVienKhoaHoc: null,
  danhSachHocVienChoXetDuyet: null,
};
// Xuất reducer
export const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_NGUOI_DUNG: {
      state.danhSachNguoiDung = action.danhSachNguoiDung;
      state.danhSachNguoiDungSearch = null;
      return { ...state };
    }
    case SEARCH_USER: {
      state.danhSachNguoiDungSearch = action.listUserSearch;
      return { ...state };
    }
    case LAY_DS_KH_CHO_XET_DUYET: {
      state.danhSachKhoaHocChoXetDuyet = action.khoaHoc;
      return { ...state };
    }
    case LAY_DS_KH_DA_XET_DUYET: {
      state.danhSachKhoaHocDaXetDuyet = action.khoaHoc;
      return { ...state };
    }
    case LAY_DS_KH_CHUA_XET_DUYET: {
      state.danhSachKhoaHocChuaXetDuyet = action.khoaHoc;
      return { ...state };
    }
    case LAY_DS_HV_CHO_XET_DUYET: {
      state.danhSachHocVienChoXetDuyet = action.hocVien;
      return { ...state };
    }
    case LAY_DS_HV_KHOA_HOC: {
      state.danhSachHocVienKhoaHoc = action.hocVien;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

import {
  LAY_DANH_SACH,
  LAY_CHI_TIET_KHOA_HOC,
  LAY_KHOA_HOC_THEO_SEARCH,
} from "../Constants/KhoaHocConstants";
const initialState = {
  dsKhoaHoc: [],

  chiTietKhoaHoc: {},

  nguoiTao: {},

  khoaHocChoXetDuyet: [],

  khoaHocFilter: null,
};
export const KhoaHocReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_DANH_SACH: {
      state.dsKhoaHoc = action.dsKhoaHoc;
      state.khoaHocFilter = action.dsKhoaHoc;
      return { ...state };
    }
    case LAY_CHI_TIET_KHOA_HOC: {
      state.chiTietKhoaHoc = action.chiTietKhoaHoc;
      state.nguoiTao = action.chiTietKhoaHoc.nguoiTao;
      return { ...state };
    }
    case LAY_KHOA_HOC_THEO_SEARCH: {
      state.khoaHocFilter = action.khoaHocTheoDanhMuc;
      return { ...state };
    }
    case "LAY_KHOA_HOC_SEARCH": {
      if (action.keyWord === "") {
        state.khoaHocFilter = state.dsKhoaHoc;
      } else {
        let dsKhoaHocMoi = [...state.dsKhoaHoc];
        state.khoaHocFilter = dsKhoaHocMoi.filter(
          (kh) => kh.tenKhoaHoc.toLowerCase() === action.keyWord.toLowerCase()
        );
      }
      return { ...state };
    }
  }
  return { ...state };
};

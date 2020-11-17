import { safeUseLayoutEffect } from "react-table";
import {
  LAY_DANH_MUC_KHOA_HOC,
  LAY_KHOA_HOC_THEO_MUC,
  LAY_KHOA_HOC_THEO_SEARCH,
  LAY_DANH_SACH,
} from "../Constants/KhoaHocConstants";
const initialState = {
  danhMucKhoaHoc: [],
  khoaHocTheoDanhMuc: [],
};
export const DanhMucReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_DANH_MUC_KHOA_HOC: {
      state.danhMucKhoaHoc = action.danhMucKhoaHoc;
      return { ...state };
    }
    case LAY_KHOA_HOC_THEO_MUC: {
      state.khoaHocTheoDanhMuc = action.khoaHocTheoDanhMuc;
      return { ...state };
    }
  }
  return { ...state };
};

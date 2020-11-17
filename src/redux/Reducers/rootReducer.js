import { combineReducers } from "redux";
import { KhoaHocReducer } from "../Reducers/KhoaHocReducer";
import { DanhMucReducer } from "../Reducers/DanhMucReducer";
import { NguoiDungReducer } from "../Reducers/NguoiDungReducer";
import { AdminReducer } from "../Reducers/AdminReducer";

export const rootReducer = combineReducers({
  DanhMucReducer,
  KhoaHocReducer,
  NguoiDungReducer,
  AdminReducer,
});

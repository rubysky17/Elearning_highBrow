import React, { useEffect } from "react";
import CardKhoaHoc from "../../Layout/Card/CardKhoaHoc";
import { useSelector, useDispatch } from "react-redux";
import {
  layDanhMucKhoaHocAction,
  layDanhSachKhoaHocAction,
} from "../../redux/Actions/KhoaHocActions";
import Search from "../../Components/Search/Search";

export default function AllCourse() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachKhoaHocAction());
    dispatch(layDanhMucKhoaHocAction());
  }, []);

  let danhMucKhoaHoc = useSelector(
    (state) => state.DanhMucReducer.danhMucKhoaHoc
  );

  let khoaHocFilter = useSelector(
    (state) => state.KhoaHocReducer.khoaHocFilter
  );

  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-8 mb-5">
          <Search danhMucKhoaHoc={danhMucKhoaHoc} />
        </div>
      </div>

      <div>
        <div className="row d-flex justify-content-center">
          {khoaHocFilter === null || khoaHocFilter.length === 0 ? (
            <h2>Không có kết quả</h2>
          ) : (
            <>
              {khoaHocFilter?.map((khoaHoc, index) => {
                return <CardKhoaHoc khoaHoc={khoaHoc} key={index} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import { layKhoaHocChuaGhiDanhAction } from '../../../redux/Actions/AdminAction';
import CardModalKhoaHoc from "../CardModalKhoaHoc/CardModalKhoaHoc";
import Loading from '../../Loading/Loading';

export default function KhoaHocChuaXetDuyet(props) {
    let { data } = props
    const [done, setDone] = useState(undefined)
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(layKhoaHocChuaGhiDanhAction(data))
            setDone(true);
        }, 1800);
    }, [data, done])

    const khoaHocChuaXetDuyet = useSelector(
        (state) => state.AdminReducer?.danhSachKhoaHocChuaXetDuyet
    );
    return (
        <div>
            {!done ? (
                <Loading />
            ) : (
                    <Grid container>
                        {khoaHocChuaXetDuyet?.map((kh, index) => {
                            return (
                                <CardModalKhoaHoc
                                    tenKhoaHoc={kh.tenKhoaHoc}
                                    maKhoaHoc={kh.maKhoaHoc}
                                    taiKhoan={props.data}
                                    type="chuaXetDuyet"
                                    key={index}
                                />
                            );
                        })}
                    </Grid>
                )}
        </div>
    )
}

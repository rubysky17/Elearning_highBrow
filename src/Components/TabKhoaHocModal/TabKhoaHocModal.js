import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachHocVienChoXetDuyetAction,
  layDanhSachHocVienKhoaHocAction,
} from "../../redux/Actions/AdminAction";
import CardModalNguoiDung from "./CardModalNguoiDung/CardModalNguoiDung";

import Grid from "@material-ui/core/Grid";
import Loading from "../Loading/Loading";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 400,
    overflowY: "scroll",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "20%",
  },
  TabPanel: {
    width: "80%",
  },
}));
export default function TabKhoaHocModal(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { maKhoaHoc } = props;
  const [done, setDone] = useState(undefined);
  const dispatch = useDispatch();
  const danhSachHocVienChoXetDuyet = useSelector(
    (state) => state.AdminReducer.danhSachHocVienChoXetDuyet
  );
  const danhSachHocVienKhoaHoc = useSelector(
    (state) => state.AdminReducer.danhSachHocVienKhoaHoc
  );
  useEffect(() => {
    setTimeout(() => {
      dispatch(layDanhSachHocVienChoXetDuyetAction(maKhoaHoc));
      setDone(true);
    }, 1800);
  }, [maKhoaHoc, done]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(layDanhSachHocVienKhoaHocAction(maKhoaHoc));
      setDone(true);
    }, 1800);
  }, [maKhoaHoc, done]);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Học viên chờ xét duyệt" {...a11yProps(0)} />
        <Tab label="Học viên của khóa" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.TabPanel}>
        {/* Lấy danh sách để map ra các thẻ render */}
        Danh sách học viên chờ xét duyệt
        {!done ? (
          <Loading />
        ) : (
          <Grid container>
            {danhSachHocVienChoXetDuyet?.map((hv, index) => {
              return (
                <CardModalNguoiDung
                  type={"choXetDuyet"}
                  maKhoaHoc={maKhoaHoc}
                  hoTen={hv.hoTen}
                  taiKhoan={hv.taiKhoan}
                  setDone={setDone}
                />
              );
            })}
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.TabPanel}>
        Danh sách học viên của khóa
        {/* Lấy dnah sách để map ra các thẻ render */}
        {!done ? (
          <Loading />
        ) : (
          <Grid container>
            {danhSachHocVienKhoaHoc?.map((hv, index) => {
              return (
                <CardModalNguoiDung
                  type={"hocVienKhoaHoc"}
                  maKhoaHoc={maKhoaHoc}
                  hoTen={hv.hoTen}
                  taiKhoan={hv.taiKhoan}
                  setDone={setDone}
                />
              );
            })}
          </Grid>
        )}
      </TabPanel>
    </div>
  );
}

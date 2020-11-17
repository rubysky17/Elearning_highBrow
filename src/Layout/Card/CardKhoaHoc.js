import React from "react";
import "./CardKhoaHoc.css";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import { Card } from "antd";
import ButtonShouldLogin from "../../Components/ButtonShouldLogin/ButtonShouldLogin";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { motion } from "framer-motion";
import { USER_LOGIN } from "../../Ultity/ConfigWeb";
import ButtonEnroll from "../../Components/ButtonEnroll/ButtonEnroll";
const { Meta } = Card;

export default function CardKhoaHoc(props) {
  let { khoaHoc } = props;
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
      <NavLink to={`/ChiTietKhoaHoc/${khoaHoc.maKhoaHoc}`}>
        <Card
          style={{ width: 240 }}
          cover={<img alt="logo_khoaHoc" src={khoaHoc.hinhAnh} />}
          onError={(e) => {
            e.target.src = "https://picsum.photos/240/240";
          }}
        >
          <Meta title={khoaHoc.tenKhoaHoc} description={khoaHoc.moTa} />
          <div className="row">
            <div className="card_rating col-12 mt-2">
              <span className="card-rating_num">4.2</span>
              <Box
                component="fieldset"
                mt={1}
                borderColor="transparent"
                className="mr-1 mt-1"
              >
                <Rating name="read-only" value={4} readOnly size="small" />
              </Box>
              <span className="card_viewer">({khoaHoc.luotXem})</span>
            </div>
            <div className="row card-button">
              <div className="col-8 ml-1">
                {localStorage.getItem(USER_LOGIN) ? (
                  <ButtonEnroll />
                ) : (
                  <ButtonShouldLogin />
                )}
              </div>
              <div className="col-3 button-heart">
                <IconButton color="primary">
                  <FavoriteBorderIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </Card>
      </NavLink>
    </motion.div>
  );
}

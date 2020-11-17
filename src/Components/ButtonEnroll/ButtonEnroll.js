import React from "react";
import "./ButtonEnroll.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
export default function ButtonEnroll() {
  return (
    <Button variant="contained" color="warning">
      Xem chi tiết
    </Button>
  );
}

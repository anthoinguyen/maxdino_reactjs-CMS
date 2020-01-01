import { defaultFont } from "../../assets/jss/material-dashboard-react.jsx";
import dropdownStyle from "../../assets/jss/material-dashboard-react/dropdownStyle.jsx";

const headerLinksStyle = theme => ({
  ...dropdownStyle(theme),
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px"
  },
  buttonLink: {
    padding: "12px 0px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "0 15px 0",
      width: "-webkit-fill-available",
      padding: "12px 30px",
      // "& svg": {
      //   width: "24px",
      //   height: "30px",
      //   marginRight: "15px",
      //   marginLeft: "-15px"
      // },
      // "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      //   fontSize: "24px",
      //   lineHeight: "30px",
      //   width: "24px",
      //   height: "30px",
      //   marginRight: "15px",
      //   marginLeft: "-15px"
      // },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%"
      }
    }
  },
  margin: {
    zIndex: "4",
    margin: "0"
  },
  manager: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    display: "inline-block"
  },
  icons: {
    fontSize: "50px"
  },
  bigAvatar: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "5px",
      marginRight: "10px",
      marginLeft: "-23px"
    },
    marginTop: "-10px",
    marginRight: "10px",
    width: 40,
    height: 40
  }
});

export default headerLinksStyle;

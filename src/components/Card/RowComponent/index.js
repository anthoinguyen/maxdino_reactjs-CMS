import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import style from "./styles";
import * as host from "../../../constants/config";

class RowDetail extends React.Component {
  render() {
    const { classes, title, value, link, fullLink, videoLink } = this.props;
    let result = "";
    if (link) {
      let imageLink = `${host.IMAGE_LINK}${link}`;
      result = <img src={imageLink} className={classes.img} alt="img-learn" />;
    } else if (fullLink) {
      let imageLink = `${host.IMAGE_LINK}${fullLink}`;
      result = (
        <a href={imageLink} className={classes.link}>
          {imageLink}
        </a>
      );
    } else if (videoLink) {
      result = (
        <a href={videoLink} className={classes.link}>
          {videoLink}
        </a>
      );
    } else {
      result = <span>{value}</span>;
    }
    return (
      <div className={classes.title}>
        <span className={classes.titleName}>{title} </span>
        {result}
      </div>
    );
  }
}

export default withStyles(style)(RowDetail);

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Icon from "@material-ui/core/Icon";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../components/Card/CardIcon.jsx";
import CardFooter from "../../../components/Card/CardFooter.jsx";
import style from "./styles";

class CardStatistic extends React.Component {
  render() {
    const { classes, title, quantity, icon, link, color } = this.props;
    return (
      <Card>
        <CardHeader color={color} stats icon>
          <CardIcon color={color}>
            <Icon>{icon}</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{title}</p>
          <h3 className={classes.cardTitle}>{quantity}</h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <FormatListBulleted />
            <Link to={link} component={RouterLink}>
              {"More detail"}
            </Link>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default withStyles(style)(CardStatistic);

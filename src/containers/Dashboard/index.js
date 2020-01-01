import React from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as StatisticAction from "./action";
import * as CommonAction from "../../actions";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import ModalError from "../../components/Modal/ModalError";
import CardStatistic from "../../components/Card/CardStatistic";

class Dashboard extends React.Component {
  componentWillMount() {
    if (!localStorage.getItem("jwtTokenAdmin")) {
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    this.props.statisticActionCreators.getListStatistic();
  }

  onPushLogin = () => {
    this.props.commonActionCreators.pushLogin();
  };

  onCloseModalError = () => {
    this.props.statisticActionCreators.closeModalGetListStatisticError();
  };

  render() {
    const { ask, account, learn, video, openModalError, errors } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <ModalError
              errors={errors}
              open={openModalError}
              onClose={this.onCloseModalError}
              pushLogin={this.onPushLogin}
            />
            <CardStatistic
              color="info"
              icon="group"
              title="User"
              quantity={account}
              link="/admin/account"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardStatistic
              color="success"
              icon="public"
              title="Ask"
              quantity={ask}
              link="/admin/list-ask"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardStatistic
              color="warning"
              icon="vpn_lock"
              title="Learn"
              quantity={learn}
              link="/admin/list-learn"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardStatistic
              color="danger"
              icon="video_library"
              title="Video"
              quantity={video}
              link="/admin/video"
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ask: state.statistic.ask,
    learn: state.statistic.learn,
    video: state.statistic.video,
    account: state.statistic.account,
    errors: state.statistic.errors,
    openModalError: state.statistic.openModalError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    statisticActionCreators: bindActionCreators(StatisticAction, dispatch),
    commonActionCreators: bindActionCreators(CommonAction, dispatch)
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Dashboard);

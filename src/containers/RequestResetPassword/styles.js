import login from "./../../assets/img/register.jpg";

const styles = theme => ({
  "@global": {
    body: {
      backgroundImage: `url(${login})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }
  },
  title: {
    fontSize: "30px"
  },
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: "20px",
    marginRight: "30px",
    marginLeft: "40px",
    width: "100px",
    backgroundColor: "#25944c",
    color: "white",
    "&:hover": {
      backgroundColor: "#074d19"
    }
  },
  cancel: {
    marginTop: "20px",
    marginRight: "30px",
    marginLeft: "40px",
    width: "100px"
  }
});

export default styles;

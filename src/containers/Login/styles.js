import login from "../../assets/img/register.jpg";

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
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#25944c",
    color: "white",
    "&:hover": {
      backgroundColor: "#074d19"
    }
  },
  question: {
    fontSize: "14px",
    marginRight: "5px"
  },
  logoImage: {
    clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)",
    backgroundColor: "gray",
    padding: "5px 10px 10px 10px",
    borderRadius: "5px"
  }
});

export default styles;

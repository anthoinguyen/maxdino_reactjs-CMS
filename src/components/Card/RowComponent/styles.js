const styles = theme => ({
  title: {
    padding: "5px 35px",
    fontWeight: "400"
  },
  link: {
    fontWeight: "400",
    color: "black",
    "&:hover,&:focus": {
      color: "blue"
    }
  },
  titleName: {
    fontWeight: "500",
    color: "green"
  },
  card: {
    backgroundColor: "#ccf0d6",
    color: "black",
    fontSize: "14px"
  },
  img:{
    maxHeight: "300px",
    maxWidth:"450px"
  }
});

export default styles;

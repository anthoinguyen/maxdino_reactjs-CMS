const styles = theme => ({
  modal: {
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    maxWidth: "40%",
    minWidth: "260px",
    height: "auto",
    backgroundColor: "white",
    boxShadow: "#000000",
    outline: "none"
  },
  header: {
    backgroundColor: "#20c997",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    color: "white",
    fontWeight: 700,
    textTransform: "capitalize",
    fontSize: "18px",
    marginTop: "0px"
  },
  icon: {
    cursor: "pointer",
    fontSize: 30,
    color: "white"
  },
  content: {
    padding: "10px 15px"
  },
  name: {
    paddingTop: "5px",
    borderBottom: "0.5px solid red"
  },
  textField: {
    width: "100%"
  },
  select: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    width: "85px",
    marginLeft: "10px",
  },
  buttonSave: {
    width: "85px",
    marginLeft: "10px",
    backgroundColor: "#20c997",
  }
});

export default styles;

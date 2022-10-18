import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  makeStyles,
  MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import Label from "./label";

const useStyles = makeStyles({
  root: {},
});

const theme = createTheme({
  overrides: {
    MuiDialog: {
      paper: {
        //width: "fit-content",
        width: "30%",
        borderColor: "#1f1f1f",
        borderStyle: "solid",
        borderWidth: "0.2px",
        borderRadius: "7px",
        backgroundColor: "#101010",
        color: "#fff",
      },
    },
  },
});

const DialogBox = (props) => {
  const dialogboxStyle = useStyles(props);

  // const handleClose = () => {
  //   props.closeDialog();
  // };

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog
        open={props.open}
        onClose={(event, reason) => {
          if (props.onClose) {
            props.onClose(event, reason);
          }
        }}
        className={dialogboxStyle.root}
      >
        <DialogTitle id="responsive-dialog-title">
          <Label color="white">{props.title}</Label>
        </DialogTitle>
        <form onSubmit={props.submit}>
          <DialogContent>{props.children}</DialogContent>
          <div style={{ flexDirection: "row", display: "flex", gap: "15%" }}>
            {props.delete && (
              <DialogActions style={{ padding: "4.3%" }}>
                <Button
                  // type="submit"
                  onClick={() => {
                    props.onDelete();
                    props.closeDialog();
                  }}
                  color="secondary"
                  variant="outlined"
                >
                  Delete
                </Button>
              </DialogActions>
            )}
            {props.saveCancelDialog && (
              <DialogActions style={{ padding: "4.3%" }}>
                <Button
                  onClick={props.closeDialog}
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  // onClick={props.submit}
                  color="primary"
                  variant="contained"
                >
                  Submit
                </Button>
              </DialogActions>
            )}
          </div>
        </form>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default DialogBox;

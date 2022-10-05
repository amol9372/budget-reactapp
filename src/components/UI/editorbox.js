import MyButton from "./button";
import Card from "./card";
import Button from "@material-ui/core/Button";
import InputField from "./inputfield";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  formButtons: {
    display: "flex",
    alignItems: "flex-start",
    gap: "5px",
  },
  children: {
    marginRight: "auto",
  },
});

export const Editor = (props) => {
  const styles = useStyles();

  const cancelEdit = (id) => {
    props.onCancelEdit(id);
  };

  return (
    <form onSubmit={(event) => props.submit(event)}>
      <Card width="97%" flexGap="7px" flexDirection="column" padding="0%">
        <InputField
          value={props.property.name}
          onchange={(event) => props.propertyHandler(event)}
          type="text"
        />
        <div className={styles.children}>{props.children}</div>
        <div className={styles.formButtons}>
          <MyButton backgroundColor="#ff726f" text="Save" type="submit" />
          <Button
            color="primary"
            style={{ color: "white" }}
            size="small"
            onClick={() => cancelEdit(props.taskId)}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </form>
  );
};

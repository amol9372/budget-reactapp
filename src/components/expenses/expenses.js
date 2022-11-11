import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 19,
  },
  body: {
    fontSize: 16,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    maxWidth: "50%",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "blue !important",
    },
  },
});

const Expenses = (props) => {
  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      style={{ backgroundColor: "inherit", textAlign: "-webkit-center" }}
    >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Expense Name</StyledTableCell>
            <StyledTableCell align="right">Cost&nbsp;($)</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            {/* <StyledTableCell align="right">Paid By</StyledTableCell> */}
            <StyledTableCell align="right">Created Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.expenses.map((expense) => (
            <StyledTableRow
              className={classes.tableRow}
              key={expense.id}
              onClick={(event) => console.log(event)}
              hover={true}
            >
              <StyledTableCell component="th" scope="row">
                {expense.name}
              </StyledTableCell>
              <StyledTableCell align="right">{expense.cost}</StyledTableCell>
              <StyledTableCell align="right">
                {expense.category}
              </StyledTableCell>
              {/* <StyledTableCell align="right">{expense.paidBy}</StyledTableCell> */}
              <StyledTableCell align="right">
                {expense.createdOn}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Expenses;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { appStore } from "../../store/appStore";
import { shallow } from "zustand/shallow";

export default function ClassList() {
  const { _classes, getClass, removeClass, getAllClasses } = appStore(
    (state) => ({
      _classes: state._classes,
      getClass: state.getClass,
      removeClass: state.removeClass,
      getAllClasses: state.getAllClasses,
    }),
    shallow
  );

  const onEditClass = (id) => {
    getClass(id);
  };

  const onRemoveClass = (id) => {
    removeClass(id);
    getAllClasses();
  };

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Classes List
      </Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Students</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_classes.length > 0 ? (
            _classes.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{`${row.teacher.name} ${row.teacher.lastName}`}</TableCell>
                <TableCell>
                  {row.students.map((student) => student.name).join(", ")}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => onEditClass(row?.id)}
                    sx={{
                      width: { margin: 2, xs: "100%", sm: "fit-content" },
                    }}
                  >
                    {"Edit"}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => onRemoveClass(row?.id)}
                    sx={{
                      width: { margin: 2, xs: "100%", sm: "fit-content" },
                    }}
                  >
                    {"Remove"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow></TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

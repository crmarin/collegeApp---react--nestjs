import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { appStore } from "../../store/appStore";
import { shallow } from "zustand/shallow";

export default function UserList({ action }) {
  const { teachers, students } = action;

  const { users, getUser, removeUser } = appStore(
    (state) => ({
      users: state.users,
      getUser: state.getUser,
      removeUser: state.removeUser,
    }),
    shallow
  );

  const onEditUser = (id) => {
    getUser(id);
  };

  const onRemoveUser = (id) => {
    removeUser(id);
  };

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {teachers ? "Teacher List" : students ? "Student List" : null}
      </Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => onEditUser(row?.id)}
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
                    onClick={() => onRemoveUser(row?.id)}
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

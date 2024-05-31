import { useEffect, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { appStore } from "../../store/appStore";
import { shallow } from "zustand/shallow";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function UserForm({ action }) {
  const { registerUser, editUser, user, success } = appStore(
    (state) => ({
      registerUser: state.registerUser,
      editUser: state.editUser,
      user: state.user,
      success: state.success,
    }),
    shallow
  );

  const { teachers, students } = action;

  const initialState = {
    name: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { name, lastName, email } = formData;

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      editUser(formData);
    } else {
      registerUser(formData);
    }
  };

  useEffect(() => {
    setFormData(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, action]);

  useEffect(() => {
    if (user) {
      const newState = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      };
      setFormData(newState);
    }
  }, [user]);

  return (
    <>
      <Typography
        component="h2"
        marginTop={10}
        variant="h6"
        color="primary"
        gutterBottom
      >
        {teachers ? "Teacher Form" : students ? "Student Form" : null}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <OutlinedInput
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={onChangeForm}
              placeholder="John"
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <OutlinedInput
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={onChangeForm}
              placeholder="Snow"
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={onChangeForm}
              placeholder="john_snow@email.com"
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: { xs: "100%", sm: "fit-content" },
              }}
            >
              {"Submit"}
            </Button>
          </FormGrid>
        </Grid>
      </form>
    </>
  );
}

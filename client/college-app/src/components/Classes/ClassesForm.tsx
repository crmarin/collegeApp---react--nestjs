import React, { useEffect, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import {
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import MultipleSelect from "../Multiselect";
import { appStore } from "../../store/appStore";
import { shallow } from "zustand/shallow";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function ClassForm() {
  const { teachers, students, _class, success, registerClass, editClass } =
    appStore(
      (state) => ({
        teachers: state.teachers,
        students: state.students,
        _class: state._class,
        success: state.success,
        registerClass: state.registerClass,
        editClass: state.editClass,
      }),
      shallow
    );

  const initialState = {
    name: "",
    description: "",
    teacherId: "",
    studentIds: [],
  };
  const [formData, setFormData] = useState(initialState);
  const { name, description, teacherId, studentIds } = formData;

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (_class) {
      editClass(formData);
    } else {
      registerClass(formData);
    }
  };

  useEffect(() => {
    setFormData(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    if (_class) {
      const newState = {
        name: _class.name,
        description: _class.description,
        teacherId: _class.teacher.id,
        studentIds: _class.students.map((student) => student.id),
      };
      setFormData(newState);
    }
  }, [_class]);

  return (
    <>
      <Typography
        component="h2"
        marginTop={10}
        variant="h6"
        color="primary"
        gutterBottom
      >
        Classes Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <FormGrid item xs={12} md={4}>
            <FormLabel htmlFor="name">Class Name</FormLabel>
            <OutlinedInput
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={onChangeForm}
              placeholder="John"
            />
          </FormGrid>
          <FormGrid item xs={12} md={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <OutlinedInput
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={onChangeForm}
              placeholder="Linear Ecuations"
            />
          </FormGrid>
          <FormGrid item xs={12} md={4}>
            <InputLabel id="teacherId-label">Teacher</InputLabel>
            <Select
              labelId="teacherId-label"
              name="teacherId"
              id="teacherId"
              value={teacherId}
              label="Age"
              onChange={(e) => onChangeForm(e)}
            >
              {teachers.length > 0 &&
                teachers?.map((teacher) => (
                  <MenuItem value={teacher.id} key={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))}
            </Select>
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <MultipleSelect
              formData={formData}
              setFormData={setFormData}
              students={students}
              studentIds={studentIds}
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

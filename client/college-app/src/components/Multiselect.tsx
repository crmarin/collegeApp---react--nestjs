import { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ formData, setFormData, students, studentIds }) {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (e: SelectChangeEvent<typeof personName>) => {
    const { value } = e.target;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    setFormData({
      ...formData,
      ["studentIds"]: typeof value === "string" ? value.split(",") : value,
    });
  };

  useEffect(() => {
    setPersonName(studentIds);
  }, [studentIds]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {students.length > 0 &&
            students?.map((student) => (
              <MenuItem
                key={student.name}
                value={student.id}
                style={getStyles(student.name, personName, theme)}
              >
                {student.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import UserForm from "./Users/UserForm";
import UserList from "./Users/UserList";
import Paper from "@mui/material/Paper";
import ClassForm from "./Classes/ClassesForm";
import ClassList from "./Classes/ClassesList";
import { appStore } from "../store/appStore";
import { shallow } from "zustand/shallow";

const items = [
  {
    icon: <CastForEducationIcon />,
    title: "Teachers",
    description:
      "Ut qui deserunt ipsum occaecat ea proident esse laborum ullamco.",
  },
  {
    icon: <PeopleAltIcon />,
    title: "Students",
    description:
      "Qui dolore et ipsum laboris ut nostrud cillum dolor duis ut est.",
  },
  {
    icon: <EventAvailableIcon />,
    title: "Classes",
    description: "Anim enim excepteur magna eu labore quis..",
  },
];

export default function Features() {
  const { action, getAllUsers, getAllClasses, setAction } = appStore(
    (state) => ({
      action: state.action,
      getAllUsers: state.getAllUsers,
      getAllClasses: state.getAllClasses,
      setAction: state.setAction,
    }),
    shallow
  );
  const { teachers, students, classes } = action;

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const handleItemClick = (index: number) => {
    setAction(index);
    setSelectedItemIndex(index);
  };

  useEffect(() => {
    getAllUsers();
    getAllClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemIndex]);

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6} marginBottom={5}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              My college app
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Please click in some button below for access to specific area.
            </Typography>
          </div>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  background: "none",
                  backgroundColor:
                    selectedItemIndex === index ? "action.selected" : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index
                        ? "primary.light"
                        : "grey.200";
                    }
                    return selectedItemIndex === index
                      ? "primary.dark"
                      : "grey.800";
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === "light") {
                          return selectedItemIndex === index
                            ? "primary.main"
                            : "grey.300";
                        }
                        return selectedItemIndex === index
                          ? "primary.main"
                          : "grey.700";
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: "none" }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        {teachers || students ? (
          <Grid item xs={12} md={6}>
            <UserForm action={action} />
          </Grid>
        ) : null}
        {classes ? (
          <Grid item xs={12} md={6}>
            <ClassForm />
          </Grid>
        ) : null}
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          {teachers || students ? (
            <UserList action={action} />
          ) : classes ? (
            <ClassList />
          ) : null}
        </Paper>
      </Grid>
    </Container>
  );
}

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import TabPanel from "./components/TabPanel";
import Stack from "@mui/material/Stack";
import Todo from "./components/Todo";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { deletTodos, setPickedTodo } from "./redux/todoSlice";
import ModalComponent from "./components/ModalComponent";

function App() {
  const { todos, pickedTodo } = useAppSelector((state) => state.todoReducer);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          height: "calc(100vh - 16px)",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ bgcolor: "#cfe8fc" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All" />
              <Tab label="Active" />
              <Tab label="Completed" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {todos.length > 0 ? (
              <Stack spacing={2}>
                {todos.map((todo) => (
                  <Todo key={todo.id} {...todo} setOpen={setOpen} />
                ))}
              </Stack>
            ) : (
              <p>No tasks</p>
            )}
          </TabPanel>

          <TabPanel value={value} index={1}>
            {todos.filter((todo) => todo.status !== "Completed").length > 0 ? (
              <Stack spacing={2}>
                {todos
                  .filter((todo) => todo.status !== "Completed")
                  .map((todo) => (
                    <Todo key={todo.id} {...todo} setOpen={setOpen} />
                  ))}
              </Stack>
            ) : (
              <p>No tasks</p>
            )}
          </TabPanel>

          <TabPanel value={value} index={2}>
            {todos.filter((todo) => todo.status !== "Active").length > 0 ? (
              <Stack spacing={2}>
                {todos
                  .filter((todo) => todo.status !== "Active")
                  .map((todo) => (
                    <Todo key={todo.id} {...todo} setOpen={setOpen} />
                  ))}
              </Stack>
            ) : (
              <p>No tasks</p>
            )}
          </TabPanel>
          <Button
            onClick={() => {
              handleOpen();
              dispatch(setPickedTodo(null));
            }}
          >
            Create task
          </Button>
          <Button onClick={() => dispatch(deletTodos())}>Clear task</Button>
        </Box>
      </Container>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        pickedTodo={pickedTodo}
      />
    </>
  );
}

export default App;

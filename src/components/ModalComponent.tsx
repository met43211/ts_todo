import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { TodoType } from "../Types/TodoType";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addTodo, changeTodo } from "../redux/todoSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

interface ModalI {
  open: boolean;
  handleClose: () => void;
  pickedTodo: TodoType | null;
}

function ModalComponent({ open, handleClose, pickedTodo }: ModalI) {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pickedTodo) {
      setTitle(pickedTodo.title);
      setStatus(pickedTodo.status);
    } else {
      setTitle("");
    }
  }, [pickedTodo]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          id="outlined-basic"
          label="task"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: "15px" }}
        />
        {pickedTodo && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={handleChangeSelect}
            sx={{ marginBottom: "15px" }}
          >
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
          </Select>
        )}
        {pickedTodo ? (
          <Button
            onClick={() => {
              handleClose();
              dispatch(
                changeTodo({
                  id: pickedTodo.id,
                  title,
                  status,
                })
              );
            }}
          >
            Change task
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleClose();
              setTitle("");
              dispatch(addTodo(title));
            }}
          >
            Create task
          </Button>
        )}
      </Box>
    </Modal>
  );
}

export default ModalComponent;

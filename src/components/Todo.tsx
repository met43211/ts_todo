import { TodoType } from "../Types/TodoType";
import { useAppDispatch } from "../hooks/redux";
import { setPickedTodo } from "../redux/todoSlice";

interface TodoI extends TodoType {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Todo({ title, id, status, setOpen }: TodoI) {
  const dispatch = useAppDispatch();
  return (
    <div
      className="todo"
      onClick={() => {
        dispatch(setPickedTodo({ title, id, status }));
        setOpen(true);
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

export default Todo;

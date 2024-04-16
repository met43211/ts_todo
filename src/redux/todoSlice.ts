import { createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../Types/TodoType";

interface UserState {
  todos: TodoType[];
  pickedTodo: TodoType | null;
}

const initialState: UserState = {
  todos: [],
  pickedTodo: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        title: action.payload,
        status: "Active",
        id: Date.now(),
      });
      state.pickedTodo = null;
    },
    changeTodo: (state, action) => {
      console.log(action.payload);
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
            status: action.payload.status,
          };
        } else {
          return todo;
        }
      });
      state.pickedTodo = null;
    },

    deletTodos: (state) => {
      state.todos = state.todos.filter((todo) => todo.status !== "Completed");
    },
    setPickedTodo: (state, action) => {
      state.pickedTodo = action.payload;
    },
  },
});

export const todoReducer = todoSlice.reducer;
export const { addTodo, changeTodo, deletTodos, setPickedTodo } =
  todoSlice.actions;

import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ModalComponent from "../components/ModalComponent";

describe("ModalComponent", () => {
  const mockStore = configureStore();
  const initialState = {
    todos: [
      { id: 1, title: "Todo 1", status: "Active" },
      { id: 2, title: "Todo 2", status: "Completed" },
    ],
    pickedTodo: null,
  };
  const store = mockStore(initialState);

  test("renders correctly with create task button", () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <ModalComponent
          open={true}
          handleClose={handleClose}
          pickedTodo={null}
        />
      </Provider>
    );

    const createTaskButton = getByText("Create task");
    expect(createTaskButton).toBeInTheDocument();
  });

  test("renders correctly with change task button", () => {
    const handleClose = jest.fn();
    const pickedTodo = { id: 1, title: "Test Todo", status: "Active" };
    const { getByText } = render(
      <Provider store={store}>
        <ModalComponent
          open={true}
          handleClose={handleClose}
          pickedTodo={pickedTodo}
        />
      </Provider>
    );

    const changeTaskButton = getByText("Change task");
    expect(changeTaskButton).toBeInTheDocument();
  });

  test("calls handleClose when change task button is clicked", () => {
    const handleClose = jest.fn();
    const pickedTodo = { id: 1, title: "Test Todo", status: "Active" };
    const { getByText } = render(
      <Provider store={store}>
        <ModalComponent
          open={true}
          handleClose={handleClose}
          pickedTodo={pickedTodo}
        />
      </Provider>
    );

    const changeTaskButton = getByText("Change task");
    fireEvent.click(changeTaskButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

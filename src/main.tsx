import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { setupStore } from "./redux/store.ts";
import { Provider } from "react-redux";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

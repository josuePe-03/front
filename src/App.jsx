import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { store } from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </Provider>
  );
};

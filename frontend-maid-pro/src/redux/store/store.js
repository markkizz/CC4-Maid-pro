import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers/reducers";
import thunk from "redux-thunk";
// import logger from "redux-logger";

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("store", serializedState);
  } catch (error) {
    console.log(error.message);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("store");
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    return undefined;
  }
};

const persistStore = loadState();

export const middlewares = [thunk];

const store = createStore(
  reducers,
  persistStore,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  const { role } = store.getState().user;
  if (role === "guest") {
    window.appHistory.push("/login");
  }
  saveState(store.getState());
  console.log(store.getState())
});

export default store;

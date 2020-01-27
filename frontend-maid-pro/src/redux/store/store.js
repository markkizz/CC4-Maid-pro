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
    applyMiddleware(...middlewares)  )
);

store.subscribe(() => {
  const {role} = store.getState().user
  console.log(role)
  saveState(store.getState());
});

export default store;

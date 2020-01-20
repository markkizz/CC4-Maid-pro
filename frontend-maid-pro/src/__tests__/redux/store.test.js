import axios from "axios";
import moxios from "moxios";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/reducers/reducers";
import { middlewares } from "../../redux/store/store";
import { login } from "../../redux/actions/actions";

const testStore = initialState => {
  const createStoreWithMiddlewares = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddlewares(rootReducer, initialState);
};

describe("User login to website and request to backend", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("Store should update correctly when user login ", () => {
    const expectedUser = {
      id: 1,
      username: "mark",
      first_name: "kittayot",
      last_name: "pattanapara",
      type: 'EMPLOYER'
    };
    const token = jwt.sign(expectedUser, "53cr3tk3y");

    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: token
      });
    });

    return axios
      .get("https://jsonplaceholder.typicode.com/users", expectedUser)
      .then(({ data }) => {
        const user = jwtDecode(data);
        store.dispatch(login(user, token));
      })
      .then(() => {
        const newState = store.getState();
        expect(newState.user).toEqual({...expectedUser, role: 'user'});
      });
  });
});

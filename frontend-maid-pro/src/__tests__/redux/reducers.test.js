import userReducer from "../../redux/reducers/userReducer";
import searchReducer from '../../redux/reducers/searchReducer'
import { userTypes, searchTypes } from "../../redux/actions/types";

describe("User Reducer", () => {
  const initialState = {
    id: null,
    username: "",
    first_name: "",
    last_name: ""
  };

  describe("User Reducer when user doesn't send any action ", () => {
    it("Should return initial state", () => {
      const newState = userReducer(initialState, {});
      expect(newState).toEqual(initialState);
    });

    it("Should return guest role", () => {
      const newState = userReducer(undefined, {});
      expect(newState).toEqual({ role: "guest" });
    });
  });

  describe("User Reducer when user send Login action and Logout action", () => {
    const user = {
      id: 0,
      username: "markkizz",
      phone: "084721xxxx",
      role: "user"
    };
    it("Should return user data when user Login to website", () => {
      const newState = userReducer(initialState, {
        type: userTypes.USER_LOGIN,
        payload: user
      });
      console.log(newState);
      expect(newState).toEqual(user);
    });

    it("Should return guest role when user Logout", () => {
      const newState = userReducer(user, { type: userTypes.USER_LOGOUT });
      expect(newState).toEqual({ role: "guest" });
    });
  });
});

describe('Search Reducer', () => {
  const initialState = {
    quickSearchType: '',
    filterSearch: []
  }

  describe("when user doesn't send any action", () => {
    it('Should return initial state', () => {
      const newState = searchReducer(initialState, {})
      expect(newState).toEqual(initialState)
    })
  })

  // describe("when user click button quick search in home page", () => {
  //   const newState = searchReducer(initialState, )
  // })
})

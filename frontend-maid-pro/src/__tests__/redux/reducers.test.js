import userReducer from "../../redux/reducers/userReducer";
import searchReducer from "../../redux/reducers/searchReducer";
import maidReducer from '../../redux/reducers/maidReducer'
import { userTypes, searchTypes, maidTypes } from "../../redux/actions/types";

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
      expect(newState).toEqual(user);
    });

    it("Should return guest role when user Logout", () => {
      const newState = userReducer(user, { type: userTypes.USER_LOGOUT });
      expect(newState).toEqual({ role: "guest" });
    });
  });
});

describe("Search Reducer", () => {
  const initialState = {
    quickSearchType: "",
    filterSearch: []
  };

  describe("when user doesn't send any action in quick search", () => {
    it("Should return initial state", () => {
      const newState = searchReducer(initialState, {});
      expect(newState).toEqual(initialState);
    });
  });

  describe("when user click button quick search in home page", () => {
    it("Should return state that store quickSearchType with house", () => {
      const newState = searchReducer(initialState, {
        type: searchTypes.QUICK_SEARCH_TYPE,
        payload: "house"
      });
      expect(newState).toEqual({ ...initialState, quickSearchType: "house" });
    });
  });

  describe('When user use filter feature', () => {
    const data = {
      maidName: "mark",
      typeOfPlaceId: 1,
      date: "Monday",
      rating: 5,
      price_hour: [0, 750]
    };
    const newState = searchReducer(initialState, {
      type: searchTypes.FILTER_SEARCH,
      payload: data
    })
    expect(newState).toEqual({...initialState, filterSearch: {...data}})
  })
});

describe('Maid Reducer', () => {
  const initialState = {
    selectedMaid: 0
  }
  describe("When user doesn't send any action in MaidCard", () => {
    it('Should return initial state', () => {
      const newState = maidReducer(initialState, {})
      expect(newState).toEqual(initialState)
    })
  })

  describe("When user click in MaidCard", () => {
    it('Should return state that store selectedMaid with maid id', () => {
      const maidId = 1
      const newState = maidReducer(initialState, {
        type: maidTypes.SELECTED_MAID,
        payload: maidId
      })
      expect(newState).toEqual({...initialState, selectedMaid: maidId})
    })
  })
})

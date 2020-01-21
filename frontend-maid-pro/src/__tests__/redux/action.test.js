import * as action from "../../redux/actions/actions";
import { searchTypes, maidTypes } from "../../redux/actions/types";

describe("Search action", () => {
  describe("When user click quick search in home page", () => {
    const testActionCreator = {
      type: searchTypes.QUICK_SEARCH_TYPE,
      payload: "house"
    };

    it("Action should created with type QUICK_SEARCH_TYPE", () => {
      const actionCreatorType = action.quickSearchType().type;
      expect(actionCreatorType).toBe(searchTypes.QUICK_SEARCH_TYPE);
    });

    it("Action should have payload with quick search type house", () => {
      const actionCreatorPayload = action.quickSearchType("house");
      expect(actionCreatorPayload).toEqual(testActionCreator);
    });
  });

  // TODO: Change type of service in modalSearch array to object with typeId as key && chnage date to Monday, Tueday ... && delete time section
  describe("When user use filter feature and apply", () => {
    const data = {
      maidName: "mark",
      typeOfPlaceId: 1,
      date: "Monday",
      rating: 5,
      price_hour: [0, 750]
    };
    const testActionCreator = {
      type: searchTypes.FILTER_SEARCH,
      payload: data
    };

    it("Action should created with type FILTER_SEARCH", () => {
      const actionCreatorType = action.filterSearch().type;
      expect(actionCreatorType).toBe(searchTypes.FILTER_SEARCH);
    });

    it("Action should have payload with filter data", () => {
      const actionCreatorPayload = action.filterSearch(data);
      expect(actionCreatorPayload).toEqual(testActionCreator);
    });
  });
});

describe("Maid action", () => {
  describe("When user click MaidCard", () => {
    const maidId = 1
    const testActionCreator = {
      type: maidTypes.SELECTED_MAID,
      payload: maidId
    }

    it("Action should created with type SELECTED_MAID", () => {
      const actionCreatorType = action.selectedMaid().type;
      expect(actionCreatorType).toBe(maidTypes.SELECTED_MAID);
    });

    it("Action should have payload with maid id", () => {
      const actionCreatorPayload = action.selectedMaid(maidId)
      expect(actionCreatorPayload).toEqual(actionCreatorPayload)
    })
  });
});

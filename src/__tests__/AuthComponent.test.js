import React from "react";
import mount from "enzyme";
import LoginComponent from "../auth/LoginComponent";
// import AuthComponent from "../../auth";
import MutationObserver from "mutation-observer";

// Enzyme.configure({ adapter: new Adapter() });
// let wrapper;
// global.MutationObserver = MutationObserver;
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};
describe("Given Auth Components", () => {
  // var wrapper;
  // beforeEach(() => {
  //   wrapper = mount(<LoginComponent />);
  // });
  it("should render div", () => {
    let wrapper = mount(<LoginComponent />);
    console.log("00-----", wrapper);
    // expect(wrapper).toHaveLength(1);
    expect(wrapper).toBe(1);
    // expect(mutationObserverMock.mock.instances).toBe(1);
  });
});

import { expect } from "chai";
import { renderHook, act } from "@testing-library/react-hooks";
import useMicroFrontEnd from "../useMicroFrontEnd";

describe("sandbox/MicroFrontEnd/useMicroFrontEnd", () => {
  it("can return default state of the hook", async () => {
    const mockRenderComponent = jest.fn((x) => x);
    const mockRenderComponentById = jest.fn((x) => x);
    const { result, waitForNextUpdate, waitForValueToChange } = renderHook(() =>
      useMicroFrontEnd("http://testserver.com", "mockMFELib")
    );
    await waitForNextUpdate();
    expect(result.current.isLoaded).to.be.false;
    act(() => {
      window.dispatchEvent(
        new CustomEvent("MFEMounted", {
          detail: {
            name: "mockMFELib",
          },
        })
      );
      window.mockMFELib = {
        renderComponent: mockRenderComponent,
        renderComponentById: mockRenderComponentById,
      };
    });
    expect(result.current.isLoaded).to.be.true;
    expect(result.current).to.have.property("renderComponent");
    expect(result.current).to.have.property("renderComponentById");

    act(() => {
      result.current.renderComponent("testComponent", "ref");
    });
    expect(mockRenderComponent.mock.calls).to.have.length(1);
    expect(mockRenderComponentById.mock.calls).to.have.length(0);
  });
});

import type { RenderComponent } from "./Types/RenderComponent";
import type { RenderComponentById } from "./Types/RenderComponentById";
declare type UseMicroFrontEnd = (mfeDomain: string, libName: string) => {
    isLoaded: boolean;
    renderComponent: RenderComponent;
    renderComponentById: RenderComponentById;
};
export declare const useMicroFrontEnd: UseMicroFrontEnd;
export default useMicroFrontEnd;

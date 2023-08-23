import Session from "../vision/Session";
import { ARViewStatus } from "../types";
declare const _default: import("vue").DefineComponent<{
    status: {
        type: import("vue").PropType<ARViewStatus>;
        required: true;
    };
    session: {
        type: import("vue").PropType<Session>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    status: {
        type: import("vue").PropType<ARViewStatus>;
        required: true;
    };
    session: {
        type: import("vue").PropType<Session>;
        required: true;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
//# sourceMappingURL=ARSetup.vue.d.ts.map
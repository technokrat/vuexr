import Session from "../vision/Session";
import { ARViewStatus } from "../types";
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<{
    status: ARViewStatus;
    session: Session;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    status: ARViewStatus;
    session: Session;
}>>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
//# sourceMappingURL=ARSetup.vue.d.ts.map
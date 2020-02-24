import _Vue from "vue";
export declare class VueXR {
    private sessions;
    static install(Vue: typeof _Vue, options?: any): void;
    constructor();
    requestSession(name?: string): any;
    removeSession(name?: string): void;
}

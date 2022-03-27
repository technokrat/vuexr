import { Plugin } from 'vue';
export declare class VueXRManager {
    private sessions;
    constructor();
    requestSession(name?: string): any;
    removeSession(name?: string): void;
    check(): Promise<{
        supported: boolean;
        error: null;
    } | {
        supported: boolean;
        error: string;
    }>;
}
export declare const VueXR: Plugin;

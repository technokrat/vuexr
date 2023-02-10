import Session from "./vision/Session";
export declare class VueXRManager {
    private sessions;
    constructor();
    requestSession(name?: string): Session;
    removeSession(name?: string): void;
    check(): Promise<{
        supported: boolean;
        error: null;
    } | {
        supported: boolean;
        error: string;
    }>;
}
//# sourceMappingURL=VueXRManager.d.ts.map
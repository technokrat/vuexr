/// <reference types="w3c-image-capture" />
import Session from "./Session";
interface FeedOptions {
    constraints?: {
        audio?: boolean;
        video?: {
            facingMode?: VideoFacingModeEnum;
        };
    };
}
interface FeedStatus {
    error?: string;
    available?: MediaDeviceInfo[];
    selected?: string | null;
}
export default class CameraFeed {
    session: Session;
    options: FeedOptions;
    paused: boolean;
    mediaStream?: MediaStream;
    track?: MediaStreamTrack;
    videoElement: HTMLVideoElement;
    imageCapture?: ImageCapture;
    feedStatus: FeedStatus;
    animationFrameRequest?: number;
    constructor(session: Session, options?: FeedOptions);
    init(): Promise<void>;
    loadCamera(): string | null;
    storeCamera(): boolean;
    stop(): void;
    selectCamera(id: string): Promise<void>;
    listAvailable(): Promise<MediaDeviceInfo[]>;
    run(): Promise<void>;
    loop(): Promise<void>;
}
export {};
//# sourceMappingURL=CameraFeed.d.ts.map
type ENV = {
    env: 'dev' | 'prod';
    isDev: boolean;
    isProd: boolean;
    isLocalhost: boolean;
}

type PWA = {
    installPrompt: BeforeInstallPromptEvent | null;
    isStandalone(): boolean;
}

const env: ENV;
const pwa: PWA;
function log(...message: any[]): void;

type Globals = {
    env: ENV;
    pwa: PWA;
    log: typeof log;
}

type bol = boolean;
type num = number;
type str = string;


class BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed',
      platform: string
    }>;
    prompt(): Promise<void>;
}
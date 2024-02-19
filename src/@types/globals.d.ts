type bol = boolean;
type num = number;
type str = string;

type Dict<T> = { [key: str]: T; };

type JsType =
    | 'array'
    | 'bigint'
    | 'boolean'
    | 'function'
    | 'NaN'
    | 'null'
    | 'number'
    | 'object'
    | 'string'
    | 'symbol'
    | 'undefined';

type JsTypeFind<S extends JsType> =
    S extends 'array'       ? any[] :
    S extends 'bigint'      ? bigint :
    S extends 'boolean'     ? boolean :
    S extends 'function'    ? Function :
    S extends 'NaN'         ? number :
    S extends 'null'        ? null :
    S extends 'number'      ? number :
    S extends 'object'      ? object :
    S extends 'string'      ? string :
    S extends 'symbol'      ? symbol :
    S extends 'undefined'   ? undefined : never;

type ENV = {
    env: 'dev' | 'prod';
    isDev: bol;
    isProd: bol;
    isLocalhost: bol;
} & Key;

type PWA = {
    installPrompt: BeforeInstallPromptEvent | null;
    isStandalone(): bol;
}

const env: ENV;
const pwa: PWA;
function log(...message: any[]): void;

type Globals = {
    env: typeof env;
    pwa: typeof pwa;
    log: typeof log;
}

class BeforeInstallPromptEvent extends Event {
    readonly platforms: str[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed',
      platform: str
    }>;
    prompt(): Promise<void>;
}
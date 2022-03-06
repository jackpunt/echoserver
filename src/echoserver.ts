import { CgServerDriver, WssListener, WSSOpts, wssServer } from "@thegraid/wspbserver";
import { AnyWSD, stime } from '@thegraid/wspbclient'
import { EchoDriver } from "./EchoDriver";

// all the import/export: https://blog.atomist.com/typescript-imports/
// https://dzone.com/articles/import-statements-in-typescript-which-syntax-to-us

wssServer('echoserver', EchoDriver, 'game7', '8443')

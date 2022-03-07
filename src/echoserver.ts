import { wssServer } from "@thegraid/wspbserver";
import { EchoDriver } from "./EchoDriver";

// all the import/export: https://blog.atomist.com/typescript-imports/
// https://dzone.com/articles/import-statements-in-typescript-which-syntax-to-us

wssServer(true, 'echoserver', 'game7', '8443', EchoDriver)

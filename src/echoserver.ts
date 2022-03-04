import { WssListener, WSSOpts } from "@thegraid/wspbserver";
import { BaseDriver, DataBuf, pbMessage, stime } from '@thegraid/wspbclient'
import { EchoDriver } from "./EchoDriver";

// all the import/export: https://blog.atomist.com/typescript-imports/
// https://dzone.com/articles/import-statements-in-typescript-which-syntax-to-us

const echoserver: WSSOpts = {
  domain: ".thegraid.com",
  port: 8443,
  keydir: "/Users/jpeck/keys/"
}
const host = process.argv[2] || "game7"

console.log(stime(), "echoserver! ")
let cnxlp = new WssListener(host, echoserver, EchoDriver).startListening()
let fil = (cnxl: WssListener) => {
  console.log("%s listening %s:%d", stime(), cnxl.hostname, cnxl.port)
}
let rej = (reason: any) => {
  console.log(stime(), "reject:", reason)
}
cnxlp.then(fil, rej)
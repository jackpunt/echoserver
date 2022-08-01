import { argVal } from '@thegraid/common-lib';
import { ServerSocketDriver, srvrOpts, wssServer } from '@thegraid/wspbserver';
import { EchoDriver } from "./EchoDriver.js";

let lld0 = Number.parseInt(argVal('lld0', '0'))
let lld1 = Number.parseInt(argVal('lld1', '1'))
ServerSocketDriver.logLevel = lld0
EchoDriver.logLevel = lld1

//wssServer(true, 'cgserver', srvrOpts('cgserver', '8447'), CgServerDriver)
const info = wssServer(true, 'echoserver', srvrOpts('game7', '8443'), EchoDriver)

import { CgServerDriver, srvrOpts, wssServer } from '@thegraid/wspbserver';
import { argVal, stime } from '@thegraid/common-lib';
import { ServerSocketDriver } from '@thegraid/wspbserver/dist/ServerSocketDriver'; // fixed in next release

let lld0 = Number.parseInt(argVal('lld0', '0'))
let lld1 = Number.parseInt(argVal('lld1', '1'))
ServerSocketDriver.logLevel = lld0
CgServerDriver.logLevel = lld1

wssServer(true, 'cgserver', srvrOpts('cgserver', '8447'), CgServerDriver)
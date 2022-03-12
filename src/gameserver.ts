import { EchoDriver } from "./EchoDriver";
import { CgServerDriver, srvrOpts, wssServer } from "@thegraid/wspbserver";
import { stime } from '@thegraid/wspbclient'
import type { pbMessage } from "@thegraid/wspbclient";

class GameServer<T extends pbMessage> extends EchoDriver<T> {

}

wssServer(true, 'cgserver', srvrOpts('game7', '8446'), CgServerDriver)
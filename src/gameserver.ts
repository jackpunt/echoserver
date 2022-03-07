import { EchoDriver } from "./EchoDriver";
import { wssServer } from "@thegraid/wspbserver";
import { stime } from '@thegraid/wspbclient'
import type { pbMessage } from "@thegraid/wspbclient";

class GameServer<T extends pbMessage> extends EchoDriver<T> {

}

wssServer(true, 'gameServer', 'game7', '8446', GameServer)
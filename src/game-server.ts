import { EchoDriver } from "./EchoDriver";
import { WssListener, WSSOpts } from "wspbserver";
import { stime } from 'wspbclient'
import type { pbMessage } from "wspbclient";

class GameServer<T extends pbMessage> extends EchoDriver<T> {

}
const gameserver:  WSSOpts = {
	domain: ".thegraid.com",
	port: 8445,
	keydir: "/Users/jpeck/keys/"
}

console.log(stime(), "game-server! ")

let cnxlp = new WssListener("game7", gameserver, GameServer).startListening()
cnxlp.then((cnxl) => {
	console.log("%s listening %s:%d", stime(), cnxl.hostname, cnxl.port)
}, (reason) => {
	console.log(stime(), "reject:", reason)
})
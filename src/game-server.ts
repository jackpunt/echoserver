import { EchoDriver } from "./EchoDriver";
import { WssListener, WSSOpts } from "@thegraid/wspbserver";
import { stime } from '@thegraid/wspbclient'
import type { pbMessage } from "@thegraid/wspbclient";

class GameServer<T extends pbMessage> extends EchoDriver<T> {

}
const gameserver: WSSOpts = {
  domain: ".thegraid.com",
  port: 8445,
  keydir: "/Users/jpeck/keys/"
}
const host = process.argv[2] || "game7"

console.log(stime("game-server", "!"), host)

let cnxlp = new WssListener(host, gameserver, GameServer).startListening()
cnxlp.then((cnxl) => {
  console.log("%s listening %s:%d", stime(), cnxl.hostname, cnxl.port)
}, (reason) => {
  console.log(stime(), "reject:", reason)
})
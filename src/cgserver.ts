import { WssListener, WSSOpts, CgServerDriver } from '@thegraid/wspbserver';

const cgserver: WSSOpts = {
  domain: ".thegraid.com",
  port: 8444,
  keydir: "/Users/jpeck/keys/"
}
const host = process.argv[2] || "game7"

let cnxlp = new WssListener(host, cgserver, CgServerDriver).startListening()
cnxlp.then((cnxl) => {
  console.log("listening %s:%d", cnxl.hostname, cnxl.port)
}, (reason) => {
  console.log("reject:", reason)
})

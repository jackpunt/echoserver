import { WssListener, WSSOpts } from 'wspbserver';
import { CgServerDriver } from 'wspbserver'

const cgserver: WSSOpts = {
	domain: ".thegraid.com",
	port: 8444,
	keydir: "/Users/jpeck/keys/"
}

let cnxlp = new WssListener("game7", cgserver, CgServerDriver ).startListening()
cnxlp.then((cnxl) => {
	console.log("listening %s:%d", cnxl.hostname, cnxl.port)
}, (reason) => {
	console.log("reject:", reason)
})
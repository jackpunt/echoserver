import { WssListener, WSSOpts } from "wspbserver";
import { BaseDriver, DataBuf, pbMessage, stime } from 'wspbclient'
import { EchoDriver } from "./EchoDriver";

class xEchoDriver<T extends pbMessage> extends BaseDriver<T, T> {
	/**
	 * @param buf
	 * @override
	 */
	wsmessage(buf: DataBuf<T>) {
		this.wsreceived(buf)
		this.wsechoback(buf);
	}
	wsreceived(buf: DataBuf<T>) {
		console.log(stime(), "RECEIVED:", buf.length, buf);
	}
	wsechoback(buf: DataBuf<T>) {
		// TODO: see if this is needed and find generic solution, see also CgBase.ts
		let sendBufCb = (error: Error) => {
			if (!error) {
				console.log(stime(), 'EchoDriver sent: %s', "success");
			} else {
				console.log(stime(), 'EchoDriver error: %s', error);
			}
		};
		this.sendBuffer(buf);
	}
}
const echoserver:  WSSOpts = {
	domain: ".thegraid.com",
	port: 8443,
	keydir: "/Users/jpeck/keys/"
}

console.log(stime(), "echoserver! ")
let cnxlp = new WssListener("game7", echoserver, EchoDriver).startListening()
let fil = (cnxl: WssListener) => {
	console.log("%s listening %s:%d", stime(), cnxl.hostname, cnxl.port)
}
let rej = (reason: any) => {
	console.log(stime(), "reject:", reason)
}
cnxlp.then(fil, rej)
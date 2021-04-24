import { BaseDriver, DataBuf, pbMessage, stime } from 'wspbclient'

/** A BaseDriver that handles incoming(buf) by sending it back to this.ws */
export class EchoDriver<T extends pbMessage> extends BaseDriver<T, T> {
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
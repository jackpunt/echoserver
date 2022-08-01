import { BaseDriver, DataBuf, pbMessage, stime } from '@thegraid/wspbclient'

/** A BaseDriver that handles incoming(buf) by sending it back to this.ws */
export class EchoDriver<T extends pbMessage> extends BaseDriver<T, T> {
  static logLevel = 0
  override log = EchoDriver.logLevel
  /**
   * @param buf
   * @override
   */
  override onmessage(buf: DataBuf<T>) {
    if (this.ll(2)) {
      console.log(stime(this, `.onmessage`), buf.length, buf);
    } else if (this.ll(1)) {
      console.log(stime(this, `.onmessage`), buf.length);
    }
    this.wsechoback(buf);
  }
  wsechoback(buf: DataBuf<T>) {
    // TODO: see if this is needed and find generic solution, see also CgBase.ts
    let sendBufCb = (error: Error) => {
      if (!error) {
        this.ll(1) && console.log(stime(), 'EchoDriver sent: %s', "success");
      } else {
        this.ll(0) && console.error(stime(), 'EchoDriver error: %s', error);
      }
    };
    this.sendBuffer(buf);
  }
}
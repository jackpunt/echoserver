import * as events from 'events';
import * as http from 'http';

// declare module 'ws' {
//     export * from 'ws';
// }

declare module 'ws' {
  /**
   class WebSocketServer extends EventEmitter {
    /**
     * Create a `WebSocketServer` instance.
     *
     * @param {Object} options Configuration options
     * @param {String} options.host The hostname where to bind the server
     * @param {Number} options.port The port where to bind the server
     * @param {http.Server} options.server A pre-created HTTP/S server to use
     * @param {Function} options.verifyClient An hook to reject connections
     * @param {Function} options.handleProtocols An hook to handle protocols
     * @param {String} options.path Accept only connections matching this path
     * @param {Boolean} options.noServer Enable no server mode
     * @param {Boolean} options.clientTracking Specifies whether or not to track clients
     * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
     * @param {Number} options.maxPayload The maximum allowed message size
     * @param {Function} callback A listener for the `listening` event
    /*
     constructor (options, callback) {
   * 
   */

  /** arrayBuffer | blob */
  //export enum BinaryType { arrayBuffer = 'arrayBuffer', blog = 'blog' }
  /** 'arrayBuffer' or 'blog' */
  export type BinaryType = 'arrayBuffer' | 'blob';

  /** options to setup a web server */
  export type WSOpts = {
    host?: string, port?: number, server?: http.Server, binaryType?: BinaryType,
    verifyClient?: () => boolean, handleProtocols?: () => void,
    path?: string, noServer?: boolean, clientTracking?: boolean,
    perMessageDeflate?: boolean | ((msg:ArrayBuffer | Blob)=>boolean), maxPayload?: number
  }

  namespace WebSocket {
    export class Server extends events.EventEmitter {
      constructor(options: WSOpts, callback?: (data: any) => void) // http.Server callback... (httpRequest)=>void ??
    }
  }
}

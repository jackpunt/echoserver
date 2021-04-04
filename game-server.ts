import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import * as dns from "dns";
import WebSocket from "./node_modules/ws/lib/websocket";
import { WebSocketServer, WSOpts } from "ws";


/**
 * a Secure WebSocket Server (wss://)
 * listening and responding on wss://NAME.thegraid.com:PORT/
 */
class GameServer {
	port: number = 8443;
	keydir = "/Users/jpeck/keys/";
	keypath: string
	certpath: string
	hostname: string
	privateKey: string
	certificate: string
	credentials: { key: string, cert: string }
	app: http.RequestListener = null; // an express app [if you have one, to handle requests]

	constructor(basename: string, app: http.RequestListener) { // basename= 'graid7'
		this.port = 8443;
		this.keydir = "/Users/jpeck/keys/";
		this.keypath = this.keydir + basename + '.key.pem';
		this.certpath = this.keydir + basename + '.cert.pem';
		this.hostname = basename + '.thegraid.com';

		// cp ~/tomcat.key.pem ./sslcert/key.pem
		// cp ~/tomcat.cert.pem ./sslcert/cert.pem
		this.privateKey = fs.readFileSync(this.keypath, 'utf8');
		this.certificate = fs.readFileSync(this.certpath, 'utf8');
		this.credentials = { key: this.privateKey, cert: this.certificate };

		// function lookup(hostname: string, family: number, callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void): void;
		// function lookup(hostname: string, options: LookupOneOptions, callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void): void;
		// function lookup(hostname: string, options: LookupAllOptions, callback: (err: NodeJS.ErrnoException | null, addresses: LookupAddress[]) => void): void;
		// function lookup(hostname: string, options: LookupOptions, callback: (err: NodeJS.ErrnoException | null, address: string | LookupAddress[], family: number) => void): void;
		// function lookup(hostname: string, callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void): void;

		//const express = require('express');
		//var app = express();
		//... bunch of other express stuff here ...

		// lookup(this.hostname, () => { })
		dns.lookup(this.hostname, (err, addr, fam) => {
			console.log('rv=', {err: err, addr: addr, fam: fam});
			console.log('rv.address=%s', addr);
			if (err) console.log("Error", {code: err.code, error: err})
			else this.run_server(addr, this.port)
		})

		// async function dnslookup1 (name: string) {
		// 	const rv = await promisify(lookup)(name, 4);
		// 	console.log('rv=%s', rv);
		// 	console.log('rv.address=%s', rv.address);
		// 	return rv.address;
		// };
		// dnslookup1(this.hostname)
		// 	.then((addr) => this.run_server(addr, this.port))
		// 	.catch((error) => console.log(error));
	}

	dumpobj = (name, obj) => {
		console.log("dumping obj=" + name);
		if (obj) {
			for (let k in obj) {
				console.log(name + "." + k + "=" + obj[k]);
			}
		}
	};

	run_server = (host: string, port: number) => {
		console.log('try listen on %s:%d', host, port);
		//pass in your express app and credentials to create an https server
		let httpsServer = https.createServer(this.credentials, this.app).listen(port, host);
		console.log('listening on %s:%d', host, port);

		//const WebSocketServer = ws.Server;

		const opts: WSOpts = {
			//port: 8088,
			server: httpsServer,
			binaryType: 'arraybuffer',
			perMessageDeflate: false
		}

		const wss = new WebSocket.Server(opts); // or WebSocket.Server() if we get that to work

		console.log('d: %s starting: wss=%s', new Date(), wss);
		// 'req' has the http upgrade request: req.connection.remoteAddress
		wss.on('connection', function connection(ws, req) {
			ws.on('open', function open() {
				console.log('%s open', new Date().toTimeString());
			});

			ws.on('message', function incoming(message, flags) {
				// message appears to be a 'Buffer'
				console.log("%s received: message.length= %s, flags= %s, flags.binary=%s",
					new Date().toTimeString(), message.length, flags, (flags && flags.binary));
				ws.send(message, function ack(error) {
					if (!error) {
						console.log('%s sent: %s', new Date().toTimeString(), "success");
					} else {
						console.log('%s error: %s', new Date().toTimeString(), error);
					}
				});
			});

			ws.on('error', function err(e: { message: any; }) {
				console.log('%s error: %s', new Date(), e.message);
			});

			ws.on('close', function close() {
				console.log('%s disconnected', new Date());
			});

		});
	}
}

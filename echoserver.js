//> node index.js

// a WebSocket "echo" server
// listening and responding on wss://NAME.thegraid.com:PORT/
//
const fs = require('fs');
const https = require('https');

const name="game7";
const port=8443;
const keydir="/Users/jpeck/keys/";
const keypath =keydir+name+'.key.pem';
const certpath=keydir+name+'.cert.pem';
const hostname=name+'.thegraid.com';

// cp ~/tomcat.key.pem ./sslcert/key.pem
// cp ~/tomcat.cert.pem ./sslcert/cert.pem
var privateKey  = fs.readFileSync(keypath, 'utf8');
var certificate = fs.readFileSync(certpath, 'utf8');
var credentials = {key: privateKey, cert: certificate};

var app = null;
//const express = require('express');
//var app = express();
//... bunch of other express stuff here ...

const util = require('util');
const dns = require('dns');
const dnslookup = util.promisify(dns.lookup);

async function dnslookup1(name) {
    const rv = await dnslookup(hostname, 4);
    console.log('rv=%s', rv);
    console.log('rv.address=%s', rv.address);
    return rv.address;
}
    
var dumpobj=function(name,obj) {
    console.log("dumping obj="+name);
    if (obj) {
	for (let k in obj) {
	    console.log(name+"."+k+"="+obj[k]);
	}
    }
};

function run_server(host,port) {
    console.log('try listen on %s:%d', host, port);
    //pass in your express app and credentials to create an https server
    var httpsServer = https.createServer(credentials,app).listen(port, host);
    console.log('listening on %s:%d', host, port);

    const WebSocketServer = require('ws').Server;

    const wss = new WebSocketServer({
	//port: 8088,
	server: httpsServer,
	binaryType : 'arraybuffer',
	perMessageDeflate: false
    });
    
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
	
	ws.on('error', function err(e) {
	    console.log('%s error: %s', new Date(), e.message);
	});
	
	ws.on('close', function close() {
	    console.log('%s disconnected', new Date());
	});
	
    });
}

dnslookup1(hostname)
    .then((addr) => run_server(addr, port))
    .catch((error) => console.log(error));


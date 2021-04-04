var fs = require("fs");
var https = require("https");
var dns = require("dns");
var ws = require("ws");
'nodebuffer' | 'arraybuffer' | 'fragments';
/**
 * a Secure WebSocket Server (wss://)
 * listening and responding on wss://NAME.thegraid.com:PORT/
 */
var GameServer = (function () {
    function GameServer(basename, domain, port, keydir) {
        var _this = this;
        if (basename === void 0) { basename = "game7"; }
        if (domain === void 0) { domain = ".thegraid.com"; }
        if (port === void 0) { port = 8443; }
        if (keydir === void 0) { keydir = "/Users/jpeck/keys/"; }
        this.basename = "localhost";
        this.domain = ".local";
        this.hostname = this.basename + this.domain;
        this.port = 8443;
        this.keydir = "/Users/jpeck/keys/";
        this.keypath = this.keydir + this.basename + '.key.pem';
        this.certpath = this.keydir + this.basename + '.cert.pem';
        this.dumpobj = function (name, obj) {
            console.log("dumping obj=" + name);
            if (obj) {
                for (var k in obj) {
                    console.log(name + "." + k + "=" + obj[k]);
                }
            }
        };
        this.baseOpts = {
            binaryType: 'arraybuffer',
            perMessageDeflate: false
        };
        this.run_server = function (host, port) {
            var remote_addr;
            var wss = _this.make_wss_server(host, port);
            var connection = function (ws, req) {
                remote_addr = req.socket.remoteAddress;
                ws.on('open', function open() {
                    console.log('%s open', new Date().toTimeString());
                });
                ws.on('message', function incoming(message, flags) {
                    // message appears to be a 'Buffer'
                    console.log("%s received: message.length= %s, flags= %s, flags.binary=%s", new Date().toTimeString(), message.length, flags, (flags && flags.binary));
                    ws.send(message, function ack(error) {
                        if (!error) {
                            console.log('%s sent: %s', new Date().toTimeString(), "success");
                        }
                        else {
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
            };
            wss.on('connection', connection);
        };
        this.port = port;
        this.keydir = keydir;
        this.keypath = this.keydir + basename + '.key.pem';
        this.certpath = this.keydir + basename + '.cert.pem';
        this.hostname = basename + domain;
        this.credentials = this.getCredentials(this.keypath, this.certpath);
    }
    GameServer.prototype.run = function () {
        this.dnsLookup(this.hostname, this.run_server);
    };
    GameServer.prototype.dnsLookup = function (hostname, callback) {
        var _this = this;
        dns.lookup(hostname, function (err, addr, fam) {
            console.log('rv=', { err: err, addr: addr, fam: fam });
            console.log('rv.address=%s', addr);
            if (err)
                console.log("Error", { code: err.code, error: err });
            else
                callback(addr, _this.port);
        });
    };
    GameServer.prototype.getCredentials = function (keypath, certpath) {
        var privateKey = fs.readFileSync(this.keypath, 'utf8');
        var certificate = fs.readFileSync(this.certpath, 'utf8');
        return { key: privateKey, cert: certificate };
    };
    GameServer.prototype.wssUpgrade = function (httpsServer, opts) {
        if (opts === void 0) { opts = this.baseOpts; }
        opts.server = httpsServer;
        return new ws.Server(opts);
    };
    GameServer.prototype.make_wss_server = function (host, port) {
        console.log('try listen on %s:%d', host, port);
        //pass in your express app and credentials to create an https server
        var httpsServer = https.createServer(this.credentials, undefined).listen(port, host);
        console.log('listening on %s:%d', host, port);
        var wss = this.wssUpgrade(httpsServer);
        console.log('d: %s starting: wss=%s', new Date(), wss);
        return wss;
    };
    return GameServer;
})();
new GameServer("game7").run();

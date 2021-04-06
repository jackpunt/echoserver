import { CnxManager, EchoServer } from "wspbserver";
const theGraid = {
    domain: ".thegraid.com",
    port: 8443,
    keydir: "/Users/jpeck/keys/"
};
console.log("echoserver! ", new Date().toTimeString());
new CnxManager("game7", theGraid, EchoServer).run();
//# sourceMappingURL=echoserver.js.map
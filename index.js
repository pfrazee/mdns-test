import http from 'http'
import mdns from 'mdns'
 
const server = http.createServer((req, res) => {
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(4321);

const ad = mdns.createAdvertisement(mdns.tcp('http'), 4321)
ad.on('error', console.log)
ad.start();

const browser = mdns.createBrowser(mdns.tcp('http'));
browser.on('serviceUp', service => {
  console.log("service up: ", service);
});
browser.on('serviceDown', service => {
  console.log("service down: ", service);
});
browser.start();
export default defineEventHandler((event) => {
  console.log('event.node.req.url: ', event.node.req.url)
  // if (!event.node.req.url?.startsWith("/min/api")) return;

  // const target = new URL(event.node.req.url, "http://localhost:8080");

  // return proxyRequest(event, target.toString(), {
  //     headers: {
  //         host: target.host,
  //         origin: target.origin,
  //     },
  // });
});
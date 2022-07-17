import http from "http";
import app from "./app";
import config from "config";
import connect from "./utils/connect";
import log from "./utils/logger";

const PORT = config.get<number>("port");

const server = http.createServer(app);

server.listen(PORT, async () => {
  log.info(`server started on port ${PORT}`);
  await connect();
});

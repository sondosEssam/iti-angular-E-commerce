import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 10000;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`✅ JSON Server is running on port ${port}`);
});

import { Routes } from "./app/routes";
import { Server } from "./app/server";
import { ENVS } from "./lib/config/envs";

(async () => {
  const server = new Server({
    port: ENVS.PORT,
    routes: Routes.routes
  });

  server.start();
})();

import { envs } from "./config/envs";
import { AppRoutes } from "./features/core/presentation/routes";
import { Server } from "./features/core/presentation/server";

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}

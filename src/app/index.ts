import { Routes } from "./routes";
import { Server } from "./server";
import { ENVS } from '@/config/envs'

export function app() {
  const server = new Server({
    port: ENVS.PORT,
    routes: Routes.routes,
  });

  server.start();
}
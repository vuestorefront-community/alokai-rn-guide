import { type CreateServerOptions, createServer } from "@vue-storefront/middleware";
import { config } from "../middleware.config";

const developmentCorsConfig: CreateServerOptions["cors"] = {
  origin: true,
  credentials: true,
};
const port = Number(process.env.API_PORT) || 4000;

runApp();

async function runApp() {
  const app = await createServer(config, {
    cors: process.env.NODE_ENV === "development" ? developmentCorsConfig : undefined,
  });

  app.listen(port, "", () => {
    console.log(`API server listening on port ${port}`);

    if (process.env.IS_MULTISTORE_ENABLED === "false") {
      console.log("Multistore is not enabled");
      return;
    }
  });
}

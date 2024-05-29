import { Endpoints } from "@vsf-enterprise/sapcc-api";
import { buildModule, initSDK, middlewareModule } from "@vue-storefront/sdk";

const sdkConfig = {
  commerce: buildModule(middlewareModule<Endpoints>, {
    apiUrl: "http://localhost:8181/sapcc",
    cdnCacheBustingId: "",
  })
}

export const sdk = initSDK(sdkConfig);
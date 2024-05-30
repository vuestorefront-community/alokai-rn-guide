import { initSDK, buildModule, middlewareModule } from "@vue-storefront/sdk";
import { Endpoints as SapccEndpoints } from "@vsf-enterprise/sapcc-api";

const sdkConfig = {
  sapcc: buildModule(middlewareModule<SapccEndpoints>, {
    apiUrl: "http://localhost:8181/sapcc",
    cdnCacheBustingId: "",
  }),
};

export const sdk = initSDK(sdkConfig);
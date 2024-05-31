import { initSDK, buildModule, middlewareModule } from "@vue-storefront/sdk";
import { Endpoints as UnifiedEndpoints } from "@vsf-enterprise/unified-api-sapcc";

const sdkConfig = {
  commerce: buildModule(middlewareModule<UnifiedEndpoints>, {
    apiUrl: "http://localhost:4000/commerce",
    cdnCacheBustingId: "",
  }),
};

export const sdk = initSDK(sdkConfig);
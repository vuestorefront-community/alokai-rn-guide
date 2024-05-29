require("dotenv").config();

export const integrations = {
  sapcc: {
    location: "@vsf-enterprise/sapcc-api/server",
    configuration: {
      OAuth: {
        uri: process.env.SAPCC_OAUTH_URI,
        clientId: process.env.SAPCC_OAUTH_CLIENT_ID,
        clientSecret: process.env.SAPCC_OAUTH_CLIENT_SECRET,
        tokenEndpoint: process.env.SAPCC_OAUTH_TOKEN_ENDPOINT,
        tokenRevokeEndpoint: process.env.SAPCC_OAUTH_TOKEN_REVOKE_ENDPOINT,
        cookieOptions: {
          "vsf-sap-token": { secure: process.env.NODE_ENV !== "development" },
        },
      },
      api: {
        uri: process.env.SAPCC_API_URI,
        baseSiteId: "apparel-uk",
        catalogId: "apparelProductCatalog",
        catalogVersion: "Online",
        defaultLanguage: "en",
        defaultCurrency: "USD",
      },
    },
  },
};

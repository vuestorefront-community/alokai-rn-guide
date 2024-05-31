require('dotenv').config();
import type { MiddlewareConfig } from '@vsf-enterprise/sapcc-api';
import type { ApiClientExtension, Integration } from '@vue-storefront/middleware';
import { unifiedApiExtension } from './extensions/unified';

const {
  SAPCC_OAUTH_URI,
  SAPCC_OAUTH_CLIENT_ID,
  SAPCC_OAUTH_CLIENT_SECRET,
  SAPCC_OAUTH_TOKEN_ENDPOINT,
  SAPCC_OAUTH_TOKEN_REVOKE_ENDPOINT,
  SAPCC_API_URI,
  NODE_ENV
} = process.env;

if (!SAPCC_OAUTH_URI)
  throw new Error('Missing env var: SAPCC_OAUTH_URI');

if (!SAPCC_OAUTH_CLIENT_ID)
  throw new Error('Missing env var: SAPCC_OAUTH_CLIENT_ID');

if (!SAPCC_OAUTH_CLIENT_SECRET)
  throw new Error('Missing env var: SAPCC_OAUTH_CLIENT_SECRET');

if (!SAPCC_OAUTH_TOKEN_ENDPOINT)
  throw new Error('Missing env var: SAPCC_OAUTH_TOKEN_ENDPOINT');

if (!SAPCC_OAUTH_TOKEN_REVOKE_ENDPOINT)
  throw new Error('Missing env var: SAPCC_OAUTH_TOKEN_REVOKE_ENDPOINT');

if (!SAPCC_API_URI)
  throw new Error('Missing env var: SAPCC_API_URI');

export const config = {
  location: '@vsf-enterprise/sapcc-api/server',

  configuration: {
    OAuth: {
      uri: SAPCC_OAUTH_URI,
      clientId: SAPCC_OAUTH_CLIENT_ID,
      clientSecret: SAPCC_OAUTH_CLIENT_SECRET,
      tokenEndpoint: SAPCC_OAUTH_TOKEN_ENDPOINT,
      tokenRevokeEndpoint: SAPCC_OAUTH_TOKEN_REVOKE_ENDPOINT,

      cookieOptions: {
        'vsf-sap-token': {
          secure: NODE_ENV !== 'development'
        }
      }
    },

    api: {
      uri: SAPCC_API_URI,
      baseSiteId: 'apparel-uk',
      catalogId: 'apparelProductCatalog',
      catalogVersion: 'Online',
      defaultLanguage: 'en',
      defaultCurrency: 'USD'
    }
  },
  extensions: (extensions: ApiClientExtension[]) => [
    ...extensions,
    unifiedApiExtension
  ]
} satisfies Integration<MiddlewareConfig>;
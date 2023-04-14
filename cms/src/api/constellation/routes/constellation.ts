/**
 * constellation router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::constellation.constellation', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    }
  },
});

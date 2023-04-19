/**
 * passive router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::passive.passive', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    }
  },
});

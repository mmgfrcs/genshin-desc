/**
 * character router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::character.character', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    }
  },
});

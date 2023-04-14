import { Strapi,  } from '@strapi/strapi'
import fs from 'fs'
import { PluginI18NLocale } from '../schemas'
import loadContent from './load-content'

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: {strapi: Strapi}) {
    //Load content
    await loadContent(strapi)
  },

  async destroy({ strapi }: {strapi: Strapi}) {
    strapi.log.info("Shutdown")
    //strapi.log.info(await strapi.entityService.findMany("api::character.character", {populate: "*"}))
    //console.log()
  }
};


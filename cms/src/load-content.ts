import { Strapi } from '@strapi/strapi'
import fs from 'fs'

// Load content to Strapi
export default async function loadContent(strapi: Strapi) {
  strapi.log.info("Begin Import")
  let contentDir = fs.readdirSync(`../content`, {withFileTypes: true})
  //Get possible codes
  let isoCodes: { name: string, code: string }[] = strapi.services['plugin::i18n.iso-locales'].getIsoLocales()

  for (let i = 0; i < contentDir.length; i++) {
    if(!contentDir[i].isDirectory()) continue;
    let currLocale = isoCodes.find(x=>x.code === contentDir[i].name)
    if(currLocale === undefined) {
      strapi.log.warn(`ISO Code ${contentDir[i].name} does not exist. Skipping`)
      continue
    }
    //Check if locale exists, create locale if it doesn't
    let locale: { name: string, code: string }[] = await strapi.entityService.findMany("plugin::i18n.locale", {filters: {code: contentDir[i].name}})
    if(locale.length === 0) await strapi.entityService.create("plugin::i18n.locale", {data: currLocale})

    //Load the files in this folder
    let localeContentDir = fs.readdirSync(`../content/${currLocale.code}/characters`)
    for (let j = 0; j < localeContentDir.length/9; j++) {

      let charStr = fs.readFileSync(`../content/${currLocale.code}/characters/${localeContentDir[j]}`, {encoding: 'utf8'})
      let charObj: any = {}
      try {
        charObj = JSON.parse(charStr)
      } catch (e) {
        strapi.log.error(`File ${localeContentDir[j]} cannot be parsed as JSON. Skipping`)
        continue
      }
      strapi.log.info(`Importing ${charObj.name}`)
      if((await strapi.entityService.findMany("api::character.character", {filters: {charId: charObj.id}})).length > 0) {
        strapi.log.info(`Character ${charObj.name} already exists. Skipping`)
        continue
      }

      charObj.charId = charObj.id
      charObj.id = undefined

      let passiveIds = []
      for (const passive of charObj.passives) {
        passiveIds.push(await strapiCreateAndUpload(passive, strapi, "api::passive.passive", charObj.charId, false))
      }
      let talentIds = []
      for (const talent of charObj.talents) {
        talentIds.push(await strapiCreateAndUpload(talent, strapi, "api::talent.talent", charObj.charId, false))
      }
      let consIds = []
      for (const cons of charObj.constellations) {
        consIds.push(await strapiCreateAndUpload(cons, strapi, "api::constellation.constellation", charObj.charId, true))
      }
      charObj.passives = {set: passiveIds}
      charObj.talents = {set: talentIds}
      charObj.constellations = {set: consIds}


      if(charObj.icon && charObj.icon !== "data:,")
        charObj.icon = {set: [await uploadOrSetImage(`${charObj.charId}-icon`, charObj.icon, "image;/webp")]}
      else charObj.icon = {set: []}

      if(charObj.portrait && charObj.portrait !== "data:,")
        charObj.portrait = {set: [await uploadOrSetImage(`${charObj.charId}-portrait`, charObj.portrait, "image;/webp")]}
      else charObj.portrait = {set: []}

      await strapi.entityService.create("api::character.character", {data: charObj})
      strapi.log.info(`Character ${charObj.name} imported`)
    }
  }
}


async function strapiCreateAndUpload(item: any, strapi: Strapi, entityUid: string, charId: string, isConstellation: boolean) {
  let existing = await strapi.entityService.findMany(entityUid, {filters: {name: item.name}})
  if(existing.length > 0)
    return existing[0].id

  if(item.icon) {
    item.icon = {set: [await uploadOrSetImage(`${charId}-${(isConstellation ? 'constellation-'+item.level : item.type)}`, item.icon, "image/webp")]}
  } else item.icon = {set: []}

  let imgIds = []

  if(item.images && item.images.length > 0) {
    for (let i = 0; i < item.images.length; i++) {
      imgIds.push(await uploadOrSetImage(`${charId}-${item.type}-img${i+1}`, item.images[i], "image/gif"))
    }
    item.images = {set: imgIds}
  } else item.images = {set: []}

  return (await strapi.entityService.create(entityUid, {data: item})).id
}

async function uploadOrSetImage(name: string, path: string, type: string) {
  let existing = await strapi.services['plugin::upload.upload'].findMany({filters: {name}})
  if(existing.length > 0) return existing[0].id

  let file = await strapi.services['plugin::upload.upload'].upload({data: {}, files: {name, path: '../public' + path, type, size: type === "image/gif" ? fs.statSync('../public' + path).size : undefined}})
  return file[0].id
}

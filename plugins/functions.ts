import { defineNuxtPlugin } from '#app'
import anime from 'animejs'

export default defineNuxtPlugin(({ vueApp }) => {
  return {
    provide: {
      utilities: {
        processDamageTypeColor(dType: string) {
          return dType.replaceAll(/(?:AoE )?([A-Za-z]+) DMG(?: Bonus)?/g, (substring: string, cg1: string) => {
            switch (cg1) {
              case "Pyro":
                return `<span class="text-red-400">${substring}</span>`
              case "Cryo":
                return `<span class="text-blue-400">${substring}</span>`
              case "Electro":
                return `<span class="text-violet-400">${substring}</span>`
              case "Geo":
                return `<span class="text-yellow-400">${substring}</span>`
              case "Anemo":
                return `<span class="text-cyan-400">${substring}</span>`
              case "Hydro":
                return `<span class="text-blue-400">${substring}</span>`
              case "Dendro":
                return `<span class="text-green-400">${substring}</span>`
              case "Physical":
                return `<span class="text-gray-400">${substring}</span>`
              default:
                return substring
            }
          })
        },
        titleCase(str: string) {
          return `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`
        },
        getWeaponIconSrc(weapon: string) {
          switch(weapon) {
            case "SWORD":
              return "/img/icons/weapons/sword.svg"
            case "BOW":
              return "/img/icons/weapons/bow.svg"
            case "CLAYMORE":
              return "/img/icons/weapons/claymore.svg"
            case "POLEARM":
              return "/img/icons/weapons/polearm.svg"
            case "CATALYST":
              return "/img/icons/weapons/catalyst.svg"
            default:
              return weapon
          }
        },
        getTalentTypeStr(type: string) {
          switch(type) {
            case "normal":
              return "Normal Attack"
            case "skill":
              return "Elemental Skill"
            case "burst":
              return "Elemental Burst"
            case "alt":
              return "Alternate Sprint"
            default:
              return type
          }
        },
        getPassiveTypeStr(type: string){
          switch(type) {
            case "asc1":
              return "Ascension 2 Passive"
            case "asc2":
              return "Ascension 4 Passive"
            case "utility":
              return "Utility Passive"
            case "misc":
              return "Miscellaneous Passive"
            default:
              return type
          }
        }
      }
    }
  }
})
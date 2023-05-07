import {GenshinElement, GenshinPassiveType, GenshinTalentType, GenshinWeapon} from "./util";

/**
 * Genshin Impact's Character definition
 */
export interface Character {
  /**
   * Character's unique ID. Cannot contain spaces
   * @pattern ^[a-z][a-z0-9\-]*
   */
  id: string,
  /**
   * Character Name
   */
  name: string,
  /**
   * Character Icon to be displayed in the list, alongside name, rarity, weapon and element
   */
  icon: string,
  portrait: string,
  rarity: number,
  element: Lowercase<GenshinElement>
  weapon: Uppercase<GenshinWeapon>,
  talents: CharacterTalent[],
  passives: CharacterPassive[],
  constellations: CharacterConstellation[],
  tags: string[]
}

export interface CharacterTalent {
  type: GenshinTalentType,
  icon: string,
  name: string,
  images: string[],
  stats: GenshinStat[],
  description: GenshinDescription[],
  originalDescription: GenshinDescription[],
  notes: GenshinDescription[]
}

export interface CharacterPassive {
  type: GenshinPassiveType,
  icon: string,
  name: string,
  stats: GenshinStat[],
  description: GenshinDescription[]
  originalDescription: GenshinDescription[]
  notes: GenshinDescription[]
}

export interface CharacterConstellation {
  /**
   * Constellation level
   * @minimum 1
   * @maximum 6
   */
  level: number,
  icon: string,
  name: string,
  related?: {
    type: GenshinTalentType | GenshinPassiveType,
    description: GenshinDescription[]
  }
  description: GenshinDescription[]
  originalDescription: GenshinDescription[]
  notes: GenshinDescription[]
}

export interface GenshinDescription {
  text: string,
  style?: "subtitle" | "paragraph"
}

export interface GenshinStat {
  key: string
  values: string[]
}


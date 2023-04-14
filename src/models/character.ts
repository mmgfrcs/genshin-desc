import {GenshinElement, GenshinPassiveType, GenshinTalentType, GenshinWeapon} from "~/src/models/util";

export interface Character {
  id: string,
  name: string,
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
  description: GenshinDescription[]
  originalDescription: GenshinDescription[]
  notes: GenshinDescription[]
}

export interface CharacterPassive {
  type: GenshinPassiveType,
  icon: string,
  name: string,
  description: GenshinDescription[]
  originalDescription: GenshinDescription[]
  notes: GenshinDescription[]
}

export interface CharacterConstellation {
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
  style?: "subtitle"
}

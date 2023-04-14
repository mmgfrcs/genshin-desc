import {GenshinElement, GenshinWeapon} from "~/src/models/util";

export interface ApiCharacter {
  name: string
  title: string
  vision: GenshinElement
  weapon: string
  nation: string
  affiliation: string
  rarity: number
  constellation: string
  birthday: string
  description: string
  skillTalents: ApiSkillTalent[]
  passiveTalents: ApiPassiveTalent[]
  constellations: ApiConstellation[]
  vision_key: Uppercase<GenshinElement>
  weapon_type: Uppercase<GenshinWeapon>
}

export interface ApiSkillTalent {
  name: string
  unlock: string
  description: string
  upgrades: ApiSkillUpgrade[]
  type?: string
}

export interface ApiSkillUpgrade {
  name: string
  value: string
}

export interface ApiPassiveTalent {
  name: string
  unlock: string
  description: string
  level?: number
}

export interface ApiConstellation {
  name: string
  unlock: string
  description: string
  level: number
}

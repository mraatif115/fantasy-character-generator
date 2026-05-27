export interface CharacterAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type CharacterClassType =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Cleric'
  | 'Ranger'
  | 'Paladin'
  | 'Bard'
  | 'Druid'
  | 'Warlock'
  | 'Necromancer'
  | 'Barbarian'
  | 'Alchemist';

export type CharacterRaceType =
  | 'Human'
  | 'Elf'
  | 'Dwarf'
  | 'Halfling'
  | 'Orc'
  | 'Tiefling'
  | 'Dragonborn'
  | 'Gnome';

export type CharacterAlignmentType =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface Character {
  id: string;
  name: string;
  class: CharacterClassType;
  race: CharacterRaceType;
  alignment: CharacterAlignmentType;
  attributes: CharacterAttributes;
  bio: string;
  inventory: string[];
  level: number;
  healthPoints: number;
  gold: number;
  createdTime: string;
  portrait?: string;
}

export interface ClassMetadata {
  name: CharacterClassType;
  description: string;
  primaryStats: (keyof CharacterAttributes)[];
  icon: string; // Icon name matching Lucide icon identifier
  colorClass: {
    bg: string;
    text: string;
    border: string;
    accent: string;
    glow: string;
  };
  startingItemsPool: string[];
  biosPool: string[];
}

export interface RaceMetadata {
  name: CharacterRaceType;
  description: string;
  bonuses: Partial<CharacterAttributes>;
  trait: string;
  traitDescription: string;
}

import { Character } from '../types';

export interface CardStats {
  health: number;
  mana: number;
  strength: number;
}

/**
 * Deterministically derives TCG/CCG-style card vitals (Health, Mana, Strength) 
 * based on the character's core attributes, class, and level.
 */
export function getCardStats(character: Character): CardStats {
  // Use a simple hash of character ID to introduce some unique flavor variance
  let hash = 0;
  for (let i = 0; i < character.id.length; i++) {
    hash = character.id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const variance = Math.abs(hash) % 5; // 0 to 4 variance

  // strength: based heavily on the Strength attribute, level, and class
  const baseStrength = character.attributes.strength;
  const strengthVal = Math.round(baseStrength + (character.level * 0.5) + (variance * 0.25));

  // health: based on HP
  const healthVal = character.healthPoints;

  // mana: Mages/Casters have high mana; non-casters have low or zero mana
  const magicClasses = ['Mage', 'Warlock', 'Necromancer', 'Cleric', 'Druid', 'Alchemist', 'Bard', 'Paladin'];
  const isCaster = magicClasses.includes(character.class);
  
  let manaVal = 0;
  if (isCaster) {
    const spellStat = character.class === 'Cleric' || character.class === 'Druid' 
      ? character.attributes.wisdom 
      : character.attributes.intelligence;
    
    manaVal = Math.round(spellStat * 3.5 + (character.level * 8) + variance * 2);
  } else {
    // Non-casters get minimal resource pool from wisdom/intelligence
    manaVal = Math.round((character.attributes.intelligence + character.attributes.wisdom) / 1.5 + (variance));
  }

  return {
    health: healthVal,
    mana: manaVal,
    strength: strengthVal,
  };
}

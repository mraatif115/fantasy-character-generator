import { Character, CharacterAttributes, CharacterClassType, CharacterRaceType, CharacterAlignmentType, ClassMetadata, RaceMetadata } from './types';

export const FIRST_NAMES = [
  'Alistair', 'Thorne', 'Lyra', 'Galdor', 'Valerius', 'Zephyr', 'Eldrin', 'Morrigan', 'Sylvan', 'Faelar',
  'Kaelen', 'Rowan', 'Vaelen', 'Thraden', 'Dax', 'Ignis', 'Seraphina', 'Oliver', 'Morgana', 'Bran',
  'Evelyn', 'Rhys', 'Aethelgard', 'Gwyneth', 'Thalia', 'Kaelen', 'Fiona', 'Sariel', 'Elandra', 'Gideon',
  'Cassian', 'Vesper', 'Caelum', 'Theron', 'Brynhild', 'Elowen', 'Malakor', 'Drakon', 'Dorian', 'Nicos',
  'Beren', 'Luthien', 'Eomer', 'Arwen', 'Eowyn', 'Faramir', 'Gimli', 'Legolas', 'Boromir', 'Galadriel'
];

export const EPITHETS = [
  'the Scholar', 'the Swift', 'the Ironhearted', 'the Whisperer', 'the Unbroken', 'the Seeker of Runes',
  'the Flamebearer', 'the Spell-weaver', 'the Crimson', 'the Bold', 'the Quiet', 'the Undying',
  'of the Whispering Woods', 'of the Gilded Path', 'the Stormbringer', 'the Vagabond', 'the Harbinger',
  'of Eldoria', 'the Shadow-dancer', 'the Oath-Keeper', 'the Light-bringer', 'the Wild', 'the Silver-tongued',
  'of the Ironwood', 'the Redeemer', 'the Exile', 'the Wayfarer', 'the Nightfall', 'the Dawn-herald',
  'the Relentless'
];

export const SURNAME_PREFIXES = [
  'Shadow', 'Iron', 'Gold', 'Storm', 'Oak', 'Silver', 'Night', 'Frost', 'Whisper', 'Flame',
  'Stone', 'Gale', 'Sun', 'Wild', 'Raven', 'Wyvern', 'Bright', 'Swift', 'Rune', 'Dawn',
  'Dusk', 'Ashen', 'Deep', 'High', 'Ember', 'Mist', 'Wolf', 'Bear', 'Drake', 'Thorn'
];

export const SURNAME_SUFFIXES = [
  'weaver', 'heart', 'shield', 'strider', 'wood', 'blade', 'bloom', 'caller', 'ward', 'chaser',
  'fury', 'glade', 'gaze', 'binder', 'fist', 'forge', 'blood', 'song', 'shaper', 'cliff',
  'glen', 'brook', 'bane', 'runner', 'weaver', 'stalker', 'weaver', 'striker', 'drifter', 'weaver'
];

export const CLASSES_METADATA: Record<CharacterClassType, ClassMetadata> = {
  Warrior: {
    name: 'Warrior',
    description: 'A master of martial combat, skilled in a variety of weapons and armor types.',
    primaryStats: ['strength', 'constitution'],
    icon: 'Sword',
    colorClass: {
      bg: 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/40',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-500/20',
      accent: 'bg-red-500 text-white',
      glow: 'shadow-red-500/10'
    },
    startingItemsPool: [
      'Forge-tempered Broadsword',
      'Heavy Steel Kite Shield',
      'Scratched Steel Plate Mail',
      'Leather-wrapped Whetstone',
      'Iron Rations'
    ],
    biosPool: [
      'An honorable knight exiled from their realm for challenging a corrupt noble.',
      'A rugged mercenary who fights for gold but fights harder for those who cannot defend themselves.',
      'A former gladiator champion who escaped the fighting pits seeking a peaceful path, yet knows only the sword.'
    ]
  },
  Mage: {
    name: 'Mage',
    description: 'A scholarly spellcaster who manipulates the fabric of reality with intense study and intellect.',
    primaryStats: ['intelligence', 'wisdom'],
    icon: 'Sparkles',
    colorClass: {
      bg: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/40',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-500/20',
      accent: 'bg-blue-500 text-white',
      glow: 'shadow-blue-500/10'
    },
    startingItemsPool: [
      'Glow-infused Oak Spellstaff',
      'Tattered Spellbook in Ancient Script',
      'Deep Velvet Scholar Robes',
      'Prismatic Focus Crystal',
      'Vial of Glowing Ink'
    ],
    biosPool: [
      'A brilliant student expelled from the High Arcane Academy for researching forbidden temporal anomalies.',
      'An eccentric hermit who spent centuries studying the alignment of cosmic ley lines in an isolated tower.',
      'A magic-weaver seeking ancient forgotten vaults to safeguard crumbling magic scrolls before they fade.'
    ]
  },
  Rogue: {
    name: 'Rogue',
    description: 'A visual shadow specializing in stealth, lockpicking, agility, and opportunistic combat tactics.',
    primaryStats: ['dexterity', 'charisma'],
    icon: 'Feather',
    colorClass: {
      bg: 'bg-slate-100 border-slate-300 dark:bg-slate-900/40 dark:border-slate-800/60',
      text: 'text-slate-700 dark:text-slate-300',
      border: 'border-slate-500/20',
      accent: 'bg-slate-700 text-white dark:bg-slate-600',
      glow: 'shadow-slate-500/10'
    },
    startingItemsPool: [
      'Twin Balanced Poison Daggers',
      'Polished Brass Thievery Tools',
      'Charcoal Shadow-Weave Cloak',
      'Bag of Fine Soporific Sand',
      'Forged Crest Ledger'
    ],
    biosPool: [
      'A charismatic cat burglar who only targets the overly greedy to fund local orphanages.',
      'A nimble spy who learned their trade in the dark alleys of the capital, betraying a guild to run free.',
      'A legendary bounty explorer looking to clear their name after being framed for the heist of the Duke’s medallion.'
    ]
  },
  Cleric: {
    name: 'Cleric',
    description: 'A devout priest who channels holy divine power to mend injuries and smite evil forces.',
    primaryStats: ['wisdom', 'constitution'],
    icon: 'ShieldAlert',
    colorClass: {
      bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-500/20',
      accent: 'bg-amber-500 text-white',
      glow: 'shadow-amber-500/10'
    },
    startingItemsPool: [
      'Gilded Iron Blessing Mace',
      'Silver Hand-Carved Holy Relic',
      'Sturdy Ring-Mail Vestments',
      'Jar of Soothing Miraculous Salve',
      'Scented White Altar Candles'
    ],
    biosPool: [
      'A humble village healer who heard a celestial voice calling them to venture into the dangerous outer wild.',
      'An inquisitor of the divine light searching for hidden corruption festering deep inside holy sanctuaries.',
      'A solemn guardian of the dead, journeying to purge rising undeath and bring final peace to restless ghosts.'
    ]
  },
  Ranger: {
    name: 'Ranger',
    description: 'An expert survivalist, marksman, and tracker who lives in harmony with nature.',
    primaryStats: ['dexterity', 'wisdom'],
    icon: 'Compass',
    colorClass: {
      bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-500/20',
      accent: 'bg-emerald-500 text-white',
      glow: 'shadow-emerald-500/10'
    },
    startingItemsPool: [
      'Flexed Yew Wood Composite Bow',
      'Leather Quiver with Broadhead Arrows',
      'Camouflage Green Forest Cloak',
      'Heavy Spring-loaded Bear Trap',
      'Dried Boar Jerky'
    ],
    biosPool: [
      'A silent warden of the border forest who tracks dark threats creeping in from forgotten ancient wastes.',
      'An outcast scout who was raised by wild wolves after their homestead was lost to raiders.',
      'A professional royal tracker who left her king\'s service when ordered to hunt down innocent refugees.'
    ]
  },
  Paladin: {
    name: 'Paladin',
    description: 'A crusader of pure righteousness sworn to a sacred oath, clad in gleaming armor.',
    primaryStats: ['strength', 'charisma'],
    icon: 'Shield',
    colorClass: {
      bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/10 dark:border-yellow-900/40',
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-500/20',
      accent: 'bg-yellow-500 text-white',
      glow: 'shadow-yellow-500/10'
    },
    startingItemsPool: [
      'Consecrated Steel Morningstar',
      'Polished Brass Bastion Greatshield',
      'Gleaming Heavy Vanguard Plate Armor',
      'Bound Leather Book of Sacred Vows',
      'Holy Water Flask'
    ],
    biosPool: [
      'A knight commander who gave up her luxurious rank to fulfill an ancient, dangerous prophecy.',
      'A passionate zealot who believes they are the direct instrument of a glorious sun deity.',
      'An oathbreaker looking for redemption after failing to defend their previous lord from assassination.'
    ]
  },
  Bard: {
    name: 'Bard',
    description: 'An artistic performer who weaves melodies, stories, and words into powerful magical spells.',
    primaryStats: ['charisma', 'dexterity'],
    icon: 'Music',
    colorClass: {
      bg: 'bg-pink-50 border-pink-200 dark:bg-pink-950/20 dark:border-pink-900/40',
      text: 'text-pink-700 dark:text-pink-400',
      border: 'border-pink-500/20',
      accent: 'bg-pink-500 text-white',
      glow: 'shadow-pink-500/10'
    },
    startingItemsPool: [
      'Inlaid Mahogany Masterwork Lute',
      'Silver-hilted Decorative Dagger',
      'Embroided Silk Performer Doublet',
      'Book of Witty Satires & Riddles',
      'Small Flute of Quickening'
    ],
    biosPool: [
      'A scandalous lyricist fleeing from three different towns for writing clever satirical poems about local mayors.',
      'An ancient dynasty scholar who translates forgotten historical epics into popular Tavern ballads.',
      'A traveling illusionist seeking the legendary "Siren Chord" that can supposedly heal any broken heart.'
    ]
  },
  Druid: {
    name: 'Druid',
    description: 'A warden of primal balance who calls upon plant growth, storm winds, and wild beast shapes.',
    primaryStats: ['wisdom', 'constitution'],
    icon: 'Sprout',
    colorClass: {
      bg: 'bg-teal-50 border-teal-200 dark:bg-teal-950/20 dark:border-teal-900/40',
      text: 'text-teal-700 dark:text-teal-400',
      border: 'border-teal-500/20',
      accent: 'bg-teal-500 text-white',
      glow: 'shadow-teal-500/10'
    },
    startingItemsPool: [
      'Primal Staghorn Druidic Focus Staff',
      'Fossilized Flint Stone Sickle',
      'Scented Moss-woven Leather Tunic',
      'Bag of Seedlings & Rare Spores',
      'Carved Wooden Totem of the Bear'
    ],
    biosPool: [
      'A guardian of a sacred grove who entered the world when the ancient world tree began weeping black sap.',
      'A hermit who forgot how to speak human tongue after spending twenty years living in squirrel shape.',
      'A storm disciple seeking to appease the angry spirits of volcanoes and ocean monsoons.'
    ]
  },
  Warlock: {
    name: 'Warlock',
    description: 'A seeker of forgotten lore who bargained with an ancient patron for terrifying otherworldly powers.',
    primaryStats: ['charisma', 'intelligence'],
    icon: 'Eye',
    colorClass: {
      bg: 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-900/40',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-500/20',
      accent: 'bg-purple-500 text-white',
      glow: 'shadow-purple-500/10'
    },
    startingItemsPool: [
      'Black Obsidian Pact Dagger',
      'Shadowy Eye Grimoire bound in chitin',
      'Ashen Threaded High-Collar Cloak',
      'Incense of Void-Calling',
      'Twitching Eldritch Talisman'
    ],
    biosPool: [
      'A desperate aristocrat who offered their soul to an oceanic entity to prevent their shipping empire from sinking.',
      'A curious astronomer who peeped through a brass spyglass and glimpsed an ancient star that stared right back.',
      'A tomb burglar who accidentally signed a contract written in dust with a sleeping archfey lord.'
    ]
  },
  Necromancer: {
    name: 'Necromancer',
    description: 'A forbidden dark-mage manipulating life force, souls, and the energy of decay.',
    primaryStats: ['intelligence', 'charisma'],
    icon: 'Skull',
    colorClass: {
      bg: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/40',
      text: 'text-indigo-700 dark:text-indigo-400',
      border: 'border-indigo-500/20',
      accent: 'bg-indigo-500 text-white',
      glow: 'shadow-indigo-500/10'
    },
    startingItemsPool: [
      'Ivory Bone Wand tipped in sapphire',
      'Engraved Lead Soul Urn',
      'Soot-Stained Mourning Shroud',
      'Dried Gargoyle Talon',
      'Jar of Embalming Salts'
    ],
    biosPool: [
      'A grieving doctor who turned to the dark arts to pull their sibling’s spirit back from the spirit veil.',
      'A renegade church monk who realized the dead are far better listeners and companions than the living.',
      'An ancient bloodline heir attempting to command ancestral spirits to restore their fallen kingdom.'
    ]
  },
  Barbarian: {
    name: 'Barbarian',
    description: 'A fierce primal warrior whose combat style is fueled by unbridled rage and absolute strength.',
    primaryStats: ['strength', 'constitution'],
    icon: 'Flame',
    colorClass: {
      bg: 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/40',
      text: 'text-orange-700 dark:text-orange-400',
      border: 'border-orange-500/20',
      accent: 'bg-orange-500 text-white',
      glow: 'shadow-orange-500/10'
    },
    startingItemsPool: [
      'Colossal Double-Bitted Iron Battleaxe',
      'Thick Winter Bear-Pelt Mantle',
      'Hardened Leather Armbraces',
      'Necklace of Sabertooth Fangs',
      'Ox-Horn Flask filled with potent Mead'
    ],
    biosPool: [
      'A proud tribal champion searching for a mythical glacier flower to cure their chieftain\'s sleeping curse.',
      'A wanderer whose entire village was swallowed by a sinkhole, leading them to search the earth for subterranean monsters.',
      'A berserker exile who refuses to fight unless their rage is justified by absolute injustice.'
    ]
  },
  Alchemist: {
    name: 'Alchemist',
    description: 'An experimental researcher who crafts elemental potions, brews, and explosive volatile salts.',
    primaryStats: ['intelligence', 'dexterity'],
    icon: 'FlaskConical',
    colorClass: {
      bg: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/20 dark:border-cyan-900/40',
      text: 'text-cyan-700 dark:text-cyan-400',
      border: 'border-cyan-500/20',
      accent: 'bg-cyan-500 text-white',
      glow: 'shadow-cyan-500/10'
    },
    startingItemsPool: [
      'Satchel of Volatile Acidic Flasks',
      'Heavy Bronze Pestle & Mortar',
      'Acid-Singe Reinforced Apron',
      'Pouch of Quickcombust Catalyst Salts',
      'Notebook of Coded Formulations'
    ],
    biosPool: [
      'An apothecary searching the world for the fabled philosopher\'s stone to cure mortality itself.',
      'A commercial brewer who accidentally blew up their brewery while trying to invent an instantly self-cooling cider.',
      'A quiet field researcher collecting toxic spores in hazardous ancient dungeon depths.'
    ]
  }
};

export const RACES_METADATA: Record<CharacterRaceType, RaceMetadata> = {
  Human: {
    name: 'Human',
    description: 'Versatile, highly adaptable, and incredibly ambitious, humans are found in every corner of the mortal realm.',
    bonuses: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
    trait: 'Endless Ambition',
    traitDescription: 'Grants +1 to all six core attributes, adapting easily to any path chosen.'
  },
  Elf: {
    name: 'Elf',
    description: 'Elegant, long-lived scholars of ancient history, magic, and pristine natural forests.',
    bonuses: { dexterity: 2, intelligence: 1 },
    trait: 'Arcane Senses',
    traitDescription: 'High dexterity and acute perception allow elves to detect hidden paths and magical traps.'
  },
  Dwarf: {
    name: 'Dwarf',
    description: 'Stout, proud, and incredibly resilient craftsmen raised in towering mountain halls and depth-smelters.',
    bonuses: { constitution: 2, strength: 1 },
    trait: 'Stoneborn Fortitude',
    traitDescription: 'Natural resistance to poisons and injury. High constitution and iron-like muscle.'
  },
  Halfling: {
    name: 'Halfling',
    description: 'Nimble, warm-hearted folk who value delicious food, peaceful comfort, and simple visual jokes.',
    bonuses: { dexterity: 2, charisma: 1 },
    trait: 'Halfling Luck',
    traitDescription: 'Extremely nimble hands. Able to pull triumph out of catastrophic misfortune by sheer luck.'
  },
  Orc: {
    name: 'Orc',
    description: 'Proud survivalists driven by physical dominance, honor, and tribal lineage under harsh elements.',
    bonuses: { strength: 2, constitution: 1 },
    trait: 'Primal Endure',
    traitDescription: 'Once per long rest, can endure a critical strike that would knock them out, remaining standing.'
  },
  Tiefling: {
    name: 'Tiefling',
    description: 'Mortal folks who carry a trace of ancient fiendish lineage, marked by elegant horns and magnetic presence.',
    bonuses: { charisma: 2, intelligence: 1 },
    trait: 'Hellfire Brand',
    traitDescription: 'Innate resistance to fire and heat, with a dramatic flair that increases social influence.'
  },
  Dragonborn: {
    name: 'Dragonborn',
    description: 'Noble draconian clansmen who share heritage, pride, and elemental breath with ancient dragons.',
    bonuses: { strength: 2, charisma: 1 },
    trait: 'Elemental Breath',
    traitDescription: 'Can exhale a cone of elemental destructive energy (Fire, Frost, or Lightning) in combat.'
  },
  Gnome: {
    name: 'Gnome',
    description: 'Whimsical, curious, and energetic engineers who build intricate clocks, toys, and magical widgets.',
    bonuses: { intelligence: 2, dexterity: 1 },
    trait: 'Tinker\'s Spark',
    traitDescription: 'Excellent mechanical aptitude. Can create clockwork devices and read complex technical runes instantly.'
  }
};

export const ALIGNMENTS: CharacterAlignmentType[] = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

// Helper to roll a standard D&D D6-based 3d6 attribute score of 3-18
function rollAttribute(): number {
  const roll1 = Math.floor(Math.random() * 6) + 1;
  const roll2 = Math.floor(Math.random() * 6) + 1;
  const roll3 = Math.floor(Math.random() * 6) + 1;
  return roll1 + roll2 + roll3;
}

export function generateRandomCharacter(options: {
  lockedClass?: CharacterClassType | null;
  lockedRace?: CharacterRaceType | null;
  lockedAlignment?: CharacterAlignmentType | null;
} = {}): Character {
  // Determine Class
  const classList = Object.keys(CLASSES_METADATA) as CharacterClassType[];
  const selectedClass = options.lockedClass && classList.includes(options.lockedClass)
    ? options.lockedClass
    : classList[Math.floor(Math.random() * classList.length)];

  // Determine Race
  const raceList = Object.keys(RACES_METADATA) as CharacterRaceType[];
  const selectedRace = options.lockedRace && raceList.includes(options.lockedRace)
    ? options.lockedRace
    : raceList[Math.floor(Math.random() * raceList.length)];

  // Determine Alignment
  const selectedAlignment = options.lockedAlignment && ALIGNMENTS.includes(options.lockedAlignment)
    ? options.lockedAlignment
    : ALIGNMENTS[Math.floor(Math.random() * ALIGNMENTS.length)];

  // Create Random Name
  const baseName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const useSurnameStyle = Math.random() < 0.65;
  let finalName = '';
  
  if (useSurnameStyle) {
    const prefix = SURNAME_PREFIXES[Math.floor(Math.random() * SURNAME_PREFIXES.length)];
    const suffix = SURNAME_SUFFIXES[Math.floor(Math.random() * SURNAME_SUFFIXES.length)];
    finalName = `${baseName} ${prefix}${suffix}`;
  } else {
    const epithet = EPITHETS[Math.floor(Math.random() * EPITHETS.length)];
    finalName = `${baseName} ${epithet}`;
  }

  // Generate Base Attributes
  const attributes: CharacterAttributes = {
    strength: rollAttribute(),
    dexterity: rollAttribute(),
    constitution: rollAttribute(),
    intelligence: rollAttribute(),
    wisdom: rollAttribute(),
    charisma: rollAttribute()
  };

  // Enhance primary stats for the class to ensure they make logical sense
  const classMeta = CLASSES_METADATA[selectedClass];
  classMeta.primaryStats.forEach((stat) => {
    // Boost primary stats so characters are competent in their field
    attributes[stat] = Math.max(attributes[stat], Math.floor(Math.random() * 4) + 13); // 13-16 minimum
  });

  // Apply Race Bonuses
  const raceMeta = RACES_METADATA[selectedRace];
  Object.entries(raceMeta.bonuses).forEach(([attr, bonus]) => {
    const key = attr as keyof CharacterAttributes;
    attributes[key] = Math.min((attributes[key] || 10) + (bonus || 0), 20); // Cap at 20
  });

  // Level is usually 1 for starters, but we can have fun rolling 1-5
  const level = Math.random() < 0.85 ? 1 : Math.floor(Math.random() * 4) + 2; // mostly level 1, some 2-5

  // HP based on Constitution and Class (D&D HD style)
  const conModifier = Math.floor((attributes.constitution - 10) / 2);
  const classHitDie = selectedClass === 'Barbarian' ? 12 :
                     ['Warrior', 'Paladin'].includes(selectedClass) ? 10 :
                     ['Ranger', 'Cleric', 'Druid', 'Alchemist', 'Bard', 'Rogue'].includes(selectedClass) ? 8 : 6;
  const healthPoints = Math.max(5, (classHitDie + conModifier) + (level - 1) * (Math.floor(classHitDie / 2) + 1 + conModifier));

  // Starter Gold
  const gold = Math.floor(Math.random() * 120) + 30 + (level * 15);

  // Starter Items
  const startingItems = [...classMeta.startingItemsPool];
  // select random items from pool
  const inventory: string[] = [];
  // always give the weapon/main item (first in list)
  inventory.push(startingItems[0]);
  // pick 2 more random items
  const extraItems = startingItems.slice(1);
  for (let i = 0; i < 2; i++) {
    if (extraItems.length > 0) {
      const idx = Math.floor(Math.random() * extraItems.length);
      inventory.push(extraItems.splice(idx, 1)[0]);
    }
  }

  // Bio
  const randomBio = classMeta.biosPool[Math.floor(Math.random() * classMeta.biosPool.length)];

  // ID & timestamp
  const id = Math.random().toString(36).substring(2, 11).toUpperCase();
  const createdTime = new Date().toISOString();

  return {
    id,
    name: finalName,
    class: selectedClass,
    race: selectedRace,
    alignment: selectedAlignment,
    attributes,
    bio: randomBio,
    inventory,
    level,
    healthPoints,
    gold,
    createdTime
  };
}

import { Character } from '../types';

const METEOR_OMENS = [
  'a rare planetary alignment',
  'a sudden, silent shower of violet meteorites',
  'a flash of blue lightning in a cloudless sky',
  'the birth of a silver-feathered owl in winter',
  'an unseasonable frost that temporarily froze the summer crops'
];

const SOCIAL_ROLES = [
  'solitary library transcriber',
  'pampered cathedral acolyte',
  'resourceful street urchin',
  'disgraced noble heir',
  'mysterious hermit\'s apprentice',
  'rugged caravan guard'
];

const MENTORS = [
  'a legendary blind swordmaster',
  'an eccentric, pipe-smoking alchemical sage',
  'a secret shadow brotherhood of phantom thieves',
  'a ancient, singing woodland spirit',
  'a disgraced archbishop of the solar temple'
];

const GENERIC_BACKGROUNDS = [
  'Born under the glowing shadow of a decaying arcane monolith',
  'An exile from a coastal kingdom swallowed by a sudden volcanic tide',
  'A wandering pioneer who spent years mapping the hazardous badlands',
  'Once a simple scholar who spent their youth cataloging crumbling runestones',
  'Raised beneath the soot-choked chimney stacks of the great capital city'
];

const RACIAL_BACKGROUNDS: Record<string, string[]> = {
  Human: [
    'Raised in the bustling, highly competitive trade guilds of the capital',
    'Born to a family of nomadic horse-riders on the vast boundary plains'
  ],
  Elf: [
    'Nurtured by the protective magic and ancient whispers of the silverbell groves',
    'Hailing from a high elven spire that suspended gracefully above the clouds'
  ],
  Dwarf: [
    'Born deep within the resonating subterranean halls of the Iron peaks',
    'Raised amidst the glowing depth-smelters and gem-vaults of the inner earth'
  ],
  Halfling: [
    'Grown up under the cozy hearths and rolling green hills of the eastern shires',
    'Raised in a traveling theatrical troupe of merry river-boat performers'
  ],
  Orc: [
    'Hardened in the brutal, wind-scoured tundras of the hostile outer rim',
    'Born as the first-born champion of a proud, stone-carving mountain clan'
  ],
  Tiefling: [
    'Stigmatized since their youth due to their striking, ember-glowing eyes',
    'Brought up in the shadowy underworld of a grand, labyrinthine city'
  ],
  Dragonborn: [
    'Bound since birth to the strict, honor-focused codes of the ruby claw clans',
    'Raised in a sacred mountain sanctuary dedicated to the dragon gods of old'
  ],
  Gnome: [
    'Tinkering day and night in the underground steam-works of their family',
    'Born inside a whimsical treetop village dedicated to visual illusions and clockwork'
  ]
};

const INCITING_INCIDENTS = [
  'an ancient, gold-etched curse awakened within their bloodline',
  'their mentor vanished in a swirl of blue smoke, leaving only a brass skull key',
  'a rival guild framed them for the spectacular heist of the governor\'s crown',
  'they discovered a forbidden, glowing prophecy inked upon their left palm',
  'their woodland sanctuary was burned to cinder by a mysterious shadow wolf',
  'they flatly refused a cruel military order and were branded a traitor to the crown',
  'they accidentally shattered a sealed runic jar, releasing a trickster demon',
  'a dying stranger handed them a strange, whispering silver map that bonded to their soul',
  'they survived a direct strike of solar lightning that left their eyes permanently silver-rimmed',
  'they bartered their own reflection to a laughing dark entity in exchange for their life'
];

const CLASS_SPECIALTIES: Record<string, string> = {
  Warrior: 'the lethal, heavy art of steel and the iron stance of the fortress shield',
  Mage: 'the unstable, forbidden manipulations of temporal and gravitational magic',
  Rogue: 'the whisper-silent flow of shadows and the complex mechanisms of high-security locks',
  Cleric: 'the radiant, life-giving grace of the heaven-spheres and the banishing of the undead',
  Ranger: 'primal communication with beasts and the tracking of eldritch nightmares across wilderness',
  Paladin: 'the holy, unbreakable vows of justice and the summoning of defensive light-shields',
  Bard: 'lyrical, visual enchantments that can bend minds, charm beasts, and sway monarchs',
  Druid: 'earthen transmutations and the deep, silent language of ancient world roots',
  Warlock: 'bone-chilling void bolts and perilous bargains with stellar, extra-planar cosmic lords',
  Necromancer: 'the fragile, silent boundary between decay, skeletal assembly, and soul harvesting',
  Barbarian: 'a thunderous, spirit-fueled combat fury capable of shattering reinforced steel armor',
  Alchemist: 'the volatile magic of brewing explosive catalysts and self-cooling elemental potions'
};

const RACIAL_HERITAGES: Record<string, string> = {
  Human: 'their relentless mortal ambition and unmatched adaptability',
  Elf: 'their acute, centuries-old senses and perfect spatial awareness',
  Dwarf: 'the unyielding stamina of the deep-foundation mountains',
  Halfling: 'a cheerful, uncanny luck that consistently turns disaster into comedy',
  Orc: 'the sheer, iron-like refusal of their tribal endurance',
  Tiefling: 'the magnetic, slightly threatening influence of their fiendish ancestors',
  Dragonborn: 'the proud, elemental flame that smolders inside their draconian throat',
  Gnome: 'their hyperactive tinker intellect and insatiable scientific curiosity'
};

const QUEST_OBJECTIVES = [
  'the mythical Shattered Crown to restore the rightful, forgotten line of kings',
  'the legendary philosopher\'s salt which is rumored to mend any broken spirit',
  'the rogue shadow-operative who betrayed their original mercenary unit',
  'the secret entryway to the Sunken Archives, where ancient scrolls survive',
  'a legendary elixir to halt a crystalline corruption slowly creeping up their skin',
  'the celestial, multi-eyed entity that has been calling to them in dreams since childhood',
  'a mythical, sleeping storm dragon to pacify its anger with a long-forgotten lullaby',
  'the mythical Obsidian Citadel to erase their name from the book of the damned',
  'their long-lost childhood friend, who vanished into an eerie purple rift years ago',
  'the corrupt high noble who framed their parents, sworn to exact elegant retribution'
];

export function generateBackstoryForCharacter(character: Character): string {
  // Use a random template format for variety
  const templates = [
    // Template 1: Background, Name was forced to flee...
    (name: string, bg: string, incident: string, objective: string) => 
      `${bg}, ${name} was forced into a nomadic life when ${incident}. Now, they wander the frontier in a desperate hunt for ${objective}.`,

    // Template 2: Inciting incident, Name dedicated...
    (name: string, bg: string, incident: string, objective: string, specialty: string, heritage: string) => 
      `Ever since ${incident}, ${name} has dedicated their existence to mastering ${specialty}. Framed by ${bg.toLowerCase()}, and empowered by ${heritage}, they now seek ${objective}.`,

    // Template 3: Marked by omen...
    (name: string, bg: string, incident: string, _objective: string) => {
      const omen = METEOR_OMENS[Math.floor(Math.random() * METEOR_OMENS.length)];
      const role = SOCIAL_ROLES[Math.floor(Math.random() * SOCIAL_ROLES.length)];
      const mentor = MENTORS[Math.floor(Math.random() * MENTORS.length)];
      const obj = QUEST_OBJECTIVES[Math.floor(Math.random() * QUEST_OBJECTIVES.length)];
      return `Marked by ${omen} at birth, ${name} grew up as a ${role} under the guidance of ${mentor}. Today, they strive to hunt down ${obj} before their time runs out.`
    },

    // Template 4: A combining style
    (name: string, bg: string, incident: string, objective: string, specialty: string) =>
      `${bg}, ${name} earned a legendary reputation for ${specialty}. But after ${incident}, they abandoned their post, searching only for ${objective}.`
  ];

  const name = character.name;
  const race = character.race;
  const charClass = character.class;

  const bgPool = RACIAL_BACKGROUNDS[race] 
    ? [...RACIAL_BACKGROUNDS[race], ...GENERIC_BACKGROUNDS]
    : GENERIC_BACKGROUNDS;
  
  const bg = bgPool[Math.floor(Math.random() * bgPool.length)];
  const incident = INCITING_INCIDENTS[Math.floor(Math.random() * INCITING_INCIDENTS.length)];
  const objective = QUEST_OBJECTIVES[Math.floor(Math.random() * QUEST_OBJECTIVES.length)];
  const specialty = CLASS_SPECIALTIES[charClass] || 'the legendary arts of their guild';
  const heritage = RACIAL_HERITAGES[race] || 'their quick wits and stubborn survival instincts';

  // Select a template randomly
  const templateIdx = Math.floor(Math.random() * templates.length);
  const selectedTemplate = templates[templateIdx];

  return selectedTemplate(name, bg, incident, objective, specialty, heritage);
}

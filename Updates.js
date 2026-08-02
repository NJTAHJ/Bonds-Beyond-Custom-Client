// ==========================================
// BB1 NEW CARDS & ASSEMBLY FIELD FIX SCRIPT
// ==========================================

const targetCards = [
  "BB1-010", // Dracmon
  "BB1-016", // MetalGreymon (Nerds Assembly)
  "BB1-033", // WereGarurumon (Nerds Assembly)
  "BB1-053", // Wormmon
  "BB1-056", // Stingmon
  "BB1-058", // Dinobeemon (X Antibody)
  "BB1-061", // GranKuwagamon
  "BB1-068", // Cerberumon: Werewolf Mode (CT Assembly)
  "BB1-069"  // MetalGreymon (Musketeers Assembly)
];

// Delete existing card entries to prevent duplicate conflicts
db.card.deleteMany({ cardNumber: { $in: targetCards } });

db.card.insertMany([
  // --- BB1-010 DRACMON ---
  {
    "uniqueCardNumber": "BB1-010",
    "name": "Dracmon",
    "imgUrl": "/BB1-010.webp",
    "cardType": "Digimon",
    "color": ["Red", "Purple"],
    "cardNumber": "BB1-010",
    "digivolveConditions": [
      { "color": "Red", "level": 2, "cost": 1 },
      { "color": "Purple", "level": 2, "cost": 1 }
    ],
    "specialDigivolve": "[Digivolve] from Lv.2 w/[Girlies] or [Evil] trait: 0 cost",
    "stage": "Rookie",
    "digiType": ["Undead", "Girlies"],
    "attribute": "Virus",
    "dp": 1000,
    "playCost": 3,
    "level": 3,
    "mainEffect": "[On Play] By trashing 1 card from your hand, you may return 1 Digimon card with [Evil Dragon] in its text, or 1 Digimon card with the [Girlies] trait, from your trash to your hand.",
    "rule": "This card is also treated as having the [Evil] trait.",
    "inheritedEffect": "[On Deletion] Gain 1 memory.",
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- BB1-053 WORMMON ---
  {
    "uniqueCardNumber": "BB1-053",
    "name": "Wormmon",
    "imgUrl": "/BB1-053.webp",
    "cardType": "Digimon",
    "color": ["Green", "Purple"],
    "cardNumber": "BB1-053",
    "digivolveConditions": [
      { "color": "Green", "level": 2, "cost": 1 },
      { "color": "Purple", "level": 2, "cost": 1 }
    ],
    "specialDigivolve": "[Digivolve] from [Minomon] or Lv.2 w/[Nerds] or [Arena] trait: 0 cost",
    "stage": "Rookie",
    "digiType": ["Larva", "Arena", "Nerds"],
    "attribute": "Free",
    "dp": 2000,
    "playCost": 3,
    "level": 3,
    "mainEffect": "[On Play] [When Moving] By trashing 1 card in your hand, suspend 1 Digimon. Then, 1 of your Digimon gains ＜Retaliate＞ until the end of your opponent's turn.",
    "inheritedEffect": "[When Attacking] [Once Per Turn] ＜Draw 1＞. Then, trash 1 card in your hand.",
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- BB1-056 STINGMON ---
  {
    "uniqueCardNumber": "BB1-056",
    "name": "Stingmon",
    "imgUrl": "/BB1-056.webp",
    "cardType": "Digimon",
    "color": ["Green", "Purple"],
    "cardNumber": "BB1-056",
    "digivolveConditions": [
      { "color": "Green", "level": 3, "cost": 2 },
      { "color": "Purple", "level": 3, "cost": 2 }
    ],
    "specialDigivolve": "[Digivolve] from [Wormmon] or Lv.3 w/[Arena] or [Nerds] trait: 2 cost",
    "stage": "Champion",
    "digiType": ["Insectoid", "Arena", "Nerds"],
    "attribute": "Free",
    "dp": 4000,
    "playCost": 5,
    "level": 4,
    "mainEffect": "[When Attacking] If this Digimon attacks an opponent's Digimon, this Digimon may digivolve into a Digimon card with the [Arena] or [Nerds] trait or with [Dinobeemon] in its name in your trash with its digivolution cost reduced by 1.",
    "inheritedEffect": "[When Attacking] [Once Per Turn] ＜Draw 1＞. Then, trash 1 card in your hand.",
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- BB1-058 DINOBEEMON (X ANTIBODY) ---
  {
    "uniqueCardNumber": "BB1-058",
    "name": "Dinobeemon (X Antibody)",
    "imgUrl": "/BB1-058.webp",
    "cardType": "Digimon",
    "color": ["Green", "Purple"],
    "cardNumber": "BB1-058",
    "digivolveConditions": [
      { "color": "Green", "level": 4, "cost": 5 },
      { "color": "Purple", "level": 4, "cost": 5 }
    ],
    "specialDigivolve": "[Digivolve] from Lv.4 w/[Nerds] or [Arena] trait: 4 cost / [Dinobeemon]: 0 cost",
    "stage": "Ultimate",
    "digiType": ["Mutant", "Arena", "Nerds", "X Antibody"],
    "attribute": "Free",
    "dp": 8000,
    "playCost": 8,
    "level": 5,
    "mainEffect": "＜Vortex＞\n[When Digivolving] Suspend 1 of your opponent's Digimon or Tamers. Then, if [Dinobeemon] is in this Digimon's digivolution cards or it digivolved from the trash, you may play 1 Level 3 or lower Digimon card with the [Nerds], [Arena], or [Free] trait from your trash without paying its memory cost.",
    "rule": "Treat this card as also having the [Insectoid] and [Mythical Dragon] traits.",
    "inheritedEffect": "[Your Turn] [Once Per Turn] When this Digimon attacks an opponent's Digimon, you may play 1 Level 3 or lower Digimon card with the [Nerds], [Arena], or [Free] trait from your trash without paying its memory cost.",
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- BB1-061 GRANKUWAGAMON ---
  {
    "uniqueCardNumber": "BB1-061",
    "name": "GranKuwagamon",
    "imgUrl": "/BB1-061.webp",
    "cardType": "Digimon",
    "color": ["Green", "Black"],
    "cardNumber": "BB1-061",
    "digivolveConditions": [
      { "color": "Green", "level": 5, "cost": 4 },
      { "color": "Black", "level": 5, "cost": 4 }
    ],
    "specialDigivolve": "[Digivolve] from Lv.5 w/[Dinobeemon] in its name or w/[Nerds] or [Arena] trait: 3 cost",
    "stage": "Mega",
    "digiType": ["Insectoid", "Arena", "Nerds"],
    "attribute": "Free",
    "dp": 12000,
    "playCost": 11,
    "level": 6,
    "mainEffect": "＜Armor Purge＞ ＜Piercing＞\n[When Digivolving] Play 1 Level 4 or lower Digimon card with the [Nerds], [Arena], or [Free] trait from your trash without paying its memory cost, or play 1 [Drone] Token to your opponent's field suspended (Digimon/Lv.1/Green/Insectoid/2000 DP/This Digimon cannot unsuspend. On Deletion: Suspend 1 of your Digimon). Then, by placing 1 [GrandisKuwagamon] from your trash as this Digimon's top digivolution card, this Digimon may attack.\n[End of Attack] By placing this Digimon's top stacked card as its bottom digivolution card, unsuspend this Digimon.",
    "inheritedEffect": null,
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- BB1-016 METALGREYMON (ASSEMBLY KEY FIX) ---
  {
    "uniqueCardNumber": "BB1-016",
    "name": "MetalGreymon",
    "imgUrl": "/BB1-016.webp",
    "cardType": "Digimon",
    "color": ["Red", "Black"],
    "cardNumber": "BB1-016",
    "digivolveConditions": [
      { "color": "Red", "level": 4, "cost": 4 },
      { "color": "Black", "level": 4, "cost": 4 }
    ],
    "specialDigivolve": "[Digivolve] from Lv.4 w/[Nerds] or [IADA] trait: 3 cost",
    "stage": "Ultimate",
    "digiType": ["Cyborg", "Nerds", "IADA"],
    "attribute": "Vaccine",
    "dp": 7000,
    "playCost": 7,
    "level": 5,
    "mainEffect": "＜Blocker＞\n[When Attacking] [Once Per Turn] You may play 1 Level 5 or lower Digimon card with the [Nerds] trait from your hand with its play cost reduced by 2.\n[Your Turn] When another Digimon's attack ends, if this Digimon was suspended by ＜Alliance＞ for that attack, this Digimon may digivolve into a [Nerds] trait Digimon card in the hand with the cost reduced by 2.",
    "inheritedEffect": "＜Alliance＞",
    "assembly": "[Assembly\u00a0-2] Level 4 or lower Digimon card with the [Nerds] trait",
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- BB1-033 WEREGARURUMON (ASSEMBLY KEY FIX) ---
  {
    "uniqueCardNumber": "BB1-033",
    "name": "WereGarurumon",
    "imgUrl": "/BB1-033.webp",
    "cardType": "Digimon",
    "color": ["Blue", "Green"],
    "cardNumber": "BB1-033",
    "digivolveConditions": [
      { "color": "Blue", "level": 4, "cost": 4 },
      { "color": "Green", "level": 4, "cost": 4 }
    ],
    "specialDigivolve": "[Digivolve] from Lv.4 w/[Nerds] or [IADA] trait: 3 cost",
    "stage": "Ultimate",
    "digiType": ["Beastkin", "Nerds", "IADA"],
    "attribute": "Vaccine",
    "dp": 7000,
    "playCost": 7,
    "level": 5,
    "mainEffect": "＜Evade＞\n[When Attacking] [Once Per Turn] You may play 1 Level 5 or lower Digimon card with the [Nerds] trait from your trash with its play cost reduced by 2.\n[Your Turn] When another Digimon's attack ends, if this Digimon was suspended by ＜Alliance＞ for that attack, this Digimon may digivolve into a [Nerds] trait Digimon card in the hand with the cost reduced by 2.",
    "inheritedEffect": "＜Alliance＞",
    "assembly": "[Assembly\u00a0-2] Level 4 or lower Digimon card with the [Nerds] trait",
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- BB1-068 CERBERUMON: WEREWOLF MODE (ASSEMBLY KEY FIX) ---
  {
    "uniqueCardNumber": "BB1-068",
    "name": "Cerberumon: Werewolf Mode",
    "imgUrl": "/BB1-068.webp",
    "cardType": "Digimon",
    "color": ["Purple"],
    "cardNumber": "BB1-068",
    "digivolveConditions": [{ "color": "Purple", "level": 4, "cost": 4 }],
    "specialDigivolve": "[Digivolve] from Lv.4 w/[CT] trait: 3/[WereGarurumon] w/[CT] trait: 1 cost",
    "stage": "Ultimate",
    "digiType": ["Wizard", "CT"],
    "attribute": "Virus",
    "dp": 7000,
    "playCost": 7,
    "level": 5,
    "mainEffect": "[When Digivolving] You may place 1 card with the [CT] trait from your hand or trash under this Digimon as its bottom digivolution card. Then, if this Digimon has 5 or more digivolution cards ＜De-Digivolve 1＞ on 1 of your opponents Digimon.",
    "inheritedEffect": "[All Turns] While this Digimon has the [CT] trait, it gains ＜Scapegoat＞.",
    "assembly": "[Assembly\u00a0-2] 1 Digimon cards with the [CT] trait",
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- BB1-069 METALGREYMON (ASSEMBLY KEY FIX) ---
  {
    "uniqueCardNumber": "BB1-069",
    "name": "MetalGreymon",
    "imgUrl": "/BB1-069.webp",
    "cardType": "Digimon",
    "color": ["Black"],
    "cardNumber": "BB1-069",
    "digivolveConditions": [{ "color": "Black", "level": 4, "cost": 3 }],
    "specialDigivolve": "[Digivolve] from Lv.4 w/[Three Musketeers] in text: 3 cost",
    "stage": "Ultimate",
    "digiType": ["Cyborg"],
    "attribute": "Virus",
    "dp": 7000,
    "playCost": 7,
    "level": 5,
    "mainEffect": "[On Play] [When Digivolving] By returning 3 cards with [Three Musketeers] in their text from your trash to the top of your deck, gain 1 memory.\n[When Digivolving] [When Attacking] [Once Per Turn] By trashing 1 Option card from any of your Digimon's digivolution cards, delete 1 of your opponent's Digimon with a play cost of 5 or lower.",
    "inheritedEffect": "[All Turns] [Once Per Turn] When Option cards are trashed from this Digimon's digivolution cards, ＜De-Digivolve 1＞ 1 of your opponent's Digimon.",
    "assembly": "[Assembly\u00a0-2] Option card with the [Three Musketeers] trait",
    "restrictions": { "english": "Unrestricted", "japanese": "Unrestricted" },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  }
]);

print("Successfully imported Dracmon, Wormmon line, and updated assembly fields.");
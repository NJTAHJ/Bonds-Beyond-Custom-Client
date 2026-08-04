const cdn = "https://raw.githubusercontent.com/NJTAHJ/Bonds-Beyond-Custom-Client/main/frontend/public/";

// Wipe existing ST01 cards to prevent duplicates
db.card.deleteMany({ uniqueCardNumber: { $regex: "^ST01-" } });

const st01Cards = [
  { n: "ST01-01", nm: "Hopmon", c: ["Black"], t: "Digimon", s: "In-Training", dt: ["Lesser", "Nikari"], lvl: 2,
    ie: "[All Turns] [Once Per Turn] When an opponent's Digimon is deleted, ＜Draw 1＞." },
  { n: "ST01-02", nm: "Salamon", c: ["Yellow"], t: "Digimon", s: "Rookie", dt: ["Mammal", "Nikari"], a: "Vaccine", dp: 2000, pc: 3, lvl: 3, evo: [{ color: "Yellow", level: 2, cost: 0 }],
    sd: "[Digivolve] from Lv.2 w/[Nikari] trait: 0 cost",
    me: "[On Play] [Start of Your Main Phase] One of your Digimon with the [Nikari] trait may digivolve into a Yellow or Black Digimon card with the [Nikari] trait in your hand with its digivolution cost reduced by 1.",
    ie: "[Your Turn] Your opponent's security Digimon get -3000 DP.", ill: "gusart.22" },
  { n: "ST01-03", nm: "Gatomon", c: ["Yellow"], t: "Digimon", s: "Champion", dt: ["Holy Beast", "Nikari"], a: "Vaccine", dp: 4000, pc: 4, lvl: 4, evo: [{ color: "Yellow", level: 3, cost: 2 }],
    sd: "[Digivolve] from Lv.3 w/[Nikari] trait: 2 cost",
    me: "[When Digivolving] If you have 1 or fewer Tamers, you may play 1 Tamer card with the [Nikari] trait from your hand without paying its memory cost.",
    ie: "[Your Turn] Your opponent's security Digimon get -3000 DP.", ill: "Lacapiart" },
  { n: "ST01-04", nm: "Angewomon", c: ["Yellow"], t: "Digimon", s: "Ultimate", dt: ["Archangel", "Nikari"], a: "Vaccine", dp: 7000, pc: 7, lvl: 5, evo: [{ color: "Yellow", level: 4, cost: 3 }],
    sd: "[Digivolve] from Lv.4 w/[Nikari] trait: 3 cost",
    me: "＜Alliance＞\n[On Play] [When Digivolving] [When Attacking] 1 of your opponent's Digimon gets -4000 DP until the end of their turn.\n[End of Your Turn] This Digimon and 1 of your other Digimon with the [Nikari] trait in play may DNA digivolve into a Digimon card with the [Nikari] trait in your hand.",
    ie: "＜Alliance＞" },
  { n: "ST01-05", nm: "Magnadramon", c: ["Yellow"], t: "Digimon", s: "Mega", dt: ["Holy Dragon", "Four Great Dragons", "Nikari"], a: "Vaccine", dp: 11000, pc: 11, lvl: 6, evo: [{ color: "Yellow", level: 5, cost: 3 }],
    sd: "[Digivolve] from Lv.5 w/[Nikari] trait: 3 cost",
    me: "＜Barrier＞ ＜Ascension＞\n[On Play] [When Digivolving] 1 of your other Digimon with the [Nikari] trait may digivolve into a Level 5 or lower Black Digimon card with the [Nikari] trait in your hand without paying its memory cost. Your opponent's Digimon effects do not affect your Black Digimon with the [Nikari] trait until the end of their turn.\n[When Digivolving] [End of Attack] If you have 1 or fewer security cards, this Digimon may digivolve into [Nyabootmon] in your hand with its digivolution cost reduced by 1." },
  { n: "ST01-06", nm: "Nyabootmon", c: ["Yellow"], t: "Digimon", s: "Mega", dt: ["Puppet", "Nikari"], a: "Vaccine", dp: 14000, pc: 14, lvl: 7, evo: [{ color: "Yellow", level: 6, cost: 4 }],
    sd: "[Digivolve] from Lv.6 w/[Nikari] trait: 4 cost",
    me: "＜Piercing＞ ＜Engage＞\n[When Digivolving] This Digimon may unsuspend.\n[When Digivolving] [When Attacking] [Once Per Turn] If you have a [Kari Kamiya] in play, trash your opponent's top security card.\n[End of Attack] If you have 2 or fewer security cards, ＜Recovery +1 (Deck)＞. Then, 1 of your opponent's Digimon gets -6000 DP, and all of your opponent's Digimon get -3000 DP for each card in your security stack until the end of their turn." },
  { n: "ST01-07", nm: "Dagger", c: ["Black"], t: "Digimon", s: "Rookie", dt: ["Mini Dragon", "Nikari"], a: "Vaccine", dp: 2000, pc: 3, lvl: 3, evo: [{ color: "Black", level: 2, cost: 0 }],
    sd: "[Digivolve] from Lv.2 w/[Nikari] trait: 0 cost", rule: "Treat this card as having the name [Monodramon]",
    me: "[On Play] [When Moving] 1 of your Digimon with the [Nikari] trait gets +4000 DP until the end of your opponent's turn.\n[Your Turn] If your opponent has a Digimon with 10000 DP or more, by placing 1 [Nico Kärnä] from your hand or battle area under this Digimon as its bottom digivolution card, this Digimon may digivolve into [Fujinmon] in your hand for a digivolution cost of 4, ignoring digivolution requirements. When this Digimon would digivolve into [Fujinmon] by this effect, this Digimon cannot have its DP reduced by your opponent's effects until the end of your opponent's turn.",
    ie: "[End of Attack] [Once Per Turn] If this Digimon's attack target was an opponent's Digimon, ＜Draw 1＞." },
  { n: "ST01-08", img: "ST01-008", nm: "Strikedramon", c: ["Blue"], t: "Digimon", s: "Champion", dt: ["Dragonkin", "Nikari"], a: "Vaccine", dp: 5000, pc: 5, lvl: 4, evo: [{ color: "Blue", level: 3, cost: 2 }],
    sd: "[Digivolve] from Lv.3 w/[Nikari] trait: 2 cost",
    me: "[Main] [Once Per Turn] You may play or use 1 card with the [Nikari] trait from your hand or trash with its play cost or use cost reduced by 2.",
    ie: "[Your Turn] If you have Tamers in play with 2 or more different names, this Digimon gets +3000 DP." },
  { n: "ST01-009", nm: "Cyberdramon", c: ["Black"], t: "Digimon", s: "Ultimate", dt: ["Cyborg", "Nikari"], a: "Vaccine", dp: 7000, pc: 7, lvl: 5, evo: [{ color: "Black", level: 4, cost: 3 }],
    sd: "[Digivolve] from Lv.4 w/[Nikari] trait: 3 cost",
    me: "＜Collision＞\n[On Play] [When Digivolving] You may play 1 [Nico Kärnä] Tamer card from your hand without paying its memory cost.\n[All Turns] When one of your [Kari Kamiya] Tamers or Level 5 or higher Yellow Digimon with the [Nikari] trait would be deleted, this Digimon can digivolve into [Darkdramon] in your hand without paying its digivolution cost. If this Digimon digivolves by this effect, that Tamer or Digimon does not leave the field.",
    ie: "[When Attacking] [Once Per Turn] ＜De-Digivolve 1＞ 1 of your opponent's Digimon." },
  { n: "ST01-010", nm: "Darkdramon", c: ["Black"], t: "Digimon", s: "Mega", dt: ["Cyborg", "Nikari"], a: "Virus", dp: 12000, pc: 12, lvl: 6, evo: [{ color: "Black", level: 5, cost: 3 }],
    sd: "[Digivolve] from Lv.5 w/[Nikari] trait: 3 cost",
    me: "＜Collision＞ ＜Reboot＞ ＜Blocker＞\n[When Digivolving] ＜De-Digivolve 2＞ 1 of your opponent's Digimon. Then, if digivolved by a card with the [Nikari] trait's effect, your opponent can't trash the digivolution cards of 1 of your Yellow and 1 of your Black Digimon with the [Nikari] trait until the end of their turn.\n[All Turns] [Once Per Turn] When this Digimon deletes an opponent's Digimon in battle, this Digimon may unsuspend." },
  { n: "ST01-11", nm: "Fujinmon", c: ["Green"], t: "Digimon", s: "Mega", dt: ["Cyborg", "Nikari"], a: "Vaccine", dp: 13000, pc: 13, lvl: 6, evo: [{ color: "Green", level: 5, cost: 3 }],
    sd: "[Digivolve] from Lv.5 w/[Nikari] trait: 3 cost",
    me: "＜Blocker＞ ＜Vortex＞ ＜Reboot＞\n[When Digivolving] Suspend 1 of your opponent's Digimon or Tamers. Then, unsuspend 1 of your Digimon.\n[When Attacking] [Once Per Turn] This Digimon may battle 1 of your opponent's Digimon.\n[Your Turn] [Once Per Turn] When this Digimon deletes an opponent's Digimon in battle, if this Digimon has [Nico Kärnä] in its digivolution cards, activate 1 of this Digimon's [When Digivolving] effects." },
  { n: "ST01-12", nm: "Kari Kamiya", c: ["Yellow"], t: "Tamer", dt: ["Nikari"], pc: 3,
    me: "[Start of Your Main Phase] If you have a Digimon in play, gain 1 memory.\n[All Turns] When one of your Digimon digivolves into a Black Digimon with the [Nikari] trait, you may suspend this Tamer to give that Digimon ＜Barrier＞ until the end of your turn.",
    se: "[Security] Play this card without paying the cost." },
  { n: "ST01-13", nm: "Nico Kärnä", c: ["Yellow"], t: "Tamer", dt: ["Nikari"], pc: 3,
    me: "[Start of Your Main Phase] If your opponent has a Digimon in play, gain 1 memory.\n[All Turns] When one of your Digimon digivolves into a Yellow Digimon with the [Nikari] trait, you may suspend this Tamer to give that Digimon ＜Blocker＞ until the end of your opponent's turn.",
    ie: "＜Piercing＞", se: "[Security] Play this card without paying the cost." },
  { n: "ST01-14", nm: "Erase Claw", c: ["Blue"], t: "Option", dt: ["Nikari"], pc: 6,
    me: "＜Use Req. ([Nikari] trait)＞\nWhen this card would be used, if you have a Digimon with [Cyberdramon] in its name and the [Nikari] trait in play, reduce the cost by 2.\n[Main] Choose 1 of the following effects:\n• Delete 1 of your opponent's Level 5 or lower Digimon.\n• Delete 1 of your opponent's Level 6 or higher Digimon. If you do, delete 1 of your Tamers named [Kari Kamiya].",
    se: "[Security] Add this card to your hand." },
  { n: "ST01-15", nm: "When Dark Meets The Light", c: ["Blue"], t: "Option", dt: ["Nikari"], pc: 3,
    me: "＜Use Req. ([Nikari] trait)＞\n[Main] Reveal the top 3 cards of your deck. Add 1 card with the [Nikari] trait from among them to your hand. Return the remaining cards to the bottom of your deck in any order. Then, place this card in the battle area.\n[Main] ＜Delay＞\n• You may play 1 Tamer card with the [Nikari] trait from your hand with its play cost reduced by 3.",
    se: "[Security] Activate this card's [Main] effects." }
];

const mappedST01 = st01Cards.map(c => ({
  uniqueCardNumber: c.n, cardNumber: c.mn || c.n, name: c.nm, imgUrl: cdn + (c.img || c.n) + ".webp", cardType: c.t,
  color: c.c, stage: c.s || null, digiType: c.dt, attribute: c.a || null, dp: c.dp || null, playCost: c.pc, level: c.lvl || null,
  mainEffect: c.me || null, inheritedEffect: c.ie || null, securityEffect: c.se || null,
  digivolveConditions: c.evo || [], specialDigivolve: c.sd || null, dnaDigivolve: c.dna || null, rule: c.rule || null,
  restrictions: { chinese: "Unrestricted", english: "Unrestricted", japanese: "Unrestricted", korean: "Unrestricted" },
  illustrator: c.ill || "Beyond The Bonds", _class: "com.github.wekaito.backend.models.Card"
}));

db.card.insertMany(mappedST01);
print(`Successfully imported all ${mappedST01.length} ST01 cards!`);

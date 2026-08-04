const cdn = "https://raw.githubusercontent.com/NJTAHJ/Bonds-Beyond-Custom-Client/main/frontend/public/";

// 1. Update the name of the IADA Option (BB1-102)
db.card.updateOne(
  { uniqueCardNumber: "BB1-102" },
  { $set: { name: "Resolution No. 256 of the 65th United Nations General Assembly, Agenda Item No. 102, the Charter of the International Agency of Digital Affairs" } }
);
print("Updated BB1-102 Name.");

// 2. Remove old Tyrant & Omnimon entries
db.card.deleteMany({ uniqueCardNumber: { $in: ["BB1-103", "BB1-103_P1", "BB1-103_P2", "BB1-104", "BB1-104_P1", "BB1-104_P2"] } });

// 3. Insert corrected versions with exact text and evolution requirements
const fixedCards = [
  // --- TYRANTKABUTERIMON ---
  { n:"BB1-103", nm:"TyrantKabuterimon", c:["Green","Purple"], t:"Digimon", s:"Mega", dt:["Insectoid","Arena","Nerds","BB"], a:"Virus", dp:14000, pc:14, lvl:7, evo:[{color:"Green",level:6,cost:6},{color:"Purple",level:6,cost:6}],
    sd:"[Digivolve] from Lv.6 w/[Insectoid] trait with 13000 or less DP: 3 cost", rule:"Treat this card as having the [Free] trait.",
    me:"＜Vortex＞ ＜Piercing＞\n[When Digivolving] Play 1 [Drone] Token to your opponent's field suspended *(Digimon/Lv.1/Green/Insectoid/2000 DP/This Digimon cannot unsuspend. [On Deletion] Suspend 1 of your Digimon)*. Then, play up to 5 total play cost of Digimon with the [Nerds], [Arena], or [Insectoid] trait from your trash without paying the cost. For each of your opponent's suspended Digimon, increase the total play cost you can play by 2.\n[All Turns] All of your other Digimon with the [Insectoid], [Arena], or [Nerds] trait gain ＜Retaliation＞.\n[All Turns] [Once Per Turn] When a Digimon is played, 1 of your other Digimon may battle an opponent's Digimon." },
  { n:"BB1-103_P1", mn:"BB1-103", nm:"TyrantKabuterimon", c:["Green","Purple"], t:"Digimon", s:"Mega", dt:["Insectoid","Arena","Nerds","BB"], a:"Virus", dp:14000, pc:14, lvl:7, evo:[{color:"Green",level:6,cost:6},{color:"Purple",level:6,cost:6}],
    sd:"[Digivolve] from Lv.6 w/[Insectoid] trait with 13000 or less DP: 3 cost", rule:"Treat this card as having the [Free] trait.",
    me:"＜Vortex＞ ＜Piercing＞\n[When Digivolving] Play 1 [Drone] Token to your opponent's field suspended *(Digimon/Lv.1/Green/Insectoid/2000 DP/This Digimon cannot unsuspend. [On Deletion] Suspend 1 of your Digimon)*. Then, play up to 5 total play cost of Digimon with the [Nerds], [Arena], or [Insectoid] trait from your trash without paying the cost. For each of your opponent's suspended Digimon, increase the total play cost you can play by 2.\n[All Turns] All of your other Digimon with the [Insectoid], [Arena], or [Nerds] trait gain ＜Retaliation＞.\n[All Turns] [Once Per Turn] When a Digimon is played, 1 of your other Digimon may battle an opponent's Digimon." },
  { n:"BB1-103_P2", mn:"BB1-103", nm:"TyrantKabuterimon", c:["Green","Purple"], t:"Digimon", s:"Mega", dt:["Insectoid","Arena","Nerds","BB"], a:"Virus", dp:14000, pc:14, lvl:7, evo:[{color:"Green",level:6,cost:6},{color:"Purple",level:6,cost:6}],
    sd:"[Digivolve] from Lv.6 w/[Insectoid] trait with 13000 or less DP: 3 cost", rule:"Treat this card as having the [Free] trait.",
    me:"＜Vortex＞ ＜Piercing＞\n[When Digivolving] Play 1 [Drone] Token to your opponent's field suspended *(Digimon/Lv.1/Green/Insectoid/2000 DP/This Digimon cannot unsuspend. [On Deletion] Suspend 1 of your Digimon)*. Then, play up to 5 total play cost of Digimon with the [Nerds], [Arena], or [Insectoid] trait from your trash without paying the cost. For each of your opponent's suspended Digimon, increase the total play cost you can play by 2.\n[All Turns] All of your other Digimon with the [Insectoid], [Arena], or [Nerds] trait gain ＜Retaliation＞.\n[All Turns] [Once Per Turn] When a Digimon is played, 1 of your other Digimon may battle an opponent's Digimon." },

  // --- OMNIMON ---
  { n:"BB1-104", nm:"Omnimon", c:["White","Blue","Red"], t:"Digimon", s:"Mega", dt:["Holy Knight","Nerds","IADA"], a:"Vaccine", dp:15000, pc:15, lvl:7, evo:[{color:"Blue",level:6,cost:5},{color:"Red",level:6,cost:5}],
    sd:"[Digivolve] from Lv.6 w/[Nerds] trait: 5 cost", dna:"[DNA Digivolve] [Red]/[Yellow] Lv.6 + [Blue]/[Green] Lv.6\u00a0: Cost 0",
    me:"＜Partition {[WarGreymon] & [MetalGarurumon]}＞\n[When Digivolving] [When Attacking] [Once Per Turn] You may play 1 Level 5 or lower Digimon card with the [Nerds] trait from your hand or trash without paying the cost. If DNA digivolving, add 1 to the number of cards this effect can play.\n[All Turns] [Once Per Turn] When Digimon with the [Nerds] trait are played, 1 of your opponent's Digimon gets -5000 DP for each of your Digimon with the [Nerds] trait until the end of their turn.\n[All Turns] [Once Per Turn] When a Digimon is deleted, unsuspend this Digimon." },
  { n:"BB1-104_P1", mn:"BB1-104", nm:"Omnimon", c:["White","Blue","Red"], t:"Digimon", s:"Mega", dt:["Holy Knight","Nerds","IADA"], a:"Vaccine", dp:15000, pc:15, lvl:7, evo:[{color:"Blue",level:6,cost:5},{color:"Red",level:6,cost:5}],
    sd:"[Digivolve] from Lv.6 w/[Nerds] trait: 5 cost", dna:"[DNA Digivolve] [Red]/[Yellow] Lv.6 + [Blue]/[Green] Lv.6\u00a0: Cost 0",
    me:"＜Partition {[WarGreymon] & [MetalGarurumon]}＞\n[When Digivolving] [When Attacking] [Once Per Turn] You may play 1 Level 5 or lower Digimon card with the [Nerds] trait from your hand or trash without paying the cost. If DNA digivolving, add 1 to the number of cards this effect can play.\n[All Turns] [Once Per Turn] When Digimon with the [Nerds] trait are played, 1 of your opponent's Digimon gets -5000 DP for each of your Digimon with the [Nerds] trait until the end of their turn.\n[All Turns] [Once Per Turn] When a Digimon is deleted, unsuspend this Digimon." },
  { n:"BB1-104_P2", mn:"BB1-104", nm:"Omnimon", c:["White","Blue","Red"], t:"Digimon", s:"Mega", dt:["Holy Knight","Nerds","IADA"], a:"Vaccine", dp:15000, pc:15, lvl:7, evo:[{color:"Blue",level:6,cost:5},{color:"Red",level:6,cost:5}],
    sd:"[Digivolve] from Lv.6 w/[Nerds] trait: 5 cost", dna:"[DNA Digivolve] [Red]/[Yellow] Lv.6 + [Blue]/[Green] Lv.6\u00a0: Cost 0",
    me:"＜Partition {[WarGreymon] & [MetalGarurumon]}＞\n[When Digivolving] [When Attacking] [Once Per Turn] You may play 1 Level 5 or lower Digimon card with the [Nerds] trait from your hand or trash without paying the cost. If DNA digivolving, add 1 to the number of cards this effect can play.\n[All Turns] [Once Per Turn] When Digimon with the [Nerds] trait are played, 1 of your opponent's Digimon gets -5000 DP for each of your Digimon with the [Nerds] trait until the end of their turn.\n[All Turns] [Once Per Turn] When a Digimon is deleted, unsuspend this Digimon." }
];

const mappedFixes = fixedCards.map(c => ({
  uniqueCardNumber: c.n,
  cardNumber: c.mn || c.n,
  name: c.nm,
  imgUrl: cdn + c.n + ".webp",
  cardType: c.t,
  color: c.c,
  stage: c.s || null,
  digiType: c.dt,
  attribute: c.a || null,
  dp: c.dp || null,
  playCost: c.pc,
  level: c.lvl || null,
  mainEffect: c.me || null,
  inheritedEffect: c.ie || null,
  securityEffect: c.se || null,
  digivolveConditions: c.evo || [],
  specialDigivolve: c.sd || null,
  dnaDigivolve: c.dna || null,
  rule: c.rule || null,
  restrictions: { chinese: "Unrestricted", english: "Unrestricted", japanese: "Unrestricted", korean: "Unrestricted" },
  illustrator: "Beyond The Bonds",
  _class: "com.github.wekaito.backend.models.Card"
}));

db.card.insertMany(mappedFixes);
print("Successfully imported TyrantKabuterimon and Omnimon fixes!");

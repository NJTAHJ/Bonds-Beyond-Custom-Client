// ==========================================
// FIX ANUBISMON ART & DIGIMON WRESTLING BELT
// ==========================================

const targetCards = ["BB1-085", "BB1-085_P1", "BB1-097"];

db.card.deleteMany({ uniqueCardNumber: { $in: targetCards } });

db.card.insertMany([
  // --- ANUBISMON (STANDARD ART) ---
  {
    "uniqueCardNumber": "BB1-085",
    "name": "Anubismon",
    "imgUrl": "https://raw.githubusercontent.com/NJTAHJ/Bonds-Beyond-Custom-Client/main/frontend/public/BB1-085.webp",
    "cardType": "Digimon",
    "color": ["Purple"],
    "cardNumber": "BB1-085",
    "digivolveConditions": [{ "color": "Purple", "level": 5, "cost": 3 }],
    "stage": "Mega",
    "digiType": ["Shaman"],
    "attribute": "Vaccine",
    "dp": 11000,
    "playCost": 11,
    "level": 6,
    "mainEffect": "[When Digivolving] You may play 1 Level 4 or lower Digimon card from your trash without paying its memory cost.\n[All Turns] All of your Digimon played from the trash gain ＜Rush＞ for the turn.",
    "inheritedEffect": null,
    "securityEffect": null,
    "restrictions": {
      "chinese": "Unrestricted", "english": "Unrestricted", "japanese": "Unrestricted", "korean": "Unrestricted"
    },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- ANUBISMON (ALT ART) ---
  {
    "uniqueCardNumber": "BB1-085_P1",
    "name": "Anubismon",
    "imgUrl": "https://raw.githubusercontent.com/NJTAHJ/Bonds-Beyond-Custom-Client/main/frontend/public/BB1-085_P1.webp",
    "cardType": "Digimon",
    "color": ["Purple"],
    "cardNumber": "BB1-085",
    "digivolveConditions": [{ "color": "Purple", "level": 5, "cost": 3 }],
    "stage": "Mega",
    "digiType": ["Shaman"],
    "attribute": "Vaccine",
    "dp": 11000,
    "playCost": 11,
    "level": 6,
    "mainEffect": "[When Digivolving] You may play 1 Level 4 or lower Digimon card from your trash without paying its memory cost.\n[All Turns] All of your Digimon played from the trash gain ＜Rush＞ for the turn.",
    "inheritedEffect": null,
    "securityEffect": null,
    "restrictions": {
      "chinese": "Unrestricted", "english": "Unrestricted", "japanese": "Unrestricted", "korean": "Unrestricted"
    },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  },

  // --- DIGIMON WRESTLING BELT (BB1-097 - LINK EFFECT BRACKET FIX) ---
  {
    "uniqueCardNumber": "BB1-097",
    "name": "Digimon Wrestling Belt",
    "imgUrl": "https://raw.githubusercontent.com/NJTAHJ/Bonds-Beyond-Custom-Client/main/frontend/public/BB1-097.webp",
    "cardType": "Option",
    "color": ["Blue", "Green"],
    "cardNumber": "BB1-097",
    "digivolveConditions": [],
    "digiType": ["Arena"],
    "playCost": 3,
    "mainEffect": "＜Use Req. ([Arena] trait)＞\n[Main] Unsuspend 1 of your Digimon. Then, you may link this card to 1 of your Digimon without paying the cost.",
    "securityEffect": "[Security] Suspend 1 of your opponent's Digimon. Then, add this card to your hand.",
    "linkDP": 3000,
    "linkEffect": "[All Turns] [Once Per Turn] When this Digimon wins a battle, trash the top card of your opponent's security stack.",
    "linkRequirement": "[Link] [Arena] trait: 2 cost",
    "restrictions": {
      "chinese": "Unrestricted", "english": "Unrestricted", "japanese": "Unrestricted", "korean": "Unrestricted"
    },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  }
]);

print("Successfully updated Anubismon art links and Digimon Wrestling Belt link effect brackets!");

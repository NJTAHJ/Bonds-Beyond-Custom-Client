// ==========================================
// IMPORT DER FREISCHÜTZ (SC1-078)
// ==========================================

const targetCards = ["SC1-078"];

// Clean up existing entry to avoid duplicates
db.card.deleteMany({ uniqueCardNumber: { $in: targetCards } });

db.card.insertMany([
  {
    "uniqueCardNumber": "SC1-078",
    "name": "Der Freischütz",
    "imgUrl": "/SC1-078.webp",
    "cardType": "Option",
    "color": ["Purple", "Black"],
    "cardNumber": "SC1-078",
    "digivolveConditions": [],
    "digiType": ["CT"],
    "playCost": 6,
    "mainEffect": "＜Use Req. ([CT] trait)＞\n[Main] You may play 1 Digimon card with the [CT] trait from your trash with its play cost reduced by 4. Then, ＜De-Digivolve 1＞ on 1 of your opponent's Digimon for each Digimon you have in play. Then, place this card as the bottom digivolution card of 1 of your Digimon with the [CT] trait.",
    "inheritedEffect": null,
    "securityEffect": "[Security] You may play 1 Level 4 or lower Digimon card with the [CT] trait from your hand or trash without paying its memory cost. Then, add this card to your hand.",
    "restrictions": {
      "chinese": "Unrestricted",
      "english": "Unrestricted",
      "japanese": "Unrestricted",
      "korean": "Unrestricted"
    },
    "illustrator": "Beyond The Bonds",
    "_class": "com.github.wekaito.backend.models.Card"
  }
]);

print("Successfully imported Der Freischütz (SC1-078).");
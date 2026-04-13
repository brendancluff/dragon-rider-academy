export const riderSpecialties = [
  "Flame Warden",
  "Storm Scout",
  "Sky Guardian",
  "Shadow Scribe",
  "Iron Vanguard",
  "Rune Healer"
];

export const riderTemperaments = [
  "Bold",
  "Calm",
  "Clever",
  "Fierce",
  "Patient",
  "Reckless"
];

export const squadMottos = [
  "Fly first. Fear never.",
  "Steel hearts, blazing wings.",
  "Storm above, strength within.",
  "Train hard. Fly harder.",
  "Earn the sky every day."
];

export const fallbackDragons = [
  {
    index: "academy-red-dragon",
    name: "Academy Red Dragon",
    size: "Huge",
    type: "dragon",
    alignment: "chaotic good",
    hit_points: 225,
    challenge_rating: 17,
    speed: { walk: "40 ft.", fly: "80 ft." },
    strength: 27,
    dexterity: 10,
    constitution: 25,
    intelligence: 16,
    wisdom: 13,
    charisma: 21,
    actions: [{ name: "Fire Breath" }, { name: "Claw" }]
  },
  {
    index: "academy-bronze-dragon",
    name: "Academy Bronze Dragon",
    size: "Large",
    type: "dragon",
    alignment: "lawful good",
    hit_points: 142,
    challenge_rating: 8,
    speed: { walk: "40 ft.", fly: "80 ft." },
    strength: 23,
    dexterity: 10,
    constitution: 21,
    intelligence: 14,
    wisdom: 13,
    charisma: 17,
    actions: [{ name: "Lightning Breath" }, { name: "Bite" }]
  }
];

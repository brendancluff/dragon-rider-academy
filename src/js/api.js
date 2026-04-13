import { fallbackDragons } from "../data/academyData.js";

const DND_BASE = "https://www.dnd5eapi.co/api/2014";
const RANDOM_USER_URL = "https://randomuser.me/api/?nat=us,gb,ca,au&inc=name,picture,login";

async function convertToJson(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Unable to fetch data.");
  }
  return data;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export async function fetchRandomDragon() {
  try {
    const dragonListResponse = await fetch(`${DND_BASE}/monsters`);
    const dragonListData = await convertToJson(dragonListResponse);

    const dragonResults = dragonListData.results.filter((monster) =>
      monster.name.toLowerCase().includes("dragon")
    );

    const chosenDragon = randomItem(dragonResults);
    if (!chosenDragon) {
      throw new Error("No dragons were returned by the API.");
    }

    const detailResponse = await fetch(`${DND_BASE}/monsters/${chosenDragon.index}`);
    return await convertToJson(detailResponse);
  } catch (error) {
    console.warn("Using fallback dragon data:", error.message);
    return randomItem(fallbackDragons);
  }
}

export async function fetchRandomRider() {
  const response = await fetch(RANDOM_USER_URL);
  const data = await convertToJson(response);
  return data.results[0];
}

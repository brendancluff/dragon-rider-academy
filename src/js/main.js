import "../styles/styles.css";
import { riderSpecialties, riderTemperaments } from "../data/academyData.js";
import { fetchRandomDragon, fetchRandomRider } from "./api.js";
import { getSavedTeams, saveTeam, removeTeam, clearTeams, getTheme, setTheme } from "./storage.js";
import { createTeam, renderCompatibility, renderDragon, renderRider, renderSavedTeams, setStatus } from "./ui.js";

const state = {
  dragon: null,
  rider: null,
  compatibility: null
};

function populateSelect(selector, values) {
  const select = document.querySelector(selector);
  const markup = values.map((value) => `<option value="${value}">${value}</option>`).join("");
  select.insertAdjacentHTML("beforeend", markup);
}

function computeCompatibility(dragon, rider) {
  if (!dragon || !rider) return null;

  let score = 65;

  if (rider.temperament === "Bold" && dragon.challenge_rating >= 10) score += 12;
  if (rider.temperament === "Calm" && dragon.alignment?.includes("good")) score += 10;
  if (rider.specialty === "Storm Scout" && dragon.actions?.some((action) => action.name.toLowerCase().includes("lightning"))) score += 10;
  if (rider.specialty === "Flame Warden" && dragon.actions?.some((action) => action.name.toLowerCase().includes("fire"))) score += 10;
  if (rider.temperament === "Reckless" && dragon.challenge_rating >= 15) score -= 8;

  return Math.max(45, Math.min(99, score));
}

function decorateRider(rawRider) {
  const specialtySelect = document.querySelector("#specialtySelect").value;
  const temperamentSelect = document.querySelector("#temperamentSelect").value;

  const specialty = specialtySelect === "all"
    ? riderSpecialties[Math.floor(Math.random() * riderSpecialties.length)]
    : specialtySelect;

  const temperament = temperamentSelect === "all"
    ? riderTemperaments[Math.floor(Math.random() * riderTemperaments.length)]
    : temperamentSelect;

  return {
    ...rawRider,
    fullName: `${rawRider.name.first} ${rawRider.name.last}`,
    specialty,
    temperament,
    callSign: rawRider.login.username
  };
}

async function generateDragon() {
  setStatus("Summoning dragon...");
  const dragon = await fetchRandomDragon();
  state.dragon = dragon;
  renderDragon(dragon);
  setStatus(`Dragon ready: ${dragon.name}`);
  updatePairDisplay();
}

async function generateRider() {
  try {
    setStatus("Recruiting rider...");
    const rider = decorateRider(await fetchRandomRider());
    state.rider = rider;
    renderRider(rider);
    setStatus(`Rider ready: ${rider.fullName}`);
    updatePairDisplay();
  } catch (error) {
    setStatus(error.message);
  }
}

function updatePairDisplay() {
  const saveButton = document.querySelector("#saveTeamBtn");
  if (state.dragon && state.rider) {
    state.compatibility = computeCompatibility(state.dragon, state.rider);
    renderCompatibility(state.compatibility);
    saveButton.disabled = false;
  } else {
    renderCompatibility("--");
    saveButton.disabled = true;
  }
}

function saveCurrentTeam() {
  if (!state.dragon || !state.rider || !state.compatibility) {
    setStatus("Generate both a dragon and rider first.");
    return;
  }

  const team = createTeam(state.dragon, state.rider, state.compatibility);
  saveTeam(team);
  renderSavedTeams(getSavedTeams(), handleDeleteTeam);
  setStatus(`Saved squad: ${team.rider.fullName} and ${team.dragon.name}`);
}

function clearCurrentPair() {
  state.dragon = null;
  state.rider = null;
  state.compatibility = null;
  document.querySelector("#dragonContent").innerHTML = "No dragon generated yet.";
  document.querySelector("#riderContent").innerHTML = "No rider generated yet.";
  renderCompatibility("--");
  document.querySelector("#saveTeamBtn").disabled = true;
  setStatus("Current pair cleared.");
}

function handleDeleteTeam(teamId) {
  removeTeam(teamId);
  renderSavedTeams(getSavedTeams(), handleDeleteTeam);
  setStatus("Saved squad removed.");
}

function clearAllSavedTeams() {
  clearTeams();
  renderSavedTeams(getSavedTeams(), handleDeleteTeam);
  setStatus("All saved squads cleared.");
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  setTheme(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;
  applyTheme(currentTheme === "dark" ? "light" : "dark");
}

function addEventListeners() {
  document.querySelector("#generateDragonBtn").addEventListener("click", generateDragon);
  document.querySelector("#generateRiderBtn").addEventListener("click", generateRider);
  document.querySelector("#generatorForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await generateDragon();
    await generateRider();
  });
  document.querySelector("#saveTeamBtn").addEventListener("click", saveCurrentTeam);
  document.querySelector("#clearCurrentBtn").addEventListener("click", clearCurrentPair);
  document.querySelector("#clearSavedBtn").addEventListener("click", clearAllSavedTeams);
  document.querySelector("#themeToggle").addEventListener("click", toggleTheme);
}

function init() {
  populateSelect("#specialtySelect", riderSpecialties);
  populateSelect("#temperamentSelect", riderTemperaments);
  renderSavedTeams(getSavedTeams(), handleDeleteTeam);
  applyTheme(getTheme());
  addEventListeners();
}

init();

const STORAGE_KEY = "dragon-rider-academy-teams";
const THEME_KEY = "dragon-rider-academy-theme";

export function getSavedTeams() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTeam(team) {
  const teams = getSavedTeams();
  teams.unshift(team);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

export function removeTeam(teamId) {
  const teams = getSavedTeams().filter((team) => team.id !== teamId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

export function clearTeams() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "dark";
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
